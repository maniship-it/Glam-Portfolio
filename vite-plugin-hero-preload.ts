import type { Plugin } from "vite";
import fs from "fs";
import path from "path";

/**
 * Injects the LCP preload for the hero poster into index.html, built from the
 * same image-manifest.json the <img> uses at runtime.
 *
 * These were briefly maintained by hand in two places and drifted: the preload
 * offered one set of widths and the <img> another, so the browser downloaded
 * two different copies of the poster. Deriving both from one source makes that
 * impossible.
 *
 * Replaces the `<!--hero-preload-->` placeholder in client/index.html.
 */
export function heroPreloadPlugin(src = "/images/hero-poster.webp"): Plugin {
  return {
    name: "vite-plugin-hero-preload",
    transformIndexHtml(html) {
      if (!html.includes("<!--hero-preload-->")) return html;

      const manifestPath = path.resolve(
        process.cwd(),
        "client",
        "src",
        "lib",
        "image-manifest.json"
      );

      if (!fs.existsSync(manifestPath)) return html.replace("<!--hero-preload-->", "");

      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      const entry = manifest[src];
      if (!entry) return html.replace("<!--hero-preload-->", "");

      const base = src.replace(/\.(webp|jpe?g|png)$/i, "");
      const srcset = [
        ...entry.widths.map((w: number) => `${base}-${w}.webp ${w}w`),
        `${src} ${entry.width}w`,
      ].join(", ");

      const tag =
        `<link rel="preload" as="image" href="${src}" ` +
        `imagesrcset="${srcset}" imagesizes="100vw" fetchpriority="high" />`;

      return html.replace("<!--hero-preload-->", tag);
    },
  };
}
