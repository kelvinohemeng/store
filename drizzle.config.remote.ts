import { defineConfig } from "drizzle-kit";

// Points Drizzle Studio at the deployed D1 database over Cloudflare's HTTP
// API instead of a local sqlite file. Needs a Cloudflare API token with D1
// edit permissions — create one at
// https://dash.cloudflare.com/profile/api-tokens ("Edit Cloudflare Workers"
// template covers it) and put it in .env (gitignored, and this is the file
// drizzle-kit auto-loads — .dev.vars is a wrangler-only convention it won't
// read) as CLOUDFLARE_API_TOKEN=... Run with:
//   npx drizzle-kit studio --config=drizzle.config.remote.ts
export default defineConfig({
  dialect: "sqlite",
  driver: "d1-http",
  schema: "./src/db/schema/index.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    // From wrangler.jsonc — these two aren't secret, just identifiers.
    accountId: "dd1a4873625fc422d64807de93566fc5",
    databaseId: "dd6cc841-b500-4584-b7ec-1a7048d02575",
    token: process.env.CLOUDFLARE_API_TOKEN!,
  },
});
