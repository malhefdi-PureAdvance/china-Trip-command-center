import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

export const badgeVariants = cva(
  "inline-flex min-h-6 items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
  {
    variants: {
      tone: {
        neutral: "border-[var(--pa-border)] text-[var(--pa-muted)]",
        cyan: "border-[color-mix(in_srgb,var(--pa-cyan)_38%,transparent)] text-[var(--pa-cyan)]",
        green: "border-[color-mix(in_srgb,var(--pa-green)_38%,transparent)] text-[var(--pa-green)]",
        amber: "border-[color-mix(in_srgb,var(--pa-amber)_38%,transparent)] text-[var(--pa-amber)]",
        coral: "border-[color-mix(in_srgb,var(--pa-coral)_38%,transparent)] text-[var(--pa-coral)]"
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
