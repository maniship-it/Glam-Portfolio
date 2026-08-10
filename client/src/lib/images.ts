/*
Helpers for the responsive image derivatives produced by script/optimize-images.ts.

That script writes `name-400.webp` / `name-800.webp` next to each original and
records what it generated in image-manifest.json. The grids reference the
derivatives through srcset so the browser downloads the smallest file that
still fills the slot; the untouched original remains what the lightbox opens,
so nothing is lost visually.
*/

import manifest from "./image-manifest.json";

type ManifestEntry = { width: number; height: number; widths: number[] };

const IMAGES = manifest as Record<string, ManifestEntry>;

/**
 * srcset for an optimized image, or "" when the image has no derivatives
 * (small originals get none — listing a missing file would 404).
 */
export function responsiveSrcSet(src: string): string {
  const entry = IMAGES[src];
  if (!entry || entry.widths.length === 0) return "";

  const base = src.replace(/\.(webp|jpe?g|png)$/i, "");

  return [
    ...entry.widths.map((w) => `${base}-${w}.webp ${w}w`),
    `${src} ${entry.width}w`,
  ].join(", ");
}

/** Intrinsic dimensions, so <img> can reserve space and avoid layout shift. */
export function intrinsicSize(src: string): { width?: number; height?: number } {
  const entry = IMAGES[src];
  return entry ? { width: entry.width, height: entry.height } : {};
}
