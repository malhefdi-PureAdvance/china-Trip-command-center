import { Tag, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";

import { Chip, SectionHeading } from "@/components/command-kit";
import { FieldNotes } from "@/components/field-notes";
import { PageHeader } from "@/components/page-header";
import { getCurrentMissionNow } from "@/lib/clock";
import { activeTrip, demoData, getUserPerson } from "@/lib/demo-data";
import { buildMissionOps } from "@/lib/mission-ops";

type Search = { prompt?: string };

export const dynamic = "force-dynamic";

export default async function NotesPage({
  searchParams
}: Readonly<{ searchParams: Promise<Search> }>) {
  const { prompt } = await searchParams;
  const ops = buildMissionOps(getCurrentMissionNow());

  return (
    <>
      <PageHeader
        eyebrow="Notes"
        title="Notes & Field Capture"
        summary={`Shared mission context for ${activeTrip.name}, plus on-device capture for meetings and debriefs across Hong Kong and Shenzhen.`}
        badge="Local-first"
      />

      <section aria-label="Shared notes">
        <SectionHeading icon={Users} title="Shared context" />
        <div className="grid gap-3 lg:grid-cols-2">
          {demoData.notes.map((note) => {
            const author = getUserPerson(note.authorUserId);

            return (
              <Card key={note.id} className="min-w-0">
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--cc-text-faint)]">
                    {author?.displayName ?? "Team"}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-[13px] leading-[1.55] text-[var(--cc-text-2)]">{note.body}</p>
                  {note.tags.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {note.tags.map((tag) => (
                        <Chip key={tag} tone="soft" icon={Tag}>
                          {tag}
                        </Chip>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <FieldNotes prompts={ops.notePrompts} initialPromptId={prompt} />
    </>
  );
}
