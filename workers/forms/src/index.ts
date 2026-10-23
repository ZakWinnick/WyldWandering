import { WorkerMailer } from 'worker-mailer';

interface Env {
  SITE_ORIGIN: string;
  MAIL_FROM: string;
  MAIL_FROM_NAME: string;
  MAIL_TO: string;
  SMTP_HOST: string;
  SMTP_PORT: string;
  /** "false" only for local testing against a plain SMTP server. */
  SMTP_STARTTLS?: string;
  TURNSTILE_HOSTNAMES: string;
  SMTP_TOKEN: string;
  TURNSTILE_SECRET_KEY: string;
  LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
}

type FormKey = 'contact' | 'private-client' | 'retainer';

const FORMS: Record<FormKey, { subject: string; page: string; success: string; required: string[] }> = {
  contact: {
    subject: 'Website Question',
    page: '/contact/',
    success: '/contact/sent/',
    required: ['Name', 'email', 'Question'],
  },
  'private-client': {
    subject: 'Private Client Application',
    page: '/private-client/apply/',
    success: '/private-client/apply/received/',
    required: ['Name', 'email', 'Based in', 'Trips a year', 'Looking for', 'Understands terms'],
  },
  // Old form key, kept so a page cached before the rename still sends.
  retainer: {
    subject: 'Private Client Application',
    page: '/private-client/apply/',
    success: '/private-client/apply/received/',
    required: ['Name', 'email', 'Based in', 'Trips a year', 'Understands terms'],
  },
};

const MAX_FIELDS = 40;
const MAX_VALUE = 5000;
const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/;

type Failure = 'invalid' | 'verify' | 'rate' | 'send';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const allowed = allowedOrigins(env);
    const cors: Record<string, string> =
      origin && allowed.includes(origin) ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {};

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { ...cors, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Accept', 'Access-Control-Max-Age': '86400' },
      });
    }

    const key = url.pathname.replace(/^\/+|\/+$/g, '') as FormKey;
    const form = FORMS[key];
    if (request.method === 'GET' && url.pathname === '/') return new Response('ok', { headers: { 'Content-Type': 'text/plain' } });
    if (!form) return new Response('Not found', { status: 404 });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });

    const wantsJson = (request.headers.get('Accept') || '').includes('application/json');
    const done = (ok: boolean, error?: Failure) => {
      if (wantsJson) {
        return new Response(JSON.stringify(ok ? { ok: true, redirect: env.SITE_ORIGIN + form.success } : { ok: false, error }), {
          status: ok ? 200 : error === 'rate' ? 429 : 400,
          headers: { ...cors, 'Content-Type': 'application/json' },
        });
      }
      const to = ok ? form.success : `${form.page}?error=${error}#form-status`;
      return Response.redirect(env.SITE_ORIGIN + to, 303);
    };

    // Only accept posts from the site itself.
    if (origin && !allowed.includes(origin)) return new Response('Forbidden', { status: 403 });

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (env.LIMITER) {
      const { success } = await env.LIMITER.limit({ key: ip });
      if (!success) return done(false, 'rate');
    }

    let data: FormData;
    try {
      data = await request.formData();
    } catch {
      return done(false, 'invalid');
    }

    // Honeypot: bots fill hidden fields. Pretend it worked.
    if (String(data.get('_honey') || '').trim()) return done(true);

    const verified = await verifyTurnstile(String(data.get('cf-turnstile-response') || ''), ip, env);
    if (!verified) return done(false, 'verify');

    const fields: [string, string][] = [];
    for (const [name, value] of data.entries()) {
      if (name.startsWith('_') || name === 'cf-turnstile-response' || typeof value !== 'string') continue;
      const v = value.trim();
      if (!v) continue;
      fields.push([clean(name).slice(0, 80), v.slice(0, MAX_VALUE)]);
      if (fields.length > MAX_FIELDS) return done(false, 'invalid');
    }

    const get = (n: string) => fields.find(([k]) => k.toLowerCase() === n.toLowerCase())?.[1] || '';
    if (form.required.some((r) => !get(r))) return done(false, 'invalid');
    const replyTo = get('email');
    if (!EMAIL_RE.test(replyTo)) return done(false, 'invalid');
    const sender = clean(get('Name')).slice(0, 100);

    try {
      const mailer = await WorkerMailer.connect({
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        secure: false,
        startTls: env.SMTP_STARTTLS !== 'false',
        credentials: { username: env.MAIL_FROM, password: env.SMTP_TOKEN },
        authType: ['plain', 'login'],
        name: 'forms.wyldwandering.com',
        socketTimeoutMs: 15000,
        responseTimeoutMs: 15000,
      });
      await mailer.send({
        from: { name: env.MAIL_FROM_NAME, email: env.MAIL_FROM },
        to: { email: env.MAIL_TO },
        reply: { name: sender, email: clean(replyTo) },
        subject: clean(`${form.subject}: ${sender}`),
        text: renderText(form.subject, fields),
        html: renderHtml(form.subject, fields),
      });
      await mailer.close();
    } catch (err) {
      console.error('send failed', err instanceof Error ? err.message : String(err));
      return done(false, 'send');
    }

    return done(true);
  },
};

function allowedOrigins(env: Env): string[] {
  const u = new URL(env.SITE_ORIGIN);
  return [u.origin, `${u.protocol}//www.${u.host}`];
}

async function verifyTurnstile(token: string, ip: string, env: Env): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET_KEY);
  body.append('response', token);
  if (ip !== 'unknown') body.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
    const out = (await res.json()) as { success: boolean; hostname?: string };
    if (!out.success) return false;
    const hosts = env.TURNSTILE_HOSTNAMES.split(',').map((h) => h.trim());
    // Turnstile's always-pass test keys report "example.com".
    return !out.hostname || hosts.includes(out.hostname) || out.hostname === 'example.com' && env.TURNSTILE_SECRET_KEY.startsWith('1x0000');
  } catch {
    return false;
  }
}

/** Strip line breaks so values can't inject email headers. */
function clean(s: string): string {
  return s.replace(/[\r\n\u2028\u2029]+/g, ' ').trim();
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function label(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function renderText(title: string, fields: [string, string][]): string {
  return [`${title} from wyldwandering.com`, '', ...fields.map(([k, v]) => `${label(k)}:\n${v}\n`)].join('\n');
}

function renderHtml(title: string, fields: [string, string][]): string {
  const rows = fields
    .map(
      ([k, v]) =>
        `<tr><th align="left" valign="top" style="padding:10px 16px 10px 0;border-top:1px solid #E5DED0;font:600 14px/1.5 Helvetica,Arial,sans-serif;color:#0F1A14;white-space:nowrap">${escapeHtml(label(k))}</th><td style="padding:10px 0;border-top:1px solid #E5DED0;font:14px/1.5 Helvetica,Arial,sans-serif;color:#0F1A14">${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('');
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#FFFBF5"><table role="presentation" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%"><tr><td style="padding-bottom:16px;font:600 18px/1.4 Georgia,serif;color:#0F1A14">${escapeHtml(title)}</td></tr><tr><td><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${rows}</table></td></tr><tr><td style="padding-top:16px;font:12px/1.5 Helvetica,Arial,sans-serif;color:#4A544D">Sent from wyldwandering.com. Reply to this email to answer them directly.</td></tr></table></body></html>`;
}
