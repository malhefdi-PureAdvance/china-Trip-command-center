import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

export const badgeVariants = cva(
  "inline-flex min-h-6 items-center rounded-full border px-2.5 py-1 text-xs font-semibold leading-none tracking-[-0.01em]",
  {
    variants: {
      tone: {
        neutral:
          "border-[color-mix(in_srgb,var(--pa-muted)_28%,transparent)] bg-[color-mix(in_srgb,var(--pa-muted)_9%,transparent)] text-[var(--pa-muted)]",
        cyan: "border-[color-mix(in_srgb,var(--pa-cyan)_34%,transparent)] bg-[color-mix(in_srgb,var(--pa-cyan)_12%,transparent)] text-[var(--pa-cyan)]",
        green:
          "border-[color-mix(in_srgb,var(--pa-green)_34%,transparent)] bg-[color-mix(in_srgb,var(--pa-green)_12%,transparent)] text-[var(--pa-green)]",
        amber:
          "border-[color-mix(in_srgb,var(--pa-amber)_38%,transparent)] bg-[color-mix(in_srgb,var(--pa-amber)_13%,transparent)] text-[var(--pa-amber)]",
        coral:
          "border-[color-mix(in_srgb,var(--pa-coral)_34%,transparent)] bg-[color-mix(in_srgb,var(--pa-coral)_12%,transparent)] text-[var(--pa-coral)]"
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
