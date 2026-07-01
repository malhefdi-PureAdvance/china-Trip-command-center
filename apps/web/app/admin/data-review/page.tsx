import { AlertTriangle, CheckCircle2, DatabaseZap, ShieldCheck } from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";
import { checkSupabaseHealth } from "@pure-advance/database";

import { PageHeader } from "@/components/page-header";
import { demoData } from "@/lib/demo-data";
import { buildSupabaseHealthRows } from "@/lib/supabase-health-view";

export const dynamic = "force-dynamic";

const reviewRows = [
  {
    label: "Business target sources",
    value: demoData.businessTargetSources.length,
    tone: "cyan" as const,
    note: "Synthetic records only"
  },
  {
    label: "Sensitive field guardrail",
    value: "On",
    tone: "green" as const,
    note: "Future ingestion rejects blocked fields"
  },
  {
    label: "Manual review queue",
    value: demoData.businessTargets.filter((target) => !isVerifiedSource(target.sourceConfidence))
      .length,
    tone: "amber" as const,
    note: "Source confidence below verified"
  }
];

function isVerifiedSource(sourceConfidence: string) {
  return sourceConfidence === "verified";
}

export default async function DataReviewPage() {
  const supabaseHealth = await checkSupabaseHealth();
  const supabaseRows = buildSupabaseHealthRows(supabaseHealth);

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
        {reviewRows.map((row) => (
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
      <section className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Import Gates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-[var(--pa-muted)]">
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
            <CardTitle>Targets Awaiting Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoData.businessTargets.map((target) => (
              <div
                key={target.id}
                className="flex flex-col gap-2 border-b border-[var(--pa-border)] pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold tracking-normal">{target.name}</p>
                  <p className="text-sm text-[var(--pa-muted)]">{target.city}</p>
                </div>
                <Badge tone={target.sourceConfidence === "unknown" ? "amber" : "cyan"}>
                  {target.sourceConfidence}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
