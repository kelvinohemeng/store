import { cn } from "@/lib/utils";

export default function Main({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("min-h-screen h-full", className)}>{children}</main>
  );
}
