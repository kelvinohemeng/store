import React from "react";
import { twMerge } from "tailwind-merge";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

// ** Main Typography Types
export interface TypographyProps {
  variant?: TypographyVariant;
  component?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success"
    | "inherit";
  align?: "left" | "center" | "right" | "justify";
  gutterBottom?: boolean;
  noWrap?: boolean;
}

// ** Variant Mapping Values
const variantMapping: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
};

// ** Variant Styles Values
const variantStyles: Record<TypographyVariant, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-bold",
  h3: "text-2xl font-bold",
  h4: "text-xl font-semibold",
  h5: "text-lg font-semibold",
  h6: "text-base font-semibold",
  subtitle1: "text-lg font-medium",
  subtitle2: "text-base font-medium",
  body1: "text-base",
  body2: "text-sm",
  caption: "text-xs",
  overline: "text-xs uppercase tracking-wider",
};

// ** Color Styles Values
const colorStyles: Record<NonNullable<TypographyProps["color"]>, string> = {
  primary: "text-primary-600 dark:text-primary-400",
  secondary: "text-gray-600 dark:text-gray-400",
  error: "text-red-600 dark:text-red-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  info: "text-blue-600 dark:text-blue-400",
  success: "text-green-600 dark:text-green-400",
  inherit: "",
};

// ** Align Styles Values
const alignStyles: Record<NonNullable<TypographyProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export const Typography = ({
  variant = "body1",
  component,
  className = "",
  children,
  color = "inherit",
  align = "left",
  gutterBottom = false,
  noWrap = false,
  ...rest
}: TypographyProps & Omit<React.HTMLAttributes<HTMLElement>, "color">) => {
  const Component = component || variantMapping[variant];

  const classes = twMerge(
    variantStyles[variant],
    colorStyles[color],
    alignStyles[align],
    gutterBottom && "mb-4",
    noWrap && "whitespace-nowrap overflow-hidden text-ellipsis",
    className,
    "font-display"
  );

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;
