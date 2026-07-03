import { Chip } from "@/components/command-kit";

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
        <p className="flex items-center gap-2 font-mono text-[9px] font-[var(--cc-fw-bold)] uppercase tracking-[var(--cc-ls-eyebrow)] text-[var(--cc-cyan)] sm:text-[var(--cc-fs-eyebrow)]">
          <span
            className="inline-block h-[3px] w-[14px] rounded-full bg-[var(--cc-cyan)]"
            aria-hidden="true"
          />
          {eyebrow}
        </p>
        <h1 className="mt-1.5 text-balance text-[24px] font-[var(--cc-fw-x)] leading-[1.05] tracking-[var(--cc-ls-display)] text-[var(--cc-text)] sm:mt-[7px] sm:text-[var(--cc-fs-display)] sm:leading-none">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] leading-[1.5] text-[var(--cc-text-3)] sm:text-[var(--cc-fs-body)] sm:leading-[1.45]">
          {summary}
        </p>
      </div>
      {badge ? (
        <Chip tone="cyanTint" className="max-w-full self-start">
          {badge}
        </Chip>
      ) : null}
    </section>
  );
}
