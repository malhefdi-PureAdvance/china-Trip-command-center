import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  Clock,
  DatabaseZap,
  FileText,
  Layers,
  Lock,
  ShieldCheck
} from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";
import {
  checkSupabaseHealth,
  expectedTables,
  fetchBusinessVisitReviewSnapshot
} from "@pure-advance/database";

import { buildActivationReadinessModel } from "@/lib/activation-readiness-view";
import { getPrivateTierState } from "@/lib/private-tier";
import {
  businessTargetDryRunFixtureBatch,
  dryRunBusinessTargetIngestionBatch
} from "@pure-advance/data-ingestion";

import { demoItineraryIntel } from "@pure-advance/domain";

import { MetaChip, SectionLabel } from "@/components/command-kit";
import { PageHeader } from "@/components/page-header";
import { demoData, missionPhases } from "@/lib/demo-data";
import { businessTargets } from "@/lib/targets";
import { buildBusinessVisitReviewModel, buildIngestionDryRunModel } from "@/lib/data-review-view";
import { buildSupabaseHealthRows } from "@/lib/supabase-health-view";

const hydrationTiles = [
  { label: "Visit dossiers", value: businessTargets.length },
  { label: "Itinerary items", value: demoData.itineraryItems.length },
  { label: "Enriched events", value: demoItineraryIntel.length },
  {
    label: "Dossier links",
    value: demoItineraryIntel.reduce((sum, intel) => sum + intel.relatedTargetIds.length, 0)
  },
  { label: "Mission phases", value: missionPhases.length },
  { label: "Team members", value: demoData.tripMembers.length }
];

const hydrationSources = [
  "itinerary/master_itinerary.md",
  "itinerary/hong_kong_week1_plan.md",
  "dashboard/program_phases.csv",
  "business/dossiers/*.md",
  "dashboard/places.csv"
];

export const dynamic = "force-dynamic";

