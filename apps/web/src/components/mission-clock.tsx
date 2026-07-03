import type { MissionClock } from "@/lib/mission-timeline";

const stateLabel: Record<MissionClock["state"], string> = {
  preflight: "Pre-flight",
  active: "Live",
  complete: "Debrief"
};

/**
 * The cockpit's primary instrument: mission countdown, day index, and phase
 * progress in one glanceable module. The single glowing surface of the app.
 */
export function MissionClockHero({
  clock,
  context
}: Readonly<{ clock: MissionClock; context?: string }>) {
  const progress =
    clock.dayIndex !== null && clock.totalDays > 0
      ? Math.min(100, Math.max(0, (clock.dayIndex / clock.totalDays) * 100))
      : null;

  return (
    <section
      className="relative overflow-hidden rounded-[var(--cc-r-card)] border border-[var(--cc-cyan-line)] bg-[var(--cc-surface)] shadow-[var(--cc-glow-cyan)]"
      aria-label="Mission clock"
    >
      <span className="absolute inset-y-0 left-0 w-[3px] bg-[var(--cc-cyan)]" aria-hidden="true" />
      <div className="p-4 pl-[19px]">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-mono text-[9.5px] font-bold uppercase leading-none tracking-[0.14em] text-[var(--cc-cyan)]">
            {clock.state === "active" ? (
              <span
                className="mission-live-dot inline-block size-[7px] rounded-full bg-[var(--cc-cyan)] shadow-[var(--cc-glow-cyan-dot)]"
                aria-hidden="true"
              />
            ) : null}
            Mission Clock · {stateLabel[clock.state]}
          </p>
          {clock.dayIndex !== null ? (
            <p className="shrink-0 font-mono text-[10px] leading-none tracking-[0.08em] text-[var(--cc-text-faint)]">
              DAY <span className="font-semibold text-[var(--cc-text)]">{clock.dayIndex}</span> /{" "}
              {clock.totalDays}
            </p>
          ) : (
            <p className="shrink-0 font-mono text-[10px] leading-none tracking-[0.08em] text-[var(--cc-text-faint)]">
              {clock.totalDays}-DAY MISSION
            </p>
          )}
        </div>
        <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[42px] font-semibold leading-none tracking-[-0.02em] text-[var(--cc-cyan)]">
            {clock.countdown}
          </span>
          <span className="text-[13.5px] font-bold leading-tight tracking-[-0.01em] text-[var(--cc-text)]">
            {clock.headline}
          </span>
        </div>
        <p className="mt-2 max-w-[60ch] text-[12px] leading-[1.5] text-[var(--cc-text-3)]">
          {context ? (
            <>
              <span className="font-semibold text-[var(--cc-text-2)]">{clock.detail}</span> ·{" "}
              {context}
            </>
          ) : (
            clock.detail
          )}
        </p>
        {progress !== null ? (
          <div
            className="mt-3 h-[5px] overflow-hidden rounded-full bg-[var(--cc-surface-inset)]"
            role="presentation"
          >
            <span
              className="block h-full rounded-full bg-[var(--cc-cyan)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
