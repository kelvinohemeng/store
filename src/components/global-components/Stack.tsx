import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type StackProps = PropsWithChildren & {
  orientation: "horizontal" | "vertical";
  className?: string;
  container?: ContainerType;
  gap?: GapType;
};

type ContainerType = "full-width" | "max" | "default";

type GapType = "default" | "medium" | "large";

export default function Stack({
  children,
  orientation = "horizontal",
  className,
  container = "full-width",
  gap = "default",
}: StackProps) {
  // No gap value here — gapStyles below is the single source of truth for
  // gap-*, so the two utilities can't ever land in the compiled CSS with
  // conflicting values and race on generated rule order.
  const orientationStyles: Record<StackProps["orientation"], string> = {
    horizontal: "flex",
    vertical: "flex flex-col",
  };

  const containerStyles: Record<ContainerType, string> = {
    "full-width": "w-full px-5",
    default: "max-w-[1440px] w-full mx-auto",
    max: "max-w-[1800px] w-full mx-auto",
  };

  const gapStyles: Record<GapType, string> = {
    default: "gap-6",
    medium: "gap-12",
    large: "gap-22",
  };

  return (
    <div
      className={cn(
        orientationStyles[orientation],
        containerStyles[container],
        gapStyles[gap],
        className
      )}
    >
      {children}
    </div>
  );
}
