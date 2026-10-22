# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start local dev server with hot reload
npm run build    # Build static site to /dist
npm run preview  # Preview production build locally
```

## Architecture Overview

This is a **premium travel advisor portfolio site** built with Astro 5.x, outputting fully static HTML. No SSR or serverless functions.

### Key Technologies
- **Astro** - Static site generator with file-based routing
- **Tailwind CSS** - Custom theme with brand colors (Sand, Ink, Clay, Pine, Gold)
- **TypeScript** - Strict mode enabled
- **GitHub Pages** - Deployment via GitHub Actions

### Project Structure

```
src/
├── assets/images/  # Site photography (optimized to WebP at build via astro:assets)
├── config/site.ts  # Fora intake URL, client portal URL, email, social, nav links
├── components/     # Header, Footer, Logo, Icon, PageHero, StartHere (intake + portal band)
├── layouts/        # Layout.astro (main wrapper with meta management)
├── pages/          # File-based routes (.astro files)
│   └── blog/       # Blog routes (excluded from search engines)
├── content/        # Markdown blog posts with Zod schema validation
│   └── config.ts   # Content collection schema definition
└── styles/         # global.css with Tailwind and custom animations
```

### Content Management
- Blog posts are Markdown files in `src/content/blog/`
- Schema defined in `src/content/config.ts` with Zod validation
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

### Styling Conventions
- Dark mode follows the visitor's system setting (`darkMode: 'media'`, no toggle). Theme-aware tokens `sand` (grounds, lines), `ink` (text), `clay` (accent) are CSS variables in global.css that flip under `prefers-color-scheme: dark`
- Fixed tokens that never flip: `cream` (light text on photos and pine bands), `night` (dark text on light fills), `pine` (dark bands), `gold` (accent on dark). Use these, not `sand`, for anything sitting on a photo or a pine band
- Fonts: Cormorant (display/headings), Outfit (body/sans), loaded in Layout.astro
- Component classes in global.css: `.container-site`, `.eyebrow`, `.display-xl|lg|md`, `.lede`, `.btn-primary|dark|outline|outline-light`, `.link-underline`, `.link-accent`, `.prose-ww`
- `.reveal` fades sections in on scroll (respects reduced motion, visible without JS)
- Pages with a photo hero pass `overlayHeader` to Layout for the transparent header
- No em dashes in site copy

### Deployment
- Pushes to `main` trigger GitHub Actions workflow
- Builds with Node 20, outputs to GitHub Pages
- Domain: wyldwandering.com (configured in `public/CNAME`)
