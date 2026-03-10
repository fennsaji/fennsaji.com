# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # local dev server
npm run build     # production build (also catches type/lint errors)
npm test          # run all tests (vitest)
npm run test:watch  # watch mode
npx tsc --noEmit  # type-check only
```

Run a single test file:
```bash
npm test -- tests/lib/projects.test.ts
```

## Architecture

**Fully static Next.js 15 App Router site.** All pages are server components that read content at build time — no API routes, no database, no runtime data fetching.

**Content pipeline:** `content/projects/*.md` → `lib/projects.ts` (gray-matter parse) → server component pages. The data layer is split into pure helpers (`parseProject`, `filterFeatured`, `getAllTags`, `sortByYear`) and I/O functions (`getProjects`, `getFeaturedProjects`). Only the pure helpers are unit tested.

**One interactive component:** `components/TagFilter.tsx` is the only `'use client'` component with state. It receives all projects + tags as props from the server component (`app/projects/page.tsx`) and handles filtering client-side. All other components are server-safe.

**Styling:** Tailwind CSS v4 (CSS-first — no `tailwind.config.ts`). Design tokens live in `app/globals.css` as CSS custom properties (`--bg`, `--surface`, `--card`, `--border`, `--text`, `--muted`, `--accent`). Always use these variables (e.g. `text-[var(--muted)]`) rather than hardcoded colors.

**Animations:** `components/FadeIn.tsx` wraps Framer Motion. Use it to add page-entry animations — it's the only place `framer-motion` is imported.

## Testing notes

- `tests/lib/projects.test.ts` has `// @vitest-environment node` at the top — required because gray-matter's dependency chain conflicts with jsdom. Don't remove it.
- jsdom is pinned to v25 (not v27) due to an ESM incompatibility in v27's dependency tree.
- React component tests use the default jsdom environment (no override needed).

## Adding a project

Create `content/projects/<slug>.md`. Required frontmatter: `title` and `year` (missing either throws at build time). Optional: `description`, `tech`, `github`, `demo`, `featured`.
