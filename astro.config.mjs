import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wyldwandering.com',
  // Astro 7 defaults to 'jsx' whitespace rules; keep the classic HTML compression.
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/blog') && !page.includes('/404') && !page.includes('/retainer/apply/received') && !/\/retainer\/?$/.test(page),
    }),
  ],
  output: 'static',
  redirects: {
    '/retainer': '/services#retainer',
  },
  vite: {
    // Keep media queries in min-width form so older Safari (pre 16.4) still gets the layout.
    build: { cssTarget: ['chrome100', 'safari14', 'firefox100', 'edge100'] },
  },
});
