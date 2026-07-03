import { MetaChip, type ChipTone } from "@/components/command-kit";

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  summary: string;
  badge?: string;
  badgeTone?: ChipTone;
  /** Optional chip/metadata row rendered under the summary. */
  meta?: React.ReactNode;
}

/**
 * Route masthead: mono eyebrow band with the route badge on the rule,
 * display title, measured summary, then an optional chip rail. Keeps the
 * first card high on an iPhone screen.
 */
export function PageHeader({
  badge,
  badgeTone = "faint",
  eyebrow,
  meta,
  summary,
  title
}: PageHeaderProps) {
  return (
    <header className="mb-3.5 border-b border-[var(--cc-border)] pb-3.5 sm:mb-[var(--cc-space-5)] sm:pb-[var(--cc-space-4)]">
      <div className="flex items-center gap-2.5">
        <p className="shrink-0 font-mono text-[9.5px] font-bold uppercase leading-none tracking-[0.16em] text-[var(--cc-cyan)]">
          {eyebrow}
        </p>
        <span className="h-px min-w-4 flex-1 bg-[var(--cc-border)]" aria-hidden="true" />
        {badge ? (
          <MetaChip tone={badgeTone} className="shrink-0">
            {badge}
          </MetaChip>
        ) : null}
      </div>
      <h1 className="mt-2 text-balance text-[25px] font-[var(--cc-fw-x)] leading-[1.04] tracking-[var(--cc-ls-display)] text-[var(--cc-text)] sm:mt-2.5 sm:text-[28px] sm:leading-[1.02]">
        {title}
      </h1>
      <p className="mt-1.5 max-w-2xl text-[12.5px] leading-[1.5] text-[var(--cc-text-3)] sm:mt-2 sm:text-[13px]">
        {summary}
      </p>
      {meta ? <div className="mt-2.5 flex flex-wrap items-center gap-1.5">{meta}</div> : null}
    </header>
  );
}
