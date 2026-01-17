import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wyldwandering.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/blog'),
    }),
  ],
  output: 'static',
});
