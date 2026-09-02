import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";

function buildAuth() {
  const { env } = getCloudflareContext();

  return betterAuth({
    database: drizzleAdapter(getDb(), { provider: "sqlite" }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins: [env.BETTER_AUTH_URL],
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      // Adds `role` (default "user") to the user table/session payload —
      // this is what replaces the old `user_profiles.role` admin check.
      admin(),
      // Must be last: makes auth.api.* calls from Server Actions set the
      // session cookie automatically via next/headers.
      nextCookies(),
    ],
  });
}

// Built lazily (not at module-import time) because it needs the live
// Cloudflare bindings (D1, secrets), which only exist once a request is
// being handled — not while Next.js is building the app. Typed off
// `buildAuth` (rather than the generic `betterAuth`) so the plugin-extended
// shape (e.g. the admin plugin's `role` field) survives on `auth.api.*`.
let authInstance: ReturnType<typeof buildAuth> | undefined;

export function getAuth() {
  if (!authInstance) {
    authInstance = buildAuth();
  }
  return authInstance;
}
