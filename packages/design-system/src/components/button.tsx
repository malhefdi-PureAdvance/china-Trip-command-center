import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

export const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-transparent px-4 text-sm font-bold transition-[transform,box-shadow,filter,color,background,border-color] duration-[var(--cc-dur-fast)] ease-[var(--cc-ease)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cc-cyan)] disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--cc-cyan)] text-[var(--cc-cyan-ink)] shadow-[var(--cc-shadow-cta)] hover:brightness-[1.06]",
        secondary:
          "border-[var(--cc-cyan-line)] bg-transparent text-[var(--cc-cyan)] hover:bg-[var(--cc-cyan-tint-2)]",
        ghost:
          "border-[var(--cc-border-strong)] bg-transparent text-[var(--cc-text-3)] hover:bg-[var(--cc-surface-inset)] hover:text-[var(--cc-text)]"
      },
      size: {
        sm: "h-9 rounded-[10px] px-3 text-[11px] font-semibold",
        md: "h-11 px-4",
        icon: "size-11 rounded-[10px] px-0"
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
