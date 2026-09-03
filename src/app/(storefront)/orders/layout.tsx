import { checkUserAuth } from "@/actions/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

// Protect /orders: redirect to /login if there's no session. See the
// comment in src/app/login/layout.tsx for why this moved out of proxy.ts.
export const dynamic = "force-dynamic";

export default async function OrdersLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await checkUserAuth();

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
