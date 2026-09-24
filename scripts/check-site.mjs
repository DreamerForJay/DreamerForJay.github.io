import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import process from "node:process";

const root = process.cwd();
const htmlFiles = ["index.html", "blog.html", "blog-competition.html"];
const failures = [];
const fail = (file, message) => failures.push(`${file}: ${message}`);

for (const file of htmlFiles) {
  const absolute = resolve(root, file);
  if (!existsSync(absolute)) {
    fail(file, "file is missing");
    continue;
  }

  const html = readFileSync(absolute, "utf8");
  const required = [
    [/<title>[^<]+<\/title>/i, "missing title"],
    [/<meta\s+name="description"\s+content="[^"]+"/i, "missing meta description"],
    [/<meta\s+name="author"\s+content="[^"]+"/i, "missing author metadata"],
    [/<link\s+rel="canonical"\s+href="https:\/\/dreamerforjay\.github\.io\/[^"]*"/i, "missing production canonical URL"],
    [/<meta\s+property="og:image:alt"\s+content="[^"]+"/i, "missing Open Graph image alt text"],
    [/<meta\s+name="twitter:title"\s+content="[^"]+"/i, "missing Twitter title"],
    [/<link\s+rel="alternate"\s+type="application\/rss\+xml"/i, "missing RSS discovery link"],
  ];
  for (const [pattern, message] of required) if (!pattern.test(html)) fail(file, message);

  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  for (const id of new Set(ids)) {
    if (ids.filter((value) => value === id).length > 1) fail(file, `duplicate id "${id}"`);
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\balt="[^"]*"/i.test(tag)) fail(file, `image missing alt: ${tag}`);
    if (!/\bwidth="\d+"/i.test(tag) || !/\bheight="\d+"/i.test(tag)) {
      fail(file, `image missing intrinsic dimensions: ${tag}`);
    }
  }

  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch { fail(file, "invalid JSON-LD"); }
  }

  for (const match of html.matchAll(/<iframe\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\btitle="[^"]+"/i.test(tag)) fail(file, `iframe missing title: ${tag}`);
    if (!/\bloading="lazy"/i.test(tag)) fail(file, `iframe should load lazily: ${tag}`);
  }

  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/gi)) {
    const target = match[1].split(/[?#]/)[0];
    if (!target || /^(?:https?:|mailto:|tel:|#)/i.test(target)) continue;
    const localPath = resolve(root, dirname(file), target);
    if (!existsSync(localPath)) fail(file, `missing local resource "${target}"`);
    else if (/\.(?:avif|gif|jpe?g|png|webp)$/i.test(localPath) && statSync(localPath).size > 256 * 1024) {
      fail(file, `image exceeds 256 KiB budget: "${target}"`);
    }
  }
}

const homeHtml = readFileSync(resolve(root, "index.html"), "utf8");
if (/<sv-agent\b|id="avatar-start"|id="avatar-stage"/i.test(homeHtml)) fail("index.html", "AI avatar must be removed from the homepage");
if (/globe-card|globe-canvas|js\/globe\.js/i.test(homeHtml)) fail("index.html", "interactive globe must be removed from the homepage");
if (!/class="competition-list"/.test(homeHtml)) fail("index.html", "competition list is missing");
if (/id="projects"|href="#projects"/.test(homeHtml)) fail("index.html", "the separate projects section must be removed");
if ((homeHtml.match(/class="competition-heading"/g) || []).length !== 4) fail("index.html", "expected four named competitions");
if (!/data-i18n="awsCompetition">AWS 黑客松/.test(homeHtml)) fail("index.html", "AWS Hackathon must appear in the competition list");
if (!/id="research"[\s\S]*?GEMO3D/.test(homeHtml)) fail("index.html", "GEMO3D research entry is missing");
if (!/data-i18n="paperTitle"/.test(homeHtml)) fail("index.html", "GEMO3D title must support language switching");
if (!/class="publication-metrics"/.test(homeHtml)) fail("index.html", "GEMO3D research metrics are missing");
if (!/class="scroll-pipeline"/.test(homeHtml)) fail("index.html", "scroll progress pipeline is missing");
if (!/data-i18n="paperCandidate"/.test(homeHtml)) fail("index.html", "research entry is missing the Best Paper Candidate distinction");
if (!/<nav class="hero-links"[^>]*>[\s\S]*?href="https:\/\/www\.linkedin\.com\/in\/chieh-lun-yang\/"/.test(homeHtml)) fail("index.html", "hero LinkedIn link is missing");
if ((homeHtml.match(/data-i18n="taRole"/g) || []).length !== 1) fail("index.html", "teaching assistant must appear exactly once in experience");
if (/data-i18n="educationTa"|<article class="community-row reveal">[\s\S]*?Teaching Assistant/.test(homeHtml)) fail("index.html", "teaching assistant must not be duplicated in education or community");

const articleHtml = readFileSync(resolve(root, "blog-competition.html"), "utf8");
if (!/assets\/social\/blog-competition\.png/.test(articleHtml)) fail("blog-competition.html", "missing dedicated social share image");
if (!/<meta\s+property="og:image:width"\s+content="1200"/.test(articleHtml) || !/<meta\s+property="og:image:height"\s+content="630"/.test(articleHtml)) fail("blog-competition.html", "social image must declare 1200x630 dimensions");
if (!/"@type":"BreadcrumbList"/.test(articleHtml)) fail("blog-competition.html", "missing breadcrumb structured data");
if (!/id="copy-link"/.test(articleHtml) || !/id="article-navigation"/.test(articleHtml)) fail("blog-competition.html", "missing article sharing or navigation controls");

const cssFiles = ["foundation.css", "portfolio.css", "editorial.css", "responsive.css"];
const css = cssFiles.map((file) => readFileSync(resolve(root, "css", file), "utf8")).join("\n");
if (/^@import/m.test(css)) fail("css", "avoid render-delaying CSS @import");
const cssBytes = Buffer.byteLength(css, "utf8");
if (cssBytes > 62 * 1024) fail("css", `CSS budget exceeded: ${cssBytes} bytes (limit: 63488)`);
const responsiveBlocks = (css.match(/@media\s*\(max-width:/g) || []).length;
if (responsiveBlocks > 16) fail("css", `too many max-width media blocks: ${responsiveBlocks} (limit: 16)`);

const sitemap = readFileSync(resolve(root, "sitemap.xml"), "utf8");
for (const file of htmlFiles) {
  const url = file === "index.html" ? "https://dreamerforjay.github.io/" : `https://dreamerforjay.github.io/${file}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) fail("sitemap.xml", `missing ${url}`);
}

const feed = readFileSync(resolve(root, "feed.xml"), "utf8");
if (!feed.includes("<rss version=\"2.0\"")) fail("feed.xml", "missing RSS 2.0 root");
if (!feed.includes("https://dreamerforjay.github.io/blog-competition.html")) fail("feed.xml", "missing published article");
try { JSON.parse(readFileSync(resolve(root, "manifest.webmanifest"), "utf8")); } catch { fail("manifest.webmanifest", "invalid JSON"); }

if (failures.length) {
  console.error(`Site checks failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Site checks passed for ${htmlFiles.length} HTML pages.`);
