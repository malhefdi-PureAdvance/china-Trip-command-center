import { Badge } from "@pure-advance/design-system";

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  summary: string;
  badge?: string;
}

export function PageHeader({ badge, eyebrow, summary, title }: PageHeaderProps) {
  return (
    <section className="mb-6 flex flex-col gap-4 border-b border-[var(--pa-border)] pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-normal text-[var(--pa-cyan)]">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal text-[var(--pa-foreground)] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--pa-muted)]">{summary}</p>
      </div>
      {badge ? <Badge tone="green">{badge}</Badge> : null}
    </section>
  );
}
