import { KeyRound, Lock, ShieldCheck, Users } from "lucide-react";

import { AuthPanel } from "@/components/auth-panel";
import { Callout, Chip, SectionHeading } from "@/components/command-kit";
import { PageHeader } from "@/components/page-header";
import { getPrivateTierState, privateTierCopy } from "@/lib/private-tier";

// Reads env at request time and must never be served stale by the service
// worker (private/auth routes are network-only).
export const dynamic = "force-dynamic";

const roleRows = [
  { role: "owner", who: "Mohammed", access: "Full Tier-2 read/write once features exist" },
  {
    role: "team",
    who: "Pure Advance travelers",
    access: "Team-private notes and operational data"
  },
  { role: "program_viewer", who: "Program / external", access: "No Tier-2 access by default" }
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
        <SectionHeading
          icon={KeyRound}
          title="Tier status"
          trailing={<Chip tone={tier === "enabled" ? "amber" : "neutral"}>{copy.label}</Chip>}
        />
        <p className="mb-3 max-w-2xl text-[12.5px] leading-[1.55] text-[var(--cc-text-2)]">
          {copy.detail}
        </p>
        <AuthPanel />
      </section>

      <section aria-label="Role model" className="mb-5">
        <SectionHeading icon={Users} title="Role model" />
        <div className="space-y-2">
          {roleRows.map((row) => (
            <div
              key={row.role}
              className="flex items-start gap-3 rounded-[var(--cc-r-row)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]"
            >
              <code className="shrink-0 rounded-[var(--cc-r-chip)] border border-[var(--cc-cyan-line-soft)] bg-[var(--cc-cyan-tint)] px-2 py-1 font-mono text-[10px] font-semibold text-[var(--cc-cyan)]">
                {row.role}
              </code>
              <div className="min-w-0">
                <p className="text-[12.5px] font-semibold text-[var(--cc-text)]">{row.who}</p>
                <p className="mt-0.5 text-[11.5px] leading-[1.45] text-[var(--cc-text-3)]">
                  {row.access}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2.5 flex items-start gap-2 text-[11.5px] leading-[1.5] text-[var(--cc-text-faint)]">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Row-level security is fail-closed: a signed-in user without a provisioned membership row
          sees nothing. Membership is granted only via the service role.
        </p>
      </section>

      <Callout tone="quiet" icon={Lock} eyebrow="Tier-3 boundary">
        Booking references, gate passes, IDs, payment data, and private contacts never enter this
        app — even behind auth they stay in the private pack (Tier 3). This page is not cached by
        the offline service worker and requires a connection.
      </Callout>
    </>
  );
}
