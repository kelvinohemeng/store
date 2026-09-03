import { checkUserAuth } from "@/actions/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

// Redirect-away-if-authenticated gate for /login. Used to live in proxy.ts
// (middleware), but Next.js 16 always runs Proxy on the Node.js runtime —
// there's no edge option anymore — and Cloudflare's OpenNext adapter bundles
// Node.js middleware as its own chunk that pulls in the full (unpatched)
// @vercel/og library, ~1.5MB of resvg/yoga wasm, blowing past the free
// plan's 3MB Worker size cap. A route layout does the same job on the
// normal, fully-supported request path instead (same pattern as
// admin/(protected)/layout.tsx).
export const dynamic = "force-dynamic";

export default async function LoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await checkUserAuth();

  if (user) {
    redirect("/home");
  }

  return <>{children}</>;
}
