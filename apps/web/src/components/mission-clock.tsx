import type { MissionClock } from "@/lib/mission-timeline";

const stateLabel: Record<MissionClock["state"], string> = {
  preflight: "Pre-flight",
  active: "Live",
  complete: "Debrief"
};

export function MissionClockHero({
  clock,
  context
}: Readonly<{ clock: MissionClock; context?: string }>) {
  return (
    <section
      className="relative overflow-hidden rounded-[var(--cc-r-card)] border border-[var(--cc-cyan-line)] bg-[var(--cc-surface)] p-4 shadow-[var(--cc-glow-cyan)]"
      aria-label="Mission clock"
    >
      <span className="absolute inset-y-0 left-0 w-[3px] bg-[var(--cc-cyan)]" aria-hidden="true" />
      <p className="flex items-center gap-2 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-[var(--cc-cyan)]">
        {clock.state === "active" ? (
          <span
            className="mission-live-dot inline-block size-[7px] rounded-full bg-[var(--cc-cyan)] shadow-[var(--cc-glow-cyan-dot)]"
            aria-hidden="true"
          />
        ) : null}
        Mission Clock · {stateLabel[clock.state]}
      </p>
      <div className="mt-2 flex items-baseline gap-2.5">
        <span className="font-mono text-[38px] font-semibold leading-none tracking-[-0.02em] text-[var(--cc-cyan)]">
          {clock.countdown}
        </span>
        <span className="text-[13px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
          {clock.headline}
        </span>
      </div>
      <p className="mt-1.5 text-[12px] leading-[1.4] text-[var(--cc-text-3)]">
        {context ? (
          <>
            <span className="font-semibold text-[var(--cc-text-2)]">{clock.detail}</span> ·{" "}
            {context}
          </>
        ) : (
          clock.detail
        )}
      </p>
    </section>
  );
}
