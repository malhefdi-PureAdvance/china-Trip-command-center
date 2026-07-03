import { KeyRound, Lock, ShieldCheck, Users } from "lucide-react";

import { Callout, MetaChip, SectionLabel } from "@/components/command-kit";
import { AuthPanel } from "@/components/auth-panel";
import { PageHeader } from "@/components/page-header";
import { getPrivateTierState, privateTierCopy } from "@/lib/private-tier";

// Reads env at request time and must never be served stale by the service
// worker (private/auth routes are network-only).
export const dynamic = "force-dynamic";

const roleChipClass = {
  cyan: "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]",
  green: "border-transparent bg-[var(--cc-green-tint)] text-[var(--cc-green)]",
  neutral: "border-[var(--cc-border-strong)] bg-transparent text-[var(--cc-text-3)]"
} as const;

const roleRows: Array<{
  role: string;
  tone: keyof typeof roleChipClass;
  who: string;
  access: string;
}> = [
  {
    role: "owner",
    tone: "cyan",
    who: "Mohammed",
    access: "Full Tier-2 read/write once features exist"
  },
  {
    role: "team",
    tone: "green",
    who: "Pure Advance travelers",
    access: "Team-private notes and operational data"
  },
  {
    role: "program_viewer",
    tone: "neutral",
    who: "Program / external",
    access: "No Tier-2 access by default"
  }
];

export default function PrivatePage() {
  const { tier } = getPrivateTierState();
  const copy = privateTierCopy[tier];

  return (
    <>
      <PageHeader
        eyebrow="Private"
        title="Private Tier"
        summary="Authenticated workspace shell for the Hong Kong / Shenzhen mission team. No private data ships here until auth and row-level security are verified."
        badge="Tier 2 · shell"
      />

      <section aria-label="Tier status" className="mb-5">
        <SectionLabel
          icon={KeyRound}
          label="Tier status"
          meta={<MetaChip tone={tier === "enabled" ? "amber" : "neutral"}>{copy.label}</MetaChip>}
          className="mb-2.5"
        />
        <p className="mb-3 max-w-[62ch] text-[12.5px] leading-[1.55] text-[var(--cc-text-2)]">
          {copy.detail}
        </p>
        <AuthPanel />
      </section>

      <section aria-label="Role model" className="mb-5">
        <SectionLabel icon={Users} label="Role model" className="mb-2.5" />
        <div className="space-y-2">
          {roleRows.map((row) => (
            <div
              key={row.role}
              className="flex items-start gap-3 rounded-[var(--cc-r-row)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]"
            >
              <code
                className={`inline-flex min-h-[22px] shrink-0 items-center rounded-[var(--cc-r-chip)] border px-[7px] py-1 font-mono text-[10px] font-semibold leading-none ${roleChipClass[row.tone]}`}
              >
                {row.role}
              </code>
              <div className="min-w-0">
                <p className="text-[12.5px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
                  {row.who}
                </p>
                <p className="mt-0.5 text-[11.5px] leading-[1.5] text-[var(--cc-text-3)]">
                  {row.access}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2.5 flex max-w-[62ch] items-start gap-2 text-[11.5px] leading-[1.55] text-[var(--cc-text-faint)]">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Row-level security is fail-closed: a signed-in user without a provisioned membership row
          sees nothing. Membership is granted only via the service role.
        </p>
      </section>

      <Callout tone="neutral" icon={Lock} title="Tier-3 stays out of the app">
        <p className="max-w-[62ch] text-[12px] leading-[1.55] text-[var(--cc-text-3)]">
          Booking references, gate passes, IDs, payment data, and private contacts never enter this
          app — even behind auth they stay in the private pack (Tier 3). This page is not cached by
          the offline service worker and requires a connection.
        </p>
      </Callout>
    </>
  );
}
