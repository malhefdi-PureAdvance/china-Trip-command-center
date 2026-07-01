import { UsersRound } from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";

import { PageHeader } from "@/components/page-header";
import { activeTrip, demoData, getPersonById } from "@/lib/demo-data";

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="Mission Team"
        summary={`Demo members assigned to ${activeTrip.name}.`}
        badge="Role scaffold"
      />
      <section className="grid gap-4 lg:grid-cols-2">
        {demoData.tripMembers.map((member) => {
          const person = getPersonById(member.personId);

          return (
            <Card key={member.id}>
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>{person?.displayName ?? "Demo member"}</CardTitle>
                  <p className="mt-1 text-sm text-[var(--pa-muted)]">
                    {person?.title ?? "Mission role"}
                  </p>
                </div>
                <Badge tone="cyan">{member.role.replaceAll("_", " ")}</Badge>
              </CardHeader>
              <CardContent>
                <p className="flex items-center gap-2 text-sm text-[var(--pa-muted)]">
                  <UsersRound className="size-4 text-[var(--pa-green)]" aria-hidden="true" />
                  {person?.organization ?? "Pure Advance"}
                </p>
                <p className="mt-3 text-sm leading-6">{member.availabilityNote}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </>
  );
}
