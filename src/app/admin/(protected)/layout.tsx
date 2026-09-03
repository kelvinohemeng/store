import { checkAdminAuth } from "@/actions/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

// The real admin-role gate, on the normal request path rather than in
// middleware — see the comment in src/app/login/layout.tsx for why this
// project has no proxy.ts at all. /admin/login lives outside this route
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
