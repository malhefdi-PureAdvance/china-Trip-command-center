import * as React from "react";

import { cn } from "../utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--pa-radius-card)] border border-[var(--pa-border)] bg-[var(--pa-surface)] shadow-[0_16px_50px_rgba(0,0,0,0.18)]",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn("border-b border-[var(--pa-border)] p-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-base font-semibold tracking-normal text-[var(--pa-foreground)]",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("p-4", className)} {...props} />;
}
