---
title: Disciplefy
description: AI-powered Bible study guide generator. Multi-language support, anonymous and OAuth access, cross-platform on iOS, Android, and Web — with a Rust service auto-generating the companion blog.
tech: [Flutter, Rust, TypeScript, React, Supabase, OpenAI, Firebase]
github: https://github.com/fennsaji/disciplefy
demo: https://www.disciplefy.in
featured: true
order: 3
year: 2025
problem: >
  Bible study guide generation needed to work for anonymous visitors
  (low friction, try before signing up) and signed-in users (higher
  usage caps), across three languages, without one AI provider outage
  taking the whole feature down. Separately, the companion blog needed
  a steady stream of multilingual posts without hand-writing each one.
architecture: >
  Flutter client with Supabase Edge Functions as the study-guide backend.
  AI generation calls OpenAI GPT-3.5 first, falls back to Claude Haiku,
  then to static mock data if both providers fail — the feature degrades
  instead of erroring. Access control differentiates anonymous
  (rate-limited) from OAuth (Google/Apple) sessions at the edge-function
  layer, backed by Row Level Security on Postgres. A separate Rust
  service (Axum + SQLx + Tokio) serves the blog API and runs the content
  pipeline: a cron job picks a learning-path topic missing locale
  coverage, streams a generated study guide per locale from the same
  Supabase edge function via SSE, formats it into localized markdown,
  and publishes it as a blog post — with a retry cron for partial
  failures and admin endpoints to trigger generation or hot-reload
  schedules on demand.
decisions:
  - "Three-tier AI fallback chain (GPT-3.5 → Claude Haiku → mock data): treats provider outages as expected, not exceptional — the feature stays usable in degraded mode instead of failing outright."
  - "Different rate limits for anonymous (3/hr) vs OAuth (30/hr): lets people try the product with zero signup friction while keeping AI-cost exposure bounded per class of user."
  - "Blog generation as a separate Rust service instead of more Edge Functions: cron scheduling, concurrency guards, and admin control fit a long-running process better than the request/response model Edge Functions are built for."
  - "Reused the same study-guide generation pipeline for blog content instead of a separate content pipeline: one source of AI-generation logic to maintain, not two."
results: >
  Live product at disciplefy.in supporting English, Hindi, and
  Malayalam, running on both anonymous and OAuth access tiers across
  iOS, Android, and Web, with a self-sustaining multilingual blog
  publishing on a daily cron.
---
