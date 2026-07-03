import { Tag, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";

import { MetaChip, SectionLabel } from "@/components/command-kit";
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
        <SectionLabel
          icon={Users}
          label="Shared context"
          meta={<MetaChip tone="faint">{demoData.notes.length}</MetaChip>}
          className="mb-2.5"
        />
        <div className="grid gap-3 lg:grid-cols-2">
          {demoData.notes.map((note) => {
            const author = getUserPerson(note.authorUserId);
            const initial = (author?.displayName ?? "T").charAt(0).toUpperCase();

            return (
              <Card key={note.id} className="min-w-0">
                <CardHeader className="flex flex-row items-center gap-3">
                  <span
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--cc-cyan-tint)] font-mono text-[12px] font-bold text-[var(--cc-cyan)]"
                    aria-hidden="true"
                  >
                    {initial}
                  </span>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="truncate">{note.title}</CardTitle>
                    <p className="mt-0.5 truncate text-[11.5px] text-[var(--cc-text-3)]">
                      {author?.displayName ?? "Team"}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="max-w-[62ch] text-[13px] leading-[1.6] text-[var(--cc-text-2)]">
                    {note.body}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {note.tags.map((tag) => (
                      <MetaChip key={tag} tone="faint" icon={Tag}>
                        {tag}
                      </MetaChip>
                    ))}
                  </div>
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
