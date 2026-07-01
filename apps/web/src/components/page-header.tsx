import { Badge } from "@pure-advance/design-system";

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  summary: string;
  badge?: string;
}

export function PageHeader({ badge, eyebrow, summary, title }: PageHeaderProps) {
  return (
    <section className="mb-[var(--cc-space-5)] flex flex-col gap-[var(--cc-space-4)] border-b border-[var(--cc-border)] pb-[var(--cc-space-5)] lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="font-mono text-[var(--cc-fs-eyebrow)] font-[var(--cc-fw-bold)] uppercase tracking-[var(--cc-ls-eyebrow)] text-[var(--cc-cyan)]">
          {eyebrow}
        </p>
        <h1 className="mt-[7px] text-balance text-[var(--cc-fs-display)] font-[var(--cc-fw-x)] leading-none tracking-[var(--cc-ls-display)] text-[var(--cc-text)]">
          {title}
        </h1>
        <p className="mt-[var(--cc-space-2)] max-w-2xl text-[var(--cc-fs-body)] leading-[1.45] text-[var(--cc-text-3)]">
          {summary}
        </p>
      </div>
      {badge ? <Badge tone="cyan">{badge}</Badge> : null}
    </section>
  );
}
