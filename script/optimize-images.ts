/*
Generates responsive derivatives of the photography in client/public/images.

The originals are 1600-2400px tall but the gallery and Instagram grids display
them at roughly 300-600px, so every visitor was downloading several megabytes
of detail no screen ever showed. This writes smaller siblings next to each
original (name-400.webp, name-800.webp) which the grids reference through
srcset; the untouched original is still what the lightbox opens, so nothing is
lost visually.

Re-run after adding photos:  npx tsx script/optimize-images.ts
Existing derivatives are skipped unless --force is passed.
*/

import sharp from "sharp";
import { readdir, stat, mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const PUBLIC_DIR = path.resolve("client", "public");
const RESPONSIVE_DIRS = ["images/gallery", "images/instagram"];

/* Individually referenced images outside those directories. */
const RESPONSIVE_FILES = ["images/academy-hero.jpg"];

/*
400/800 alone left a gap: a 412px viewport at devicePixelRatio 2 needs ~824px,
so the browser skipped straight to the 1600px original. 1200 gives it a step
that actually fits.
*/
const WIDTHS = [400, 800, 1200];
const QUALITY = 80;

const force = process.argv.includes("--force");

const DERIVATIVE = /-(\d+)\.webp$/;
const SOURCE = /\.(webp|jpe?g|png)$/i;

function kb(bytes: number) {
  return `${(bytes / 1024).toFixed(0)}K`;
}

let originalTotal = 0;
let derivedTotal = 0;

/*
Written to client/src/lib/image-manifest.json so the app knows, per image, its
intrinsic size (to reserve layout space) and exactly which derivative widths
exist (so srcset never points at a file that was never generated).
*/
type ManifestEntry = { width: number; height: number; widths: number[] };
const manifest: Record<string, ManifestEntry> = {};

async function makeDerivatives(file: string) {
  const dir = path.dirname(file);
  const base = path.basename(file).replace(SOURCE, "");
  const source = sharp(file);
  const { width, height } = await source.metadata();
  if (!width || !height) return;

  originalTotal += (await stat(file)).size;

  const publicPath = "/" + path.relative(PUBLIC_DIR, file).split(path.sep).join("/");
  const generated: number[] = [];

  for (const target of WIDTHS) {
    // Never upscale — a 450px original stays as it is.
    if (width <= target) continue;

    const out = path.join(dir, `${base}-${target}.webp`);
    generated.push(target);

    if (existsSync(out) && !force) {
      derivedTotal += (await stat(out)).size;
      continue;
    }

    await sharp(file)
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(out);

    const size = (await stat(out)).size;
    derivedTotal += size;
    console.log(`  ${path.relative(PUBLIC_DIR, out)}  ${kb(size)}`);
  }

  manifest[publicPath] = { width, height, widths: generated };
}

/*
The hero poster is the Largest Contentful Paint element on the landing page.
The original is a 1798px wide, 572K webp shown behind a dark gradient overlay,
so it can be re-encoded far more aggressively without any visible difference.
*/
const POSTER_BASE_WIDTH = 1280;

/*
900 exists specifically for phones at devicePixelRatio 2: a 412px viewport needs
~824px, and without this step the browser jumped from 800 straight to the 1280
desktop poster on the page's LCP element.
*/
const POSTER_WIDTHS = [400, 640, 900];
const POSTER_QUALITY = 62;

async function makeHeroPoster() {
  const src = path.join(PUBLIC_DIR, "images", "hero-indian.webp");

  if (!existsSync(src)) {
    console.log("  hero-indian.webp not found, skipping poster");
    return;
  }

  // Every size is encoded from the full-resolution master. Deriving the small
  // ones from the already-compressed poster inflated them past the original.
  const targets: [string, number][] = [
    ["hero-poster.webp", POSTER_BASE_WIDTH],
    ...POSTER_WIDTHS.map((w) => [`hero-poster-${w}.webp`, w] as [string, number]),
  ];

  for (const [name, width] of targets) {
    const out = path.join(PUBLIC_DIR, "images", name);
    if (existsSync(out) && !force) {
      console.log(`  ${name} exists (${kb((await stat(out)).size)}), skipping`);
      continue;
    }

    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: POSTER_QUALITY, effort: 6 })
      .toFile(out);

    console.log(`  images/${name}  ${kb((await stat(out)).size)}`);
  }

  const meta = await sharp(path.join(PUBLIC_DIR, "images", "hero-poster.webp")).metadata();
  manifest["/images/hero-poster.webp"] = {
    width: meta.width ?? POSTER_BASE_WIDTH,
    height: meta.height ?? 0,
    widths: POSTER_WIDTHS,
  };
}

async function run() {
  // Before the derivative pass, so the poster gets responsive siblings too.
  console.log("hero poster:");
  await makeHeroPoster();

  for (const rel of RESPONSIVE_DIRS) {
    const dir = path.join(PUBLIC_DIR, rel);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
      continue;
    }

    console.log(`\n${rel}:`);

    const files = (await readdir(dir))
      .filter((f) => SOURCE.test(f) && !DERIVATIVE.test(f))
      .map((f) => path.join(dir, f));

    for (const file of files) await makeDerivatives(file);
  }

  console.log("\nstandalone images:");
  for (const rel of RESPONSIVE_FILES) {
    const file = path.join(PUBLIC_DIR, rel);
    if (existsSync(file)) await makeDerivatives(file);
  }

  const manifestPath = path.resolve("client", "src", "lib", "image-manifest.json");
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(manifestPath, JSON.stringify(sorted, null, 2) + "\n");
  console.log(`\nwrote ${path.relative(process.cwd(), manifestPath)} (${Object.keys(sorted).length} images)`);

  console.log(
    `\noriginals ${kb(originalTotal)} -> derivatives ${kb(derivedTotal)} ` +
      `(grids now load the derivatives; originals stay for the lightbox)`
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
