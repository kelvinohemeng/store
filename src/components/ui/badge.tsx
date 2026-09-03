import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium capitalize w-fit whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "bg-neutral-100 text-neutral-700 border-neutral-200",
        green: "bg-green-50 text-green-700 border-green-200",
        yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
        blue: "bg-blue-50 text-blue-700 border-blue-200",
        red: "bg-red-50 text-red-700 border-red-200",
        dark: "bg-neutral-900 text-neutral-50 border-neutral-900",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  }
)

const dotVariants = cva("size-1.5 rounded-full shrink-0", {
  variants: {
    tone: {
      neutral: "bg-neutral-400",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      blue: "bg-blue-500",
      red: "bg-red-500",
      dark: "bg-neutral-50",
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

function Badge({ className, tone, dot = false, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {dot && <span className={cn(dotVariants({ tone }))} />}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
