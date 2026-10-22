# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start local dev server with hot reload
npm run build    # Build static site to /dist
npm run preview  # Preview production build locally
```

## Architecture Overview

This is a **premium travel advisor portfolio site** built with Astro 7.x (Node 22.23.4 or newer, see `.nvmrc`), outputting fully static HTML. No SSR or serverless functions.

### Key Technologies
- **Astro** - Static site generator with file-based routing
- **Tailwind CSS 3** - Runs through PostCSS (`postcss.config.mjs`); custom theme mapped to brand kit v1 (Forest, Ivory, Terracotta, Amber)
- **TypeScript** - Strict mode enabled
- **GitHub Pages** - Deployment via GitHub Actions

### Project Structure

```
src/
├── assets/images/  # Site photography (optimized to WebP at build via astro:assets)
├── config/site.ts  # Fora intake/portal URLs, pricing tiers, Fora disclosure, email, social, nav links
├── components/     # Header, Footer, Logo, Icon, PageHero, StartHere (intake + portal band)
├── layouts/        # Layout.astro (main wrapper with meta management)
├── pages/          # File-based routes (.astro files)
│   └── blog/       # Blog routes (excluded from search engines)
├── content/blog/   # Markdown blog posts
└── content.config.ts # Content collection (glob loader + Zod schema)
└── styles/         # global.css with Tailwind and custom animations
```

### Content Management
- Blog posts are Markdown files in `src/content/blog/`
- Schema defined in `src/content.config.ts` with a glob loader and Zod (`astro/zod`); entries use `post.id` and `render(post)`
- Dynamic routing via `src/pages/blog/[...slug].astro`
- Draft posts are filtered from listings

### Important Configuration
- **robots.txt** blocks `/blog/*` from search engines (intentional)
- **Sitemap** filters out blog and 404 routes in `astro.config.mjs`
- **Path alias**: `@/*` maps to `src/*`

### Fora Client Portal and Intake
- New clients: `INTAKE_URL` (Fora intake form). Existing clients: `PORTAL_URL` (Fora client portal).
- Both are defined once in `src/config/site.ts`. Fora sends `X-Frame-Options: DENY`, so they are linked, never embedded.
- Contact page keeps a short FormSubmit form for quick questions only.

### Pricing
- `PRICING` and `RETAINER` (including the $40K retainer invitation) in `src/config/site.ts` drive the homepage, Services and Contact pricing. The FAQ "What does it cost" answer is written out by hand, so update it too when prices change.

### Styling Conventions
- Brand kit v1 colors: forest #0F1A14, ivory #FFFBF5, terracotta #C45D3A, amber #D4A857 (exact values in the `brand` Tailwind color). Lead with forest and ivory; terracotta for emphasis; amber for small details on dark grounds only, never as text on ivory. Text and button terracotta (`clay`) is deepened in light mode and lifted in dark mode for AA contrast
- Logo: `Logo.astro` holds the kit's outlined artwork (`variant` horizontal, stacked or symbol) colored with currentColor. Never retype the wordmark in a font. Horizontal in the header (about 280px wide minimum), stacked in the footer. Favicons and app icons in `public/` come from the kit's web-icons
- Dark mode follows the visitor's system setting (`darkMode: 'media'`, no toggle). Theme-aware tokens `sand` (grounds, lines), `ink` (text), `clay` (accent) are CSS variables in global.css that flip under `prefers-color-scheme: dark`
- Fixed tokens that never flip: `cream` (ivory, light text on photos and pine bands), `night` (forest, dark text on light fills), `gold` (amber, accent on dark). `pine` is a dark band in both modes (forest, lifted slightly in dark mode so bands stand off the forest ground). Use these, not `sand`, for anything sitting on a photo or a pine band
- Fonts: Cormorant (display/headings), Outfit (body/sans), loaded in Layout.astro
- Component classes in global.css: `.container-site`, `.eyebrow`, `.display-xl|lg|md`, `.lede`, `.btn-primary|dark|outline|outline-light`, `.link-underline`, `.link-accent`, `.prose-ww`
- `.reveal` fades sections in on scroll (respects reduced motion, visible without JS)
- Pages with a photo hero pass `overlayHeader` to Layout for the transparent header
- No em dashes in site copy
- Title case for labels: buttons, links, nav, card and tier titles, short headings. Sentence-style editorial headlines ending in a period ("Your trip, handled.", "Details are everything.") stay as written
- External links (Fora intake, portal, social, any http URL) use `target="_blank" rel="noopener noreferrer"`; internal links open in the same tab

### Deployment
- Pushes to `main` trigger GitHub Actions workflow
- Builds with the Node version pinned in `.nvmrc`, outputs to GitHub Pages
- Domain: wyldwandering.com (configured in `public/CNAME`)
