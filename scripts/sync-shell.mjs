import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

const root = process.cwd();
const partialPath = resolve(root, "partials/command-bar.html");
const pages = ["index.html", "blog.html", "blog-competition.html"];
const checkOnly = process.argv.includes("--check");
const start = "<!-- shared:command-bar:start -->";
const end = "<!-- shared:command-bar:end -->";

if (!existsSync(partialPath)) throw new Error("Missing partials/command-bar.html");
const partial = readFileSync(partialPath, "utf8").trim();
let stale = false;

for (const page of pages) {
  const path = resolve(root, page);
  const source = readFileSync(path, "utf8");
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  if (!pattern.test(source)) throw new Error(`${page}: shared command-bar markers are missing`);
  const expected = `${start}\n${partial}\n  ${end}`;
  const next = source.replace(pattern, expected);
  if (next !== source) {
    stale = true;
    if (!checkOnly) {
      writeFileSync(path, next);
      console.log(`Updated ${page}`);
    } else {
      console.error(`${page}: command bar is out of sync; run npm run sync:shell`);
    }
  }
}

if (checkOnly && stale) process.exit(1);
if (!stale) console.log("Shared command bar is synchronized across all pages.");
