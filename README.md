# Chieh-Lun Yang — Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-2fd8c0?logo=github)](https://dreamerforjay.github.io/)
[![Site quality](https://github.com/DreamerForJay/DreamerForJay.github.io/actions/workflows/quality.yml/badge.svg)](https://github.com/DreamerForJay/DreamerForJay.github.io/actions/workflows/quality.yml)

Personal portfolio and blog of **Chieh-Lun Yang (楊杰倫)**, a Computer Science student focused on applied AI, software testing, product development, and technical communities.

**Live site:** [dreamerforjay.github.io](https://dreamerforjay.github.io/)

## Highlights

- Responsive bilingual portfolio for desktop, tablet, and mobile
- Persistent dark/light theme and language preferences
- Work experience, education, community leadership, and selected projects
- Interactive globe centered on Taoyuan, Taiwan with local date and time
- Searchable, tag-filtered blog and LinkedIn article embed
- Lazy-loaded Perxona AI avatar widget
- Accessible dialogs, skip links, keyboard focus states, and reduced-motion support
- Canonical URLs, Open Graph metadata, structured data, sitemap, and robots directives

## Tech stack

- Semantic HTML5
- Modern CSS with responsive layouts and design tokens
- Vanilla JavaScript
- Canvas-based interactive globe
- GitHub Pages

No application framework or runtime dependency is required in production.

## Project structure

```text
.
├── assets/
│   ├── community-logos/
│   ├── company-logos/
│   ├── data/
│   └── profile/
├── css/
│   ├── foundation.css
│   ├── portfolio.css
│   ├── editorial.css
│   └── responsive.css
├── js/
│   ├── blog.js
│   ├── globe.js
│   ├── main.js
│   └── menu.js
├── partials/
│   └── command-bar.html
├── scripts/
│   ├── check-site.mjs
│   └── sync-shell.mjs
├── .github/workflows/
│   └── quality.yml
├── manifest.webmanifest
├── index.html
├── blog.html
├── blog-competition.html
├── robots.txt
└── sitemap.xml
```

## Local development

```bash
git clone https://github.com/DreamerForJay/DreamerForJay.github.io.git
cd DreamerForJay.github.io
python -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

The site should be served through HTTP instead of opening `index.html` directly because the globe loads local GeoJSON data.

## Quality checks

Node.js 20 or newer is recommended for local checks.

```bash
npm run sync:shell  # propagate shared navigation changes
npm run check       # validate the complete site
```

The check verifies:

- JavaScript syntax
- Required SEO metadata
- Unique HTML IDs
- Image alternative text and intrinsic dimensions
- Local image, script, and stylesheet references
- Sitemap coverage for public HTML pages

The same command runs automatically on every push and pull request through GitHub Actions.

## Deployment

GitHub Pages publishes the repository root from the `main` branch. Pushing to `main` triggers the Pages deployment automatically.

Production URL:

```text
https://dreamerforjay.github.io/
```

When adding a new public page, also add its canonical URL to `sitemap.xml`.

## Content updates

- Portfolio content and page structure: `index.html`
- Translations and home interactions: `js/main.js`
- Blog metadata and filters: `js/blog.js`
- Design tokens and shared primitives: `css/foundation.css`
- Portfolio, experience, education, and project layouts: `css/portfolio.css`
- Blog, article, menu, and long-form layouts: `css/editorial.css`
- Final responsive type and control calibration: `css/responsive.css`
- Images and logos: `assets/`

The Perxona widget uses a browser-visible client key. Keep its deployment restricted to the production domain in the Perxona dashboard and rotate it if the domain or owner changes.

## License

© 2026 Chieh-Lun Yang. All rights reserved unless otherwise stated. Third-party logos and trademarks belong to their respective owners.
