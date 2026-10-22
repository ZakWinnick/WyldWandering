const UTM_SOURCE = 'wyldwandering';
const UTM_MEDIUM = 'website';

/** Existing clients search and book hotels here. */
export const FORA_PORTAL_URL = 'https://trips.foratravel.com/wyldwandering/book';

/** New clients create a Fora profile here. */
export const FORA_INTAKE_URL =
  'https://secure.foratravel.com/intake/wyldwandering/C8ug7ybur3';

export function withUtm(base: string, campaign: string, content: string): string {
  const url = new URL(base);
  url.searchParams.set('utm_source', UTM_SOURCE);
  url.searchParams.set('utm_medium', UTM_MEDIUM);
  url.searchParams.set('utm_campaign', campaign);
  url.searchParams.set('utm_content', content);
  return url.toString();
}

export function portalLink(content: string): string {
  return withUtm(FORA_PORTAL_URL, 'book-hotel', content);
}

export function intakeLink(content: string): string {
  return withUtm(FORA_INTAKE_URL, 'plan-trip', content);
}
