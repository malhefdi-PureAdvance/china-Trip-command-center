import { AlertTriangle, CheckCircle2, DatabaseZap, ShieldCheck } from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";
import { checkSupabaseHealth, fetchBusinessVisitReviewSnapshot } from "@pure-advance/database";
import {
  businessTargetDryRunFixtureBatch,
  dryRunBusinessTargetIngestionBatch
} from "@pure-advance/data-ingestion";

import { PageHeader } from "@/components/page-header";
import { demoData } from "@/lib/demo-data";
import { buildBusinessVisitReviewModel, buildIngestionDryRunModel } from "@/lib/data-review-view";
import { buildSupabaseHealthRows } from "@/lib/supabase-health-view";

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
        summary="Review queue scaffold for future source-backed ingestion, Supabase health, and approval workflows."
        badge="Backend-ready"
      />
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
