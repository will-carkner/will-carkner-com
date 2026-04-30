# Agent notes for will-carkner-com

## Committing

The user has a custom `qc` binary at `~/.cargo/bin/qc` that handles commits the
way they like them: it stages all changes, commits, and pushes to the remote in
one step. When the user asks to commit, run `qc` from the repo root instead of
using `git add` / `git commit` / `git push` manually.

Do NOT write commit messages by hand unless the user explicitly asks — `qc` is
the canonical path.

## Stack quick reference

- Astro 5 + `@astrojs/vercel` + `@astrojs/tailwind` + `@astrojs/sitemap` + `@astrojs/rss`
- pnpm (see `pnpm-lock.yaml`); Node 22.x (see `package.json` engines and `.github/workflows/daily-art.yml`)
- Content collection `blog` defined in `src/content/config.ts`
- Daily art JSON is updated by `.github/workflows/daily-art.yml` (cron every 2 days) via `.github/scripts/art_scraper.mjs`; output lives in `public/daily-art.json` and `public/art-archive.json`
- No `postcss.config.cjs` — `@astrojs/tailwind` handles everything
- `/gift` is an intentionally standalone, `noindex` personal page (does NOT use `Layout.astro`)

## Build verification

After non-trivial edits, run `pnpm build` and confirm it completes without errors.
