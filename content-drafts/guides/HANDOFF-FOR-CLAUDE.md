# Handoff for Claude: two destination guides (prepared Oct 22–23, 2026)

Prepared by Zak's Wyld Wandering assistant. Nothing has been pushed, published or sent. Both posts still carry `draft: true`. **Zak decides when they go live;** change it to `false` only when he says so.

## Files in this folder
| File | What it is |
|---|---|
| `where-to-stay-las-vegas.md` | Publish-ready post (frontmatter + body + inline images + photo credits) |
| `where-to-stay-amalfi-coast.md` | Same, for the Amalfi Coast |
| `*.images.json` | Per-guide image list: R2 URL, alt text, size, photographer, Unsplash source page, license |
| `*-source-notes.md` | Research and source notes moved out of the body. Not for publication. |
| `img/<slug>/*.jpg` | Local copies of the exact files uploaded to R2 |
| `*-preview.png` | Rough HTML render (generic styling, not the site theme), used only to check images load and fit |

## Where they go
- Frontmatter matches the blog schema in `src/content.config.ts`: `title`, `excerpt`, `date` (2026-10-23), `category` ("Guides"), `image` (hero URL), `draft`.
- Extra keys the current schema ignores: `imageAlt` (hero alt text; please wire it to the hero `<img alt>` if you add it to a schema), `seoTitle`, `metaDescription`, `slug`, `suggestedInternalLinks` (suggested anchors, not yet linked in the body).
- Images are hosted on the public R2 bucket `wyldwandering-media` under `guides/<slug>/` (base `https://pub-3c5475de9d84447ba04052c5af622da7.r2.dev/`). All 8 URLs returned 200 `image/jpeg` on Oct 22. Heroes are 2000px wide and inline images 1600px wide, all JPEGs under 400 KB. If the site prefers images in `src/assets` for Astro image optimization, the local copies are in `img/`.
- Inline images are plain markdown `![alt](url)` placed right under the matching section heading. The hero is only in frontmatter, not repeated in the body, so the layout should render `image` as the hero.
- Credits sit at the end of each body as one italic line: "Photos: Name / Unsplash", with each name linked to its Unsplash photo page. The Unsplash License doesn't require credit, but we give it anyway.

## SEO blocker: `/blog/` can't rank today
- `public/robots.txt` disallows `/blog/`.
- `src/pages/blog/[...slug].astro` and `blog/index.astro` render `noindex`.
- `astro.config.mjs` filters `/blog` out of the sitemap.

Dropped into `src/content/blog/` as they are, these guides would be invisible to search, and search is the point of writing them. **Suggestion:** add a separate indexable `guides` collection with a `/guides/` index and `/guides/[slug]` route. Make it indexable, put it in the sitemap, use `seoTitle` and `metaDescription`, and add canonical tags. The other option is to lift noindex, robots and the sitemap exclusion only for posts with `category: "Guides"`. That's Zak's call with you.

## Claims Zak should verify before publishing
1. **Wynn and Encore $100 credit type.** Fora's pages disagree: some call it a "hotel / resort credit" and others a "food / beverage credit". The post just says "a $100 credit" for Wynn and Encore.
2. **Vegas facts written from general knowledge, not checked against a source:**
   - the Strip runs about 4 miles from the Strat to Mandalay Bay;
   - the Cosmopolitan sits between Bellagio and Aria and has rooms with private terraces;
   - Vdara and the Waldorf Astoria are non-gaming, and the Waldorf lobby is on the 23rd floor;
   - the Venetian and Palazzo are all-suite;
   - the Conrad is at Resorts World;
   - Four Seasons occupies upper floors of the Mandalay Bay tower;
   - Summerlin is about 30 minutes from the Strip;
   - CES is in January and the F1 Grand Prix is in November;
   - summer tops 100°F;
   - Bellagio and Cosmopolitan fountain-view vs. Strip-view room categories.
3. **Hotel Santa Caterina and Borgo Santandrea perks** come from a Fora search-result preview only, not a full page read. Hotel Santa Caterina's elevator to its swimming area and Borgo Santandrea as a newer opening also need checking.
4. **Amalfi general facts:**
   - Naples airport is about 90 minutes from Positano;
   - many hotels close from about November to spring;
   - ferries run a reduced off-season schedule;
   - Il San Pietro is about 10 minutes from town.
5. **All perks** are as listed on public Fora pages as of Oct 22, 2026. Re-check them close to the publish date.
6. **Voice:** Zak may want to add a line or two of his own. No anecdotes were invented.

## Image notes
- Unsplash free license only (no Unsplash+). No photos are from hotel-owned accounts, and no people are the subject.
- Two Vegas images show real hotels the guide discusses: the hero and Center Strip shots show Bellagio's fountains, and the North Strip shot shows Wynn/Encore, the Palazzo (its name is legible on the tower) and the Venetian, plus a Treasure Island sign at the edge. They're accurate skyline views, not property marketing photos. Swap them if you'd rather show no hotel signage at all.
- The hero and Center Strip images both feature the Bellagio fountains (twilight vs. night). Swap one if that feels repetitive.
