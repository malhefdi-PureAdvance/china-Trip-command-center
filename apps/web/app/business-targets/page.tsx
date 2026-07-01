import { ExternalLink, Gauge } from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";

import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import {
  activeTrip,
  demoData,
  getTargetProfile,
  getTargetScore,
  getTargetSources
} from "@/lib/demo-data";

export default function BusinessTargetsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Business Targets"
        title="Visit Pipeline"
        summary={`Source-backed target tracking for the ${activeTrip.region} mission scaffold.`}
        badge="Demo standard v0.1"
      />
      <section className="grid gap-4 xl:grid-cols-2">
        {demoData.businessTargets.map((target) => {
          const profile = getTargetProfile(target.id);
          const score = getTargetScore(target.id);
          const sources = getTargetSources(target.id);

          return (
            <Card key={target.id}>
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>{target.name}</CardTitle>
                  <p className="mt-1 text-sm text-[var(--pa-muted)]">
                    {target.city} / {target.sector}
                  </p>
                </div>
                <StatusPill status={target.status} />
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-6 text-[var(--pa-foreground)]">
                  {profile?.visitObjective ?? "Profile pending source-backed ingestion and review."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge tone={target.sourceConfidence === "unknown" ? "amber" : "cyan"}>
                    Source {target.sourceConfidence}
                  </Badge>
                  {target.priorityRank ? (
                    <Badge tone="green">Priority {target.priorityRank}</Badge>
                  ) : null}
                  {score ? (
                    <Badge tone="neutral">
                      <Gauge className="mr-1 inline size-3" aria-hidden="true" />
                      Score {score.priorityScore}
                    </Badge>
                  ) : null}
                </div>
                <div className="space-y-2">
                  {sources.map((source) => (
                    <p
                      key={source.id}
                      className="flex items-center gap-2 text-sm text-[var(--pa-muted)]"
                    >
                      <ExternalLink className="size-4 text-[var(--pa-cyan)]" aria-hidden="true" />
                      {source.sourceLabel}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </>
  );
}
