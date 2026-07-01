import { Badge } from "@pure-advance/design-system";

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  summary: string;
  badge?: string;
}

export function PageHeader({ badge, eyebrow, summary, title }: PageHeaderProps) {
  return (
    <section className="mb-5 flex flex-col gap-4 border-b border-[var(--pa-border)] pb-5 sm:mb-6 sm:pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--pa-primary)]">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-balance text-2xl font-semibold tracking-[-0.05em] text-[var(--pa-foreground)] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--pa-muted)] sm:text-base">
          {summary}
        </p>
      </div>
      {badge ? <Badge tone="green">{badge}</Badge> : null}
    </section>
  );
}
