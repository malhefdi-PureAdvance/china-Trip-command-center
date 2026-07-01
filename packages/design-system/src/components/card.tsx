import * as React from "react";

import { cn } from "../utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--pa-radius-card)] border border-[var(--pa-border)] bg-[color-mix(in_srgb,var(--pa-surface)_94%,transparent)] shadow-[var(--pa-shadow-card)] backdrop-blur",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div className={cn("border-b border-[var(--pa-border)] p-4 sm:p-5", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-base font-semibold tracking-[-0.02em] text-[var(--pa-foreground)] sm:text-lg",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("p-4 sm:p-5", className)} {...props} />;
}
