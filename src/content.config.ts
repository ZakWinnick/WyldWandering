import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Destination guides: public, indexed, in the sitemap. Each guide is a folder in
// src/content/guides/<slug>/ holding index.md and its photos (optimized at build).
const guides = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/guides' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** <title> for search results; defaults to "title | Wyld Wandering". */
      seoTitle: z.string().optional(),
      excerpt: z.string(),
      /** Meta description; defaults to the excerpt. */
      metaDescription: z.string().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.string().default('Guides'),
      image: image(),
      imageAlt: z.string(),
      /** Drafts build only in dev or with SHOW_DRAFTS=true; never on the live site. */
      draft: z.boolean().default(true),
    }),
});

export const collections = { blog, guides };
