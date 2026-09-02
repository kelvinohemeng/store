// Augments the generated `cloudflare-env.d.ts` (interface merging) with
// bindings that only exist as Wrangler secrets and therefore never show up
// when `wrangler types` inspects wrangler.jsonc.
export {};

declare global {
  interface CloudflareEnv {
    BETTER_AUTH_SECRET: string;
    PAYSTACK_SECRET_KEY: string;
  }

  namespace Cloudflare {
    interface Env {
      BETTER_AUTH_SECRET: string;
      PAYSTACK_SECRET_KEY: string;
    }
  }
}
