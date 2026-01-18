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
- **Tailwind CSS** - Custom theme with brand colors (Cream, Charcoal, Terracotta, Forest, Amber)
- **TypeScript** - Strict mode enabled
- **GitHub Pages** - Deployment via GitHub Actions

### Project Structure

```
src/
├── components/     # Header.astro, Footer.astro
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
- **Sitemap** filters out blog routes in `astro.config.mjs`
- **Path alias**: `@/*` maps to `src/*`

### Styling Conventions
- Custom fonts: Cormorant (display/headings), Outfit (body/sans)
- Button classes: `.btn-primary`, `.btn-secondary` defined in global.css
- Dark mode supported via Tailwind's `class` strategy
- Animations: fade-in, slide-up, slide-in-right, scale-in, blur-in

### Deployment
- Pushes to `main` trigger GitHub Actions workflow
- Builds with Node 20, outputs to GitHub Pages
- Domain: wyldwandering.com (configured in `public/CNAME`)
