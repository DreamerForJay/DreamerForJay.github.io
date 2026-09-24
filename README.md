# Chieh-Lun Yang — Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-2fd8c0?logo=github)](https://dreamerforjay.github.io/)
[![Site quality](https://github.com/DreamerForJay/DreamerForJay.github.io/actions/workflows/quality.yml/badge.svg)](https://github.com/DreamerForJay/DreamerForJay.github.io/actions/workflows/quality.yml)

Personal portfolio and blog of **Chieh-Lun Yang (楊杰倫)**, a Computer Science student focused on applied AI, software testing, product development, and technical communities.

**Live site:** [dreamerforjay.github.io](https://dreamerforjay.github.io/)

## Highlights

- Responsive bilingual portfolio for desktop, tablet, and mobile
- Persistent dark/light theme and language preferences
- Portrait-led introduction, experience, education, and community leadership
- A concise competitions and awards list, including the AWS Hackathon project
- Searchable, tag-filtered blog and LinkedIn article embed
- Accessible dialogs, skip links, keyboard focus states, and reduced-motion support
- Canonical URLs, Open Graph metadata, structured data, sitemap, and robots directives

## Tech stack

- Semantic HTML5
- Modern CSS with responsive layouts and design tokens
- Vanilla JavaScript
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
│   ├── responsive.css
│   └── homepage.css
├── js/
│   ├── blog.js
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

Serve the site through HTTP to match its GitHub Pages environment.

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
- Homepage portrait and competition list: `css/homepage.css`
- Images and logos: `assets/`

## License

© 2026 Chieh-Lun Yang. All rights reserved unless otherwise stated. Third-party logos and trademarks belong to their respective owners.
