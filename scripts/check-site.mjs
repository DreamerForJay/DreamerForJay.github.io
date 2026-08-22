import { existsSync, readFileSync } from "node:fs";
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
    [/<link\s+rel="canonical"\s+href="https:\/\/dreamerforjay\.github\.io\/[^"]*"/i, "missing production canonical URL"],
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

  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/gi)) {
    const target = match[1].split(/[?#]/)[0];
    if (!target || /^(?:https?:|mailto:|tel:|#)/i.test(target)) continue;
    const localPath = resolve(root, dirname(file), target);
    if (!existsSync(localPath)) fail(file, `missing local resource "${target}"`);
  }
}

const cssFiles = ["foundation.css", "portfolio.css", "editorial.css", "responsive.css"];
const css = cssFiles.map((file) => readFileSync(resolve(root, "css", file), "utf8")).join("\n");
if (/^@import/m.test(css)) fail("css", "avoid render-delaying CSS @import");
const cssBytes = Buffer.byteLength(css, "utf8");
if (cssBytes > 56 * 1024) fail("css", `CSS budget exceeded: ${cssBytes} bytes (limit: 57344)`);
const responsiveBlocks = (css.match(/@media\s*\(max-width:/g) || []).length;
if (responsiveBlocks > 24) fail("css", `too many max-width media blocks: ${responsiveBlocks} (limit: 24)`);

const sitemap = readFileSync(resolve(root, "sitemap.xml"), "utf8");
for (const file of htmlFiles) {
  const url = file === "index.html" ? "https://dreamerforjay.github.io/" : `https://dreamerforjay.github.io/${file}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) fail("sitemap.xml", `missing ${url}`);
}

if (failures.length) {
  console.error(`Site checks failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Site checks passed for ${htmlFiles.length} HTML pages.`);