export default async function DataReviewPage() {
  const [supabaseHealth, reviewSnapshot] = await Promise.all([
    checkSupabaseHealth(),
    fetchBusinessVisitReviewSnapshot()
  ]);
  const supabaseRows = buildSupabaseHealthRows(supabaseHealth);
  const readiness = buildActivationReadinessModel(
    supabaseHealth,
    expectedTables.length,
    getPrivateTierState().tier
  );
  const reviewModel = buildBusinessVisitReviewModel(reviewSnapshot, demoData);
  const dryRunModel = buildIngestionDryRunModel(
    dryRunBusinessTargetIngestionBatch(businessTargetDryRunFixtureBatch)
  );

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Data Review"
        summary="What public app data is hydrated, what the server health check verifies, what falls back to static data, and what still requires Mohammed action."
        badge={readiness.liveConfirmed ? "Verified core" : "Demo fallback"}
        badgeTone={readiness.liveConfirmed ? "green" : "amber"}
      />

      <section aria-label="Hydration" className="mb-5">
        <SectionLabel
          icon={Layers}
          label="Hydration"
          meta={<MetaChip tone="cyan">Public app data</MetaChip>}
          className="mb-2.5"
        />
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {hydrationTiles.map((tile) => (
            <div
              key={tile.label}
              className="rounded-[var(--cc-r-tile)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]"
            >
              <p className="font-mono text-[20px] font-semibold leading-none text-[var(--cc-cyan)]">
                {tile.value}
              </p>
              <p className="mt-2 font-mono text-[8.5px] uppercase leading-[1.4] tracking-[0.08em] text-[var(--cc-text-faint)]">
                {tile.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-2.5 grid gap-2.5 lg:grid-cols-2">
          <div className="rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--cc-text-faint)]">
              <FileText className="size-3.5" aria-hidden="true" />
              Source files
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {hydrationSources.map((source) => (
                <li
                  key={source}
                  className="flex items-center gap-2 font-mono text-[11px] leading-none text-[var(--cc-text-2)]"
                >
                  <span
                    className="size-1 shrink-0 rounded-full bg-[var(--cc-cyan)]"
                    aria-hidden="true"
                  />
                  {source}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--cc-text-faint)]">
              <Lock className="size-3.5" aria-hidden="true" />
              Privacy guard
            </p>
            <p className="mt-2 text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
              App data carries no contact identifiers, personal IDs, booking references, or QR
              payloads. Company intel is district-level and public-source-backed; contact routes
              stay in the private pack.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge tone="green">No PII</Badge>
              <Badge tone="green">No booking refs</Badge>
              <Badge tone="cyan">HK / Shenzhen corridor</Badge>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Activation readiness" className="mb-5">
        <SectionLabel
          icon={DatabaseZap}
          label="Activation readiness"
          meta={
            <Badge tone={readiness.liveConfirmed ? "green" : "amber"}>
              {readiness.liveConfirmed ? "Verified" : "Action required"}
            </Badge>
          }
          className="mb-2.5"
        />
        <div className="rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3.5 shadow-[var(--cc-elev-1)]">
          <p className="text-[13.5px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
            {readiness.headline}
          </p>
          <ul className="mt-3 space-y-1.5">
            {readiness.steps.map((step) => {
              const Icon =
                step.status === "ready"
                  ? CheckCircle2
                  : step.status === "action"
                    ? AlertTriangle
                    : step.status === "pending"
                      ? Clock
                      : CircleDashed;
              const iconBox =
                step.status === "ready"
                  ? "bg-[var(--cc-green-tint)] text-[var(--cc-green)]"
                  : step.status === "action"
                    ? "bg-[var(--cc-amber-tint)] text-[var(--cc-amber-text)]"
                    : "bg-[var(--cc-surface-raised)] text-[var(--cc-text-faint)]";
              return (
                <li
                  key={step.label}
                  className="flex items-start gap-3 rounded-[var(--cc-r-row)] border border-[var(--cc-border-faint)] bg-[var(--cc-surface-inset)] p-2.5"
                >
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-[9px] ${iconBox}`}
                    aria-hidden="true"
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold leading-tight text-[var(--cc-text)]">
                      {step.label}
                    </p>
                    <p className="mt-0.5 text-[11.5px] leading-[1.5] text-[var(--cc-text-3)]">
                      {step.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          {readiness.missingEnv.length > 0 ? (
            <p className="mt-3 border-t border-[var(--cc-border-faint)] pt-2.5 font-mono text-[11px] leading-[1.6] text-[var(--cc-amber-text)]">
              Mohammed to set in Vercel: {readiness.missingEnv.join(" · ")}
            </p>
          ) : null}
          <p className="mt-2 max-w-[70ch] text-[11px] leading-[1.55] text-[var(--cc-text-faint)]">
            Private-tier data (contacts, booking refs, IDs) never ships here — it requires
            authentication first. This page reads live status only via the server-side service-role
            key and never claims Supabase is active without a confirmed connection.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {supabaseRows.map((row) => (
          <Card key={row.label} className="min-w-0">
            <CardHeader className="p-3 pb-2.5">
              <CardTitle className="text-[12px] font-semibold text-[var(--cc-text-2)]">
                {row.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[15px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
                    {row.value}
                  </p>
                  <Badge tone={row.tone}>{row.tone === "coral" ? "action" : row.tone}</Badge>
                </div>
                <p className="text-[11px] leading-[1.5] text-[var(--cc-text-3)]">{row.note}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="mt-2.5 grid grid-cols-3 gap-2.5">
        {reviewModel.summaryRows.map((row) => (
          <Card key={row.label} className="min-w-0">
            <CardContent className="p-3">
              <p className="font-mono text-[24px] font-semibold leading-none text-[var(--cc-cyan)]">
                {row.value}
              </p>
              <h3 className="mt-2 text-[11px] font-semibold leading-tight text-[var(--cc-text-2)]">
                {row.label}
              </h3>
              <div className="mt-2">
                <Badge tone={row.tone}>{row.note}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="mt-2.5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <Card className="min-w-0">
          <CardHeader className="p-3 pb-2.5">
            <CardTitle className="text-[12px] font-semibold text-[var(--cc-text-2)]">
              Ingestion dry-run
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[15px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
                  {dryRunModel.status.label}
                </p>
                <Badge tone={dryRunModel.status.tone}>contract</Badge>
              </div>
              <p className="text-[11px] leading-[1.5] text-[var(--cc-text-3)]">
                {dryRunModel.status.note}
              </p>
            </div>
          </CardContent>
        </Card>
        {dryRunModel.summaryRows.map((row) => (
          <Card key={row.label} className="min-w-0">
            <CardContent className="p-3">
              <p className="font-mono text-[24px] font-semibold leading-none text-[var(--cc-cyan)]">
                {row.value}
              </p>
              <h3 className="mt-2 text-[11px] font-semibold leading-tight text-[var(--cc-text-2)]">
                {row.label}
              </h3>
              <div className="mt-2">
                <Badge tone={row.tone}>{row.note}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="mt-5 grid gap-2.5 lg:grid-cols-3">
        <Card className="min-w-0">
          <CardHeader className="p-3.5">
            <CardTitle className="text-[13.5px]">Import Gates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 p-3.5 text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
            <p className="flex flex-wrap items-center gap-2">
              <DatabaseZap className="size-4 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
              Review data source:
              <Badge tone={reviewModel.source.tone}>{reviewModel.source.label}</Badge>
              <span className="text-[11px] text-[var(--cc-text-3)]">{reviewModel.source.note}</span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-[var(--cc-green)]"
                aria-hidden="true"
              />
              Source labels and confidence are required.
            </p>
            <p className="flex items-start gap-2">
              <AlertTriangle
                className="mt-0.5 size-4 shrink-0 text-[var(--cc-amber-text)]"
                aria-hidden="true"
              />
              Passport, national ID, payment, and credential fields are blocked.
            </p>
            <p className="flex items-start gap-2">
              <DatabaseZap
                className="mt-0.5 size-4 shrink-0 text-[var(--cc-cyan)]"
                aria-hidden="true"
              />
              Supabase writes remain deferred until the ingestion source contract is approved.
            </p>
            <p className="flex items-start gap-2">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0 text-[var(--cc-green)]"
                aria-hidden="true"
              />
              RLS starts as authenticated read-only; anonymous and mutation policies are not
              granted.
            </p>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader className="p-3.5">
            <CardTitle className="text-[13.5px]">Dry-run Rejection Reasons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 p-3.5">
            {dryRunModel.rejectionRows.map((row) => (
              <div
                key={`${row.index}-${row.name}`}
                className="border-b border-[var(--cc-border-faint)] pb-2.5 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate text-[12.5px] font-semibold text-[var(--cc-text)]">
                    {row.name}
                  </p>
                  <Badge tone={row.tone}>row {row.index + 1}</Badge>
                </div>
                <p className="mt-1.5 text-[11.5px] leading-[1.55] text-[var(--cc-text-3)]">
                  {row.reasons.join("; ")}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader className="p-3.5">
            <CardTitle className="text-[13.5px]">Targets Awaiting Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 p-3.5">
            {reviewModel.targetsAwaitingVerification.map((target) => (
              <div
                key={target.id}
                className="flex items-center justify-between gap-3 border-b border-[var(--cc-border-faint)] pb-2.5 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-semibold text-[var(--cc-text)]">
                    {target.name}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-[var(--cc-text-3)]">
                    {target.city} · {target.status.replaceAll("_", " ")}
                  </p>
                </div>
                <Badge tone={target.sourceConfidence === "unknown" ? "amber" : "cyan"}>
                  {target.sourceConfidence}
                </Badge>
              </div>
            ))}
            {reviewModel.targetsAwaitingVerification.length === 0 ? (
              <p className="text-[12px] text-[var(--cc-text-3)]">
                No targets currently require verification.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
