import { getCollection, type CollectionEntry } from 'astro:content';

/** Drafts show in `npm run dev` and in builds run with SHOW_DRAFTS=true (local previews), never on the live site. */
export const SHOW_DRAFTS = import.meta.env.DEV || process.env.SHOW_DRAFTS === 'true';

export async function getGuides(): Promise<CollectionEntry<'guides'>[]> {
  const all = await getCollection('guides', ({ data }) => SHOW_DRAFTS || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export const readingTime = (body = '') => `${Math.max(1, Math.round(body.split(/\s+/).length / 220))} min read`;
