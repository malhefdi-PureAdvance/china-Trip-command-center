import { Building2, CalendarClock, UsersRound } from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";

import { PageHeader } from "@/components/page-header";
import { activeTrip, demoData, getPersonById } from "@/lib/demo-data";

const roleLabel: Record<string, string> = {
  mission_lead: "Mission Lead",
  traveler: "Traveler",
  host: "Program",
  remote_support: "Remote support"
};

function MemberCard({
  personId,
  role,
  availabilityNote,
  accent
}: Readonly<{
  personId: string;
  role: string;
  availabilityNote?: string;
  accent: "cyan" | "purple";
}>) {
  const person = getPersonById(personId);
  const initial = (person?.displayName ?? "?").charAt(0).toUpperCase();
  const avatarClass =
    accent === "purple"
      ? "bg-[var(--cc-purple-tint)] text-[var(--cc-purple)]"
      : "bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]";

  return (
    <Card className="min-w-0">
      <CardHeader className="flex flex-row items-center gap-3">
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full font-mono text-[13px] font-bold ${avatarClass}`}
          aria-hidden="true"
        >
          {initial}
        </span>
        <div className="min-w-0 flex-1">
          <CardTitle className="truncate">{person?.displayName ?? "Team member"}</CardTitle>
          <p className="mt-0.5 truncate text-[12px] text-[var(--cc-text-3)]">
            {person?.title ?? "Mission role"}
          </p>
        </div>
        <Badge tone={accent === "purple" ? "neutral" : "cyan"}>{roleLabel[role] ?? role}</Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="flex items-center gap-2 text-[12px] text-[var(--cc-text-3)]">
          <Building2 className="size-3.5 shrink-0 text-[var(--cc-text-faint)]" aria-hidden="true" />
          {person?.organization ?? "Pure Advance"}
        </p>
        {availabilityNote ? (
          <p className="flex items-start gap-2 text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
            <CalendarClock
              className="mt-0.5 size-3.5 shrink-0 text-[var(--cc-cyan)]"
              aria-hidden="true"
            />
            {availabilityNote}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default function TeamPage() {
  const members = demoData.tripMembers;
  const pureAdvance = members.filter((member) => member.role !== "host");
  const program = members.filter((member) => member.role === "host");

  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="Mission Team"
        summary={`Who is on the ground for ${activeTrip.name}, and the program contact — kept separate. Hong Kong and Shenzhen corridor.`}
        badge="Roster"
      />

      <section aria-label="Pure Advance team">
        <div className="mb-2 flex items-center gap-2.5">
          <UsersRound className="size-4 text-[var(--cc-cyan)]" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
            Pure Advance team
          </span>
          <span className="h-px flex-1 bg-[var(--cc-border)]" />
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {pureAdvance.map((member) => (
            <MemberCard
              key={member.id}
              personId={member.personId}
              role={member.role}
              availabilityNote={member.availabilityNote}
              accent="cyan"
            />
          ))}
        </div>
      </section>

      {program.length > 0 ? (
        <section aria-label="Program" className="mt-6">
          <div className="mb-2 flex items-center gap-2.5">
            <Building2 className="size-4 text-[var(--cc-purple)]" aria-hidden="true" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cc-purple)]">
              Program
            </span>
            <span className="h-px flex-1 bg-[var(--cc-border)]" />
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {program.map((member) => (
              <MemberCard
                key={member.id}
                personId={member.personId}
                role={member.role}
                availabilityNote={member.availabilityNote}
                accent="purple"
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
