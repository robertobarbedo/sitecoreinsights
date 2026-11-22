# Sitecore Insights blog

A static blog built with [Astro](https://astro.build). Posts are Markdown files; the site has an RSS feed, a sitemap, topic pages, light and dark themes, and no tracking.

## Requirements

Node.js **22.23.4 or newer** (Astro 7 refuses to start on older versions).

## Commands

```
npm install      # once
npm run dev      # local preview at http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Writing a post

Add a `.md` (or `.mdx`) file to `src/content/blog/`. The file name becomes the URL: `my-post.md` is published at `/blog/my-post/`.

```md
---
title: The post title
description: One or two sentences. Shown under the title, in lists, in search results and in social previews.
pubDate: 2026-11-21          # the real publish date
updatedDate: 2026-12-01      # optional
tags: [marketplace, nextjs]  # optional; each tag gets its own page
audience: [developers]       # developers, business, or both
draft: true                  # optional; drafts show in `npm run dev` only
---

Post body in Markdown. Use `##` for sections; they become the "On this page" list.
```

## Where things are

| What | Where |
| --- | --- |
| Site name, author, nav, social links, posts published elsewhere | `src/site.config.ts` |
| Domain (canonical URLs, RSS, sitemap) | `site` in `astro.config.mjs`, and the sitemap line in `public/robots.txt` |
| Colours, fonts, article styles | `src/styles/global.css` |
| Page shell, SEO and social tags | `src/layouts/Base.astro` |
| About page | `src/pages/about.astro` |

## Deploying to Vercel

1. Put this folder in its own Git repository and push it to GitHub.
2. In Vercel, import the repository. Astro is detected automatically (build `npm run build`, output `dist`).
3. Add the domain in the project's Domains settings.
