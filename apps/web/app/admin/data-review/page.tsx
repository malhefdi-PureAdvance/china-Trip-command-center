import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  DatabaseZap,
  FileText,
  Layers,
  Lock,
  ShieldCheck
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, cn } from "@pure-advance/design-system";
import {
  checkSupabaseHealth,
  expectedTables,
  fetchBusinessVisitReviewSnapshot
} from "@pure-advance/database";

import {
  buildActivationReadinessModel,
  type ReadinessStepStatus
} from "@/lib/activation-readiness-view";
import { getPrivateTierState } from "@/lib/private-tier";
import {
  businessTargetDryRunFixtureBatch,
  dryRunBusinessTargetIngestionBatch
} from "@pure-advance/data-ingestion";

import { demoItineraryIntel } from "@pure-advance/domain";

import {
  Callout,
  Chip,
  SectionHeading,
  StatTile,
  chipToneFromBadge
} from "@/components/command-kit";
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

const stepStatusMeta: Record<ReadinessStepStatus, { icon: typeof CheckCircle2; box: string }> = {
  ready: { icon: CheckCircle2, box: "bg-[var(--cc-green-tint)] text-[var(--cc-green)]" },
  action: { icon: AlertTriangle, box: "bg-[var(--cc-amber-tint)] text-[var(--cc-amber-text)]" },
  pending: { icon: Clock, box: "bg-[var(--cc-surface-raised)] text-[var(--cc-text-3)]" }
};

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
      />

      <section aria-label="Hydration" className="mb-5">
        <SectionHeading
          icon={Layers}
          title="Hydration"
          trailing={<Chip tone="cyanTint">Public app data</Chip>}
        />
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {hydrationTiles.map((tile) => (
            <StatTile key={tile.label} value={tile.value} label={tile.label} />
          ))}
        </div>
        <div className="mt-2.5 grid gap-2.5 lg:grid-cols-2">
          <div className="rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]">
            <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--cc-text-faint)]">
              <FileText className="size-3.5" aria-hidden="true" />
              Source files
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {hydrationSources.map((source) => (
                <li
                  key={source}
                  className="flex items-center gap-2 font-mono text-[11px] text-[var(--cc-text-2)]"
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
            <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--cc-text-faint)]">
              <Lock className="size-3.5" aria-hidden="true" />
              Privacy guard
            </p>
            <p className="mt-2.5 text-[12px] leading-[1.55] text-[var(--cc-text-2)]">
              App data carries no contact identifiers, personal IDs, booking references, or QR
              payloads. Company intel is district-level and public-source-backed; contact routes
              stay in the private pack.
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <Chip tone="green">No PII</Chip>
              <Chip tone="green">No booking refs</Chip>
              <Chip tone="cyanTint">HK / Shenzhen corridor</Chip>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Activation readiness" className="mb-5">
        <SectionHeading
          icon={DatabaseZap}
          title="Activation readiness"
          trailing={
            <Chip tone={readiness.liveConfirmed ? "green" : "amber"}>
              {readiness.liveConfirmed ? "Verified" : "Action required"}
            </Chip>
          }
        />
        <div className="rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]">
          <p className="text-[13px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
            {readiness.headline}
          </p>
          <ul className="mt-3 space-y-2">
            {readiness.steps.map((step) => {
              const meta = stepStatusMeta[step.status];
              const StepIcon = meta.icon;

              return (
                <li
                  key={step.label}
                  className="flex items-start gap-2.5 rounded-[var(--cc-r-row)] border border-[var(--cc-border-faint)] bg-[var(--cc-surface-inset)] p-2.5"
                >
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-[8px]",
                      meta.box
                    )}
                    aria-hidden="true"
                  >
                    <StepIcon className="size-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-[var(--cc-text)]">
                      {step.label}
                    </p>
                    <p className="mt-0.5 text-[11.5px] leading-[1.45] text-[var(--cc-text-3)]">
                      {step.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          {readiness.missingEnv.length > 0 ? (
            <Callout tone="warn" className="mt-3">
              <span className="font-mono text-[11px] text-[var(--cc-amber-text)]">
                Mohammed to set in Vercel: {readiness.missingEnv.join(" · ")}
              </span>
            </Callout>
          ) : null}
          <p className="mt-2.5 text-[11px] leading-[1.5] text-[var(--cc-text-faint)]">
            Private-tier data (contacts, booking refs, IDs) never ships here — it requires
            authentication first. This page reads live status only via the server-side service-role
            key and never claims Supabase is active without a confirmed connection.
          </p>
        </div>
      </section>

      <section aria-label="Supabase health" className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {supabaseRows.map((row) => (
          <Card key={row.label} className="min-w-0">
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-[13px]">{row.label}</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="min-w-0 truncate text-[15px] font-semibold tracking-[-0.01em] text-[var(--cc-text)]">
                  {row.value}
                </p>
                <Chip tone={chipToneFromBadge[row.tone ?? "neutral"]}>
                  {row.tone === "coral" ? "action" : row.tone}
                </Chip>
              </div>
              <p className="mt-2 text-[11.5px] leading-[1.5] text-[var(--cc-text-3)]">{row.note}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section aria-label="Review summary" className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
        {reviewModel.summaryRows.map((row) => (
          <Card key={row.label} className="min-w-0">
            <CardContent className="p-3">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--cc-text-faint)]">
                {row.label}
              </p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <p className="font-mono text-[26px] font-semibold leading-none text-[var(--cc-cyan)]">
                  {row.value}
                </p>
                <Chip tone={chipToneFromBadge[row.tone ?? "neutral"]}>{row.note}</Chip>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section
        aria-label="Ingestion dry-run"
        className="mt-2.5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="min-w-0">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-[13px]">Ingestion dry-run</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="min-w-0 truncate text-[15px] font-semibold tracking-[-0.01em] text-[var(--cc-text)]">
                {dryRunModel.status.label}
              </p>
              <Chip tone={chipToneFromBadge[dryRunModel.status.tone ?? "neutral"]}>contract</Chip>
            </div>
            <p className="mt-2 text-[11.5px] leading-[1.5] text-[var(--cc-text-3)]">
              {dryRunModel.status.note}
            </p>
          </CardContent>
        </Card>
        {dryRunModel.summaryRows.map((row) => (
          <Card key={row.label} className="min-w-0">
            <CardContent className="p-3">
              <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--cc-text-faint)]">
                {row.label}
              </h2>
              <div className="mt-2 flex items-end justify-between gap-3">
                <p className="font-mono text-[26px] font-semibold leading-none text-[var(--cc-cyan)]">
                  {row.value}
                </p>
                <Chip tone={chipToneFromBadge[row.tone ?? "neutral"]}>{row.note}</Chip>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section aria-label="Gates and verification" className="mt-5 grid gap-2.5 lg:grid-cols-3">
        <Card className="min-w-0">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-[13px]">Import Gates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 p-3 text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
            <p className="flex flex-wrap items-center gap-2">
              <DatabaseZap className="size-4 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
              Review data source:
              <Chip tone={chipToneFromBadge[reviewModel.source.tone ?? "neutral"]}>
                {reviewModel.source.label}
              </Chip>
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
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-[13px]">Dry-run Rejection Reasons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 p-3">
            {dryRunModel.rejectionRows.map((row) => (
              <div
                key={`${row.index}-${row.name}`}
                className="border-b border-[var(--cc-border-faint)] pb-2.5 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate text-[12.5px] font-semibold text-[var(--cc-text)]">
                    {row.name}
                  </p>
                  <Chip tone={chipToneFromBadge[row.tone ?? "neutral"]}>row {row.index + 1}</Chip>
                </div>
                <p className="mt-1.5 text-[11.5px] leading-[1.5] text-[var(--cc-text-3)]">
                  {row.reasons.join("; ")}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-[13px]">Targets Awaiting Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 p-3">
            {reviewModel.targetsAwaitingVerification.map((target) => (
              <div
                key={target.id}
                className="flex items-center justify-between gap-3 border-b border-[var(--cc-border-faint)] pb-2.5 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-semibold text-[var(--cc-text)]">
                    {target.name}
                  </p>
                  <p className="mt-0.5 truncate text-[11.5px] text-[var(--cc-text-3)]">
                    {target.city} · {target.status.replaceAll("_", " ")}
                  </p>
                </div>
                <Chip tone={target.sourceConfidence === "unknown" ? "amber" : "cyanTint"}>
                  {target.sourceConfidence}
                </Chip>
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
