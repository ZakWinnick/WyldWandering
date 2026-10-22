import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { intakeLink, portalLink } from './src/lib/fora.ts';

export default defineConfig({
  site: 'https://wyldwandering.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/blog'),
    }),
  ],
  output: 'static',
  redirects: {
    '/portal': portalLink('shortlink'),
    '/start': intakeLink('shortlink'),
  },
});
