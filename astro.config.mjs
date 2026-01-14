import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://zakwinnick.github.io',
  base: '/WyldWandering',
  integrations: [tailwind()],
  output: 'static',
});
