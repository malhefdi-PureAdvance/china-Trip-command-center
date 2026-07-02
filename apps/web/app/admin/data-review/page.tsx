import {
  AlertTriangle,
  CheckCircle2,
  DatabaseZap,
  FileText,
  Layers,
  Lock,
  ShieldCheck
} from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";
import { checkSupabaseHealth, fetchBusinessVisitReviewSnapshot } from "@pure-advance/database";
import {
  businessTargetDryRunFixtureBatch,
  dryRunBusinessTargetIngestionBatch
} from "@pure-advance/data-ingestion";

import { demoItineraryIntel } from "@pure-advance/domain";

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
  const reviewModel = buildBusinessVisitReviewModel(reviewSnapshot, demoData);
  const dryRunModel = buildIngestionDryRunModel(
    dryRunBusinessTargetIngestionBatch(businessTargetDryRunFixtureBatch)
  );

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Data Review"
        summary="What real sanitized data is live, where it came from, what is guarded, Supabase readiness, and the staged import contract."
        badge="Backend-ready"
      />

      <section aria-label="Hydration" className="mb-4">
        <div className="mb-2 flex items-center gap-2.5">
          <Layers className="size-4 text-[var(--cc-cyan)]" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
            Hydration
          </span>
          <span className="h-px flex-1 bg-[var(--cc-border)]" />
          <Badge tone="cyan">Live · demo-safe</Badge>
        </div>
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {hydrationTiles.map((tile) => (
            <div
              key={tile.label}
              className="rounded-[var(--cc-r-tile)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]"
            >
              <p className="font-mono text-[20px] font-semibold leading-none text-[var(--cc-cyan)]">
                {tile.value}
              </p>
              <p className="mt-1.5 text-[10.5px] leading-tight text-[var(--cc-text-3)]">
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
            <ul className="mt-2 space-y-1">
              {hydrationSources.map((source) => (
                <li key={source} className="font-mono text-[11px] text-[var(--cc-text-2)]">
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

      <section className="grid gap-4 lg:grid-cols-4">
        {supabaseRows.map((row) => (
          <Card key={row.label}>
            <CardHeader>
              <CardTitle>{row.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex items-end justify-between gap-4">
                  <p className="text-xl font-semibold tracking-normal">{row.value}</p>
                  <Badge tone={row.tone}>{row.tone === "coral" ? "action" : row.tone}</Badge>
                </div>
                <p className="text-xs leading-5 text-[var(--pa-muted)]">{row.note}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        {reviewModel.summaryRows.map((row) => (
          <Card key={row.label}>
            <CardHeader>
              <CardTitle>{row.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-4">
                <p className="text-3xl font-semibold tracking-normal">{row.value}</p>
                <Badge tone={row.tone}>{row.note}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="mt-4 grid gap-4 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Ingestion dry-run</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex items-end justify-between gap-4">
                <p className="text-xl font-semibold tracking-normal">{dryRunModel.status.label}</p>
                <Badge tone={dryRunModel.status.tone}>contract</Badge>
              </div>
              <p className="text-xs leading-5 text-[var(--pa-muted)]">{dryRunModel.status.note}</p>
            </div>
          </CardContent>
        </Card>
        {dryRunModel.summaryRows.map((row) => (
          <Card key={row.label}>
            <CardHeader>
              <CardTitle>{row.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-4">
                <p className="text-3xl font-semibold tracking-normal">{row.value}</p>
                <Badge tone={row.tone}>{row.note}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Import Gates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-[var(--pa-muted)]">
            <p className="flex flex-wrap items-center gap-2">
              <DatabaseZap className="size-4 text-[var(--pa-cyan)]" aria-hidden="true" />
              Review data source:
              <Badge tone={reviewModel.source.tone}>{reviewModel.source.label}</Badge>
              <span className="text-xs">{reviewModel.source.note}</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[var(--pa-green)]" aria-hidden="true" />
              Source labels and confidence are required.
            </p>
            <p className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-[var(--pa-amber)]" aria-hidden="true" />
              Passport, national ID, payment, and credential fields are blocked.
            </p>
            <p className="flex items-center gap-2">
              <DatabaseZap className="size-4 text-[var(--pa-cyan)]" aria-hidden="true" />
              Supabase writes remain deferred until the ingestion source contract is approved.
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[var(--pa-green)]" aria-hidden="true" />
              RLS starts as authenticated read-only; anonymous and mutation policies are not
              granted.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dry-run Rejection Reasons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dryRunModel.rejectionRows.map((row) => (
              <div
                key={`${row.index}-${row.name}`}
                className="border-b border-[var(--pa-border)] pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold tracking-normal">{row.name}</p>
                  <Badge tone={row.tone}>row {row.index + 1}</Badge>
                </div>
                <p className="mt-2 text-xs leading-5 text-[var(--pa-muted)]">
                  {row.reasons.join("; ")}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Targets Awaiting Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reviewModel.targetsAwaitingVerification.map((target) => (
              <div
                key={target.id}
                className="flex flex-col gap-2 border-b border-[var(--pa-border)] pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold tracking-normal">{target.name}</p>
                  <p className="text-sm text-[var(--pa-muted)]">
                    {target.city} · {target.status.replaceAll("_", " ")}
                  </p>
                </div>
                <Badge tone={target.sourceConfidence === "unknown" ? "amber" : "cyan"}>
                  {target.sourceConfidence}
                </Badge>
              </div>
            ))}
            {reviewModel.targetsAwaitingVerification.length === 0 ? (
              <p className="text-sm text-[var(--pa-muted)]">
                No targets currently require verification.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
