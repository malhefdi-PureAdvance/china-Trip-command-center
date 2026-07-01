import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

export const buttonVariants = cva(
  "inline-flex h-10 items-center justify-center gap-2 rounded-[var(--pa-radius-control)] px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--pa-cyan)] text-[#071014] hover:bg-[color-mix(in_srgb,var(--pa-cyan)_84%,white)] focus-visible:outline-[var(--pa-cyan)]",
        secondary:
          "border border-[var(--pa-border)] bg-[var(--pa-surface-raised)] text-[var(--pa-foreground)] hover:border-[var(--pa-cyan)]",
        ghost:
          "text-[var(--pa-muted)] hover:bg-[var(--pa-surface-raised)] hover:text-[var(--pa-foreground)]"
      },
      size: {
        sm: "h-8 px-3 text-xs",
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
