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
year: 2025
---

Longer description here (reserved for future detail pages).
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
