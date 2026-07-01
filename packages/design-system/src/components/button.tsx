import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

export const buttonVariants = cva(
  "inline-flex h-10 items-center justify-center gap-2 rounded-[var(--pa-radius-control)] px-4 text-sm font-semibold tracking-[-0.01em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--pa-primary)] text-[var(--pa-primary-foreground)] shadow-[var(--pa-shadow-glow)] hover:bg-[color-mix(in_srgb,var(--pa-primary)_88%,white)] focus-visible:outline-[var(--pa-primary)]",
        secondary:
          "border border-[color-mix(in_srgb,var(--pa-primary)_38%,var(--pa-border))] bg-[color-mix(in_srgb,var(--pa-surface-raised)_86%,transparent)] text-[var(--pa-foreground)] hover:border-[var(--pa-primary)] hover:bg-[var(--pa-surface-soft)] focus-visible:outline-[var(--pa-primary)]",
        ghost:
          "text-[var(--pa-muted)] hover:bg-[var(--pa-surface-raised)] hover:text-[var(--pa-foreground)] focus-visible:outline-[var(--pa-primary)]"
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4",
        icon: "size-10 px-0"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp ref={ref} className={cn(buttonVariants({ className, size, variant }))} {...props} />
    );
  }
);

Button.displayName = "Button";
