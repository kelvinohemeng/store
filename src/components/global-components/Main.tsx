"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Main({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const path = usePathname();
  // const adminRoutes = path.startsWith("/admin");
  return (
    <>
      <main className={cn(`${className} h-full`)}>{children}</main>
    </>
  );
}
