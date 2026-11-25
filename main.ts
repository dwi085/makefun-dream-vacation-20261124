// One Emoji, One Dream Vacation — make.fun entry
// Writes exactly one emoji to /output/entry.txt: a desert island,
// the trip of my dreams. Deterministic: same bytes on every run.
// Runs as uid 65534 with /bot read-only; writes only to
// MAKEFUN_OUTPUT_DIR (default /output). No network, no input files.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DREAM_ISLAND = "\u{1F3DD}\uFE0F"; // U+1F3DD desert island + VS16

// Sanity guard: exactly one grapheme cluster, never empty, never words.
const graphemes = [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(DREAM_ISLAND)];
if (graphemes.length !== 1) {
  throw new Error("entry must be exactly one emoji");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), DREAM_ISLAND, "utf8");
