import { CSSProperties, PropsWithChildren } from "react";

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
  const orientationStyles: Record<StackProps["orientation"], string> = {
    horizontal: "flex gap-1",
    vertical: "flex flex-col gap-1",
  };

  const containerStyles: Record<ContainerType, string> = {
    "full-width": "w-full px-5",
    default: "max-w-[1440px] mx-auto",
    max: "max-w-[1800px] mx-auto",
  };

  const gapStyles: Record<GapType, string> = {
    default: "gap-6",
    medium: "gap-12",
    large: "gap-22",
  };

  return (
    <div
      className={`
        ${orientationStyles[orientation]} 
        ${containerStyles[container]}
        ${gapStyles[gap]}
        ${className || ""}`}
    >
      {children}
    </div>
  );
}
