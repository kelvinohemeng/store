import { checkAdminAuth } from "@/actions/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

// The real admin-role gate. Kept out of proxy.ts (middleware) on purpose —
// checking the session there would need a D1/DB call, and Cloudflare's
// OpenNext adapter flags DB-touching middleware as experimental "Node.js
// middleware". A route-group layout does the same job through the normal,
// fully-supported request path instead. /admin/login lives outside this
// group so it isn't gated by it.
export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isAdmin } = await checkAdminAuth();

  if (!isAdmin) {
    redirect("/404");
  }

  return <>{children}</>;
}
