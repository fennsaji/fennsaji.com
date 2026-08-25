# fennsaji.com

Personal portfolio site — built with Next.js App Router, Tailwind CSS, and Framer Motion.

## Stack

- **Framework:** Next.js 15 (App Router, fully static)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Content:** Markdown files via gray-matter
- **Deploy:** Vercel

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a Project

Create a new file in `content/projects/<slug>.md`:

```markdown
---
title: Project Name
description: One-line description shown on the card.
tech: [Rust, TypeScript]
github: https://github.com/fennsaji/project-name
demo: https://demo-url.com   # optional
featured: true               # show on home page
order: 1                     # optional, home-page ordering for featured projects
year: 2025
# Optional case-study fields, rendered on /projects/<slug>:
problem: What was hard about this.
architecture: How it's built.
decisions:
  - "Quote each decision — unquoted 'Key: value' items parse as YAML maps and fail the build."
results: What shipped.
---

Fallback body, shown on /projects/<slug> as plain text when no case-study fields are set.
```

Required fields: `title`, `year`. All others are optional.

## Project Structure

```
app/               Pages (home, projects, about, contact)
components/        Shared UI components
content/projects/  Markdown files — one per project
lib/projects.ts    Content parsing utilities
tests/             Unit tests
```

## Tests

```bash
npm test
```

## Deploy

Pushes to `main` auto-deploy via Vercel.
