import type { MissionClock } from "@/lib/mission-timeline";

const stateLabel: Record<MissionClock["state"], string> = {
  preflight: "Pre-flight",
  active: "Live",
  complete: "Debrief"
};

export type MissionProgress = { done: number; total: number };

/** The cockpit's primary instrument: countdown, mission state, day progress. */
export function MissionClockHero({
  clock,
  context,
  progress
}: Readonly<{ clock: MissionClock; context?: string; progress?: MissionProgress | null }>) {
  const percent = progress ? Math.round((progress.done / Math.max(1, progress.total)) * 100) : 0;

  return (
    <section
      className="relative overflow-hidden rounded-[var(--cc-r-card)] border border-[var(--cc-cyan-line)] bg-[var(--cc-surface)] p-4 shadow-[var(--cc-glow-cyan)]"
      aria-label="Mission clock"
    >
      <span className="absolute inset-y-0 left-0 w-[3px] bg-[var(--cc-cyan)]" aria-hidden="true" />
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-[var(--cc-cyan)]">
          {clock.state === "active" ? (
            <span
              className="mission-live-dot inline-block size-[7px] rounded-full bg-[var(--cc-cyan)] shadow-[var(--cc-glow-cyan-dot)]"
              aria-hidden="true"
            />
          ) : null}
          Mission Clock · {stateLabel[clock.state]}
        </p>
        {progress ? (
          <p className="shrink-0 font-mono text-[10px] tracking-[0.05em] text-[var(--cc-text-faint)]">
            Day {progress.done} of {progress.total}
          </p>
        ) : null}
      </div>
      <div className="mt-2.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="font-mono text-[40px] font-semibold leading-none tracking-[-0.02em] text-[var(--cc-cyan)]">
          {clock.countdown}
        </span>
        <span className="text-[13.5px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
          {clock.headline}
        </span>
      </div>
      <p className="mt-2 text-[12px] leading-[1.45] text-[var(--cc-text-3)]">
        {context ? (
          <>
            <span className="font-semibold text-[var(--cc-text-2)]">{clock.detail}</span> ·{" "}
            {context}
          </>
        ) : (
          clock.detail
        )}
      </p>
      {progress ? (
        <div
          className="mt-3 h-[4px] overflow-hidden rounded-full bg-[var(--cc-border-strong)]"
          role="progressbar"
          aria-label="Mission days elapsed"
          aria-valuemin={0}
          aria-valuemax={progress.total}
          aria-valuenow={progress.done}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--cc-cyan)] to-[var(--cc-cyan-line)]"
            style={{ width: `${percent}%` }}
          />
        </div>
      ) : null}
    </section>
  );
}
