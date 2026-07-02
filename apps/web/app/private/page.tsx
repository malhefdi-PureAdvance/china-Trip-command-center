import { KeyRound, Lock, ShieldCheck, Users } from "lucide-react";

import { Badge } from "@pure-advance/design-system";

import { AuthPanel } from "@/components/auth-panel";
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
  const { tier, publicConfig } = getPrivateTierState();
  const copy = privateTierCopy[tier];

  return (
    <>
      <PageHeader
        eyebrow="Private"
        title="Private Tier"
        summary="Authenticated workspace shell for the Hong Kong / Shenzhen mission team. No private data ships here until auth and row-level security are verified."
        badge="Tier 2 · shell"
      />

      <section aria-label="Tier status" className="mb-4">
        <div className="mb-2 flex items-center gap-2.5">
          <KeyRound className="size-4 text-[var(--cc-cyan)]" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
            Tier status
          </span>
          <span className="h-px flex-1 bg-[var(--cc-border)]" />
          <Badge tone={tier === "enabled" ? "amber" : "neutral"}>{copy.label}</Badge>
        </div>
        <p className="mb-3 text-[12.5px] leading-[1.5] text-[var(--cc-text-2)]">{copy.detail}</p>
        <AuthPanel publicConfig={publicConfig} />
      </section>

      <section aria-label="Role model" className="mb-4">
        <div className="mb-2 flex items-center gap-2.5">
          <Users className="size-4 text-[var(--cc-cyan)]" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
            Role model
          </span>
          <span className="h-px flex-1 bg-[var(--cc-border)]" />
        </div>
        <div className="space-y-2">
          {roleRows.map((row) => (
            <div
              key={row.role}
              className="flex items-start gap-3 rounded-[var(--cc-r-row)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]"
            >
              <code className="shrink-0 rounded-[var(--cc-r-chip)] bg-[var(--cc-cyan-tint)] px-2 py-1 font-mono text-[10px] font-semibold text-[var(--cc-cyan)]">
                {row.role}
              </code>
              <div className="min-w-0">
                <p className="text-[12.5px] font-semibold text-[var(--cc-text)]">{row.who}</p>
                <p className="text-[11.5px] text-[var(--cc-text-3)]">{row.access}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 flex items-start gap-2 text-[11.5px] leading-[1.5] text-[var(--cc-text-faint)]">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Row-level security is fail-closed: a signed-in user without a provisioned membership row
          sees nothing. Membership is granted only via the service role.
        </p>
      </section>

      <div className="flex items-start gap-2 rounded-[var(--cc-r-tile)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] p-3">
        <Lock className="mt-0.5 size-4 shrink-0 text-[var(--cc-text-faint)]" aria-hidden="true" />
        <p className="text-[11.5px] leading-[1.5] text-[var(--cc-text-3)]">
          Booking references, gate passes, IDs, payment data, and private contacts never enter this
          app — even behind auth they stay in the private pack (Tier 3). This page is not cached by
          the offline service worker and requires a connection.
        </p>
      </div>
    </>
  );
}
