import { checkUserAuth } from "@/actions/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

// Redirect-away-if-authenticated gate for /signup. See the comment in
// src/app/login/layout.tsx for why this moved out of proxy.ts.
export const dynamic = "force-dynamic";

export default async function SignupLayout({
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
