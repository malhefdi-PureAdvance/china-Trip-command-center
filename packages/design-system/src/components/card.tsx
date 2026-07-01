import * as React from "react";

import { cn } from "../utils";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[var(--cc-elev-1)]",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div className={cn("border-b border-[var(--cc-border)] p-[14px]", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-[var(--cc-fs-title-sm)] font-[var(--cc-fw-bold)] leading-tight text-[var(--cc-text)]",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("p-[14px]", className)} {...props} />;
}
