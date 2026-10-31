# Owload documentation

The public documentation of [Owload](https://owload.com), encrypted cloud storage in which your files never leave your browser unencrypted. This repository holds the guides for users, the self-hosting guide, and the descriptions of the security model and the architecture.

The site is built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build). The code of the product is in [owload-frontend](https://github.com/owload/owload-frontend) and [owload-backend](https://github.com/owload/owload-backend).

## Run it locally

You need Node.js 22 or newer.

```bash
npm install
npm run dev        # the site, with live reload
npm run build      # a static site in dist/
npm run preview    # serves what was built
```

## Settings

All of them are optional. Copy `.env.example` to `.env` to set them locally.

| Variable | What it does |
| --- | --- |
| `PUBLIC_APP_URL` | Where the "Sign in" and "Try Owload" buttons lead. By default, `https://owload.com` |
| `SITE` | The address the site is served from |
| `BASE` | The sub-path of the site, if it is not served from the root |

## Where things are

| Path | What it holds |
| --- | --- |
| `src/content/docs/` | The pages, one `.mdx` file for each |
| `astro.config.mjs` | The sidebar, which lists every page |
| `src/figures.ts` | The list of figures, with their captions and descriptions |
| `public/figures/` | The finished figures and screenshots |
| `src/snippets/` | The configuration files shown in the self-hosting guide |
| `src/components/` | The components of the pages, and the overrides of Starlight's own |
| `src/styles/owload.css` | The look of the site |

## Write a page

1. Add an `.mdx` file to `src/content/docs/`, with a `title` and a `description` at the top.
2. Add it to the `sidebar` in `astro.config.mjs`.
3. Link between pages with relative paths and heading anchors, such as `../storage/#connect-your-own-s3`. On the first page, `index.mdx`, they start with `./`.

All content is in English. Describe what the product does today, and check it against the code.

## Add a figure

Use `<Figure name="…" />` on a page, and add an entry with that name to `src/figures.ts`. Until the entry has a `src`, the page shows a placeholder with the brief and a rough sketch. To finish a figure, put the image in `public/figures/`, then set `src` and `alt`.

Check a screenshot before you add it: it should show no personal data, keys or real server addresses.
