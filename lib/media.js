import { readdir } from "fs/promises";
import path from "path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm"]);

async function walk(directory) {
  let entries = [];

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return walk(fullPath);
      }

      return fullPath;
    }),
  );

  return nested.flat();
}

function toPublicUrl(fullPath) {
  const relativePath = path.relative(path.join(process.cwd(), "public"), fullPath);
  return `/${relativePath.split(path.sep).map(encodeURIComponent).join("/")}`;
}

export async function getMediaFromDirectory(publicDirectory, extensions) {
  const directory = path.join(process.cwd(), "public", publicDirectory);
  const files = await walk(directory);

  return files
    .filter((filePath) => extensions.has(path.extname(filePath).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map(toPublicUrl);
}

export async function getImageCollection() {
  return getMediaFromDirectory("IMAGES", IMAGE_EXTENSIONS);
}

export async function getVideoCollection() {
  return getMediaFromDirectory("VIDEOS", VIDEO_EXTENSIONS);
}

export function pickEvery(items, step = 1, max = items.length) {
  return items.filter((_, index) => index % step === 0).slice(0, max);
}
