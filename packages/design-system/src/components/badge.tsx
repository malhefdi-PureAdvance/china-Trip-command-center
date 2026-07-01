import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

export const badgeVariants = cva(
  "inline-flex min-h-[22px] items-center rounded-[var(--cc-r-chip)] border px-[9px] py-1 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.05em]",
  {
    variants: {
      tone: {
        neutral: "border-[var(--cc-border-strong)] bg-transparent text-[var(--cc-text-3)]",
        cyan: "border-[var(--cc-cyan)] bg-[var(--cc-cyan)] text-[var(--cc-cyan-ink)]",
        green: "border-[var(--cc-green)] bg-[var(--cc-green)] text-[var(--cc-green-ink)]",
        amber:
          "border-[var(--cc-amber-line)] bg-[var(--cc-amber-tint)] text-[var(--cc-amber-text)]",
        coral: "border-[var(--cc-amber-line)] bg-[var(--cc-amber-tint)] text-[var(--cc-amber-text)]"
      }
    },
    defaultVariants: {
      tone: "neutral"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ className, tone }))} {...props} />;
}
