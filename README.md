# Q for Developers

A static React and Vite landing page for Q developer early access. The site can be deployed on GitHub Pages and sends signup requests directly to the PrestoQ API.

## Local development

```sh
npm install
cp .env.example .env.local
npm run dev
```

The API origin defaults to `https://qsandbox.prestoghana.com`. Set `VITE_API_BASE` in `.env.local` to override it. Vite environment values are public in the built site; do not put secrets in them.

## Build

```sh
npm run build
npm run preview
```

The production files are written to `dist/`. Vite is configured with relative asset paths for GitHub Pages project sites.

## Project structure

- `src/components/` reusable UI pieces
- `src/layout/` shared page header and footer
- `src/sections/` landing page sections
- `src/data/` capability and onboarding copy
- `src/services/` API requests
- `src/styles/` global and page styles

## Early access API

`src/services/earlyAccessApi.js` posts to `POST /developers/early-access`. The form includes name, email, company, use case, and a hidden honeypot field. The API handles persistence and email notifications.
