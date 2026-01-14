import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://wyldwandering.com',
  integrations: [tailwind()],
  output: 'static',
});
