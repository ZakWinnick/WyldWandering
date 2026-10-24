import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://wyldwandering.com',
  // Astro 7 defaults to 'jsx' whitespace rules; keep the classic HTML compression.
  compressHTML: true,
  integrations: [
    sitemap({
      // Keep confirmation pages, redirects, the blog and 404 out of the sitemap.
      filter: (page) => {
        const path = new URL(page).pathname;
        return !path.startsWith('/blog') && !path.startsWith('/404') && !path.startsWith('/retainer') && path !== '/private-client/' && !path.endsWith('/received/') && path !== '/contact/sent/';
      },
    }),
  ],
  output: 'static',
  redirects: {
    // Old "retainer" URLs keep working.
    '/retainer': '/services#private-client',
    '/retainer/apply': '/private-client/apply/',
    '/retainer/apply/received': '/private-client/apply/received/',
    '/private-client': '/services#private-client',
  },
  vite: {
    // Tailwind 4 runs as a Vite plugin; the theme lives in src/styles/global.css (@theme).
    plugins: [tailwindcss()],
    // Keep media queries in min-width form so older Safari (pre 16.4) still gets the layout.
    build: { cssTarget: ['chrome100', 'safari14', 'firefox100', 'edge100'] },
  },
});
