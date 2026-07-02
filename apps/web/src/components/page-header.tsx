import { Badge } from "@pure-advance/design-system";

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  summary: string;
  badge?: string;
}

export function PageHeader({ badge, eyebrow, summary, title }: PageHeaderProps) {
  return (
    <section className="mb-4 flex flex-col items-start gap-2 border-b border-[var(--cc-border)] pb-4 sm:mb-[var(--cc-space-5)] sm:gap-[var(--cc-space-4)] sm:pb-[var(--cc-space-5)] lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="font-mono text-[9px] font-[var(--cc-fw-bold)] uppercase tracking-[var(--cc-ls-eyebrow)] text-[var(--cc-cyan)] sm:text-[var(--cc-fs-eyebrow)]">
          {eyebrow}
        </p>
        <h1 className="mt-1 text-balance text-[24px] font-[var(--cc-fw-x)] leading-[1.02] tracking-[var(--cc-ls-display)] text-[var(--cc-text)] sm:mt-[7px] sm:text-[var(--cc-fs-display)] sm:leading-none">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] leading-5 text-[var(--cc-text-3)] sm:text-[var(--cc-fs-body)] sm:leading-[1.45]">
          {summary}
        </p>
      </div>
      {badge ? (
        <Badge tone="cyan" className="max-w-full self-start truncate">
          {badge}
        </Badge>
      ) : null}
    </section>
  );
}
