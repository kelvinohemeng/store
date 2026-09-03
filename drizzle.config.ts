import { defineConfig } from "drizzle-kit";
import fs from "node:fs";
import path from "node:path";

// `next dev` (via @opennextjs/cloudflare's getCloudflareContext) reads/writes
// the local D1 database through Miniflare, which persists it as a sqlite
// file under .wrangler/state with a content-hash filename — there's no
// fixed path to point Studio at. Resolve it at config-load time instead of
// hardcoding a filename that changes if the local DB is ever reset.
function getLocalD1DB() {
  const basePath = path.resolve(".wrangler/state/v3/d1");

  try {
    const candidates = fs
      .readdirSync(basePath, { recursive: true })
      .filter(
        (file) =>
          typeof file === "string" &&
          file.endsWith(".sqlite") &&
          !file.endsWith("metadata.sqlite")
      ) as string[];

    if (candidates.length === 0) {
      throw new Error(`No .sqlite file found under ${basePath}`);
    }

    // If more than one exists (stale runs), the most recently written one
    // is the live database.
    const newest = candidates
      .map((file) => path.join(basePath, file))
      .sort(
        (a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs
      )[0];

    // The libsql driver (drizzle-kit's local sqlite client) wants a
    // "file:" URL, not a bare filesystem path — matters on Windows, where
    // an absolute path like "C:\..." otherwise gets parsed as URL scheme
    // "C:".
    return `file:${newest.replace(/\\/g, "/")}`;
  } catch (error) {
    console.error(
      `Could not find the local D1 sqlite file under ${basePath} — run "npm run dev" at least once first so Miniflare creates it.\n${error}`
    );
    return "";
  }
}

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema/index.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: getLocalD1DB(),
  },
});
