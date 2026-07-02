import { Tag, Users } from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";

import { FieldNotes } from "@/components/field-notes";
import { PageHeader } from "@/components/page-header";
import { activeTrip, demoData, getUserPerson } from "@/lib/demo-data";

export default function NotesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notes"
        title="Notes & Field Capture"
        summary={`Shared mission context for ${activeTrip.name}, plus on-device capture for meetings and debriefs across Hong Kong and Shenzhen.`}
        badge="No uploads"
      />

      <section aria-label="Shared notes">
        <div className="mb-2 flex items-center gap-2.5">
          <Users className="size-4 text-[var(--cc-cyan)]" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
            Shared context
          </span>
          <span className="h-px flex-1 bg-[var(--cc-border)]" />
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {demoData.notes.map((note) => {
            const author = getUserPerson(note.authorUserId);

            return (
              <Card key={note.id} className="min-w-0">
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                  <p className="mt-0.5 text-[12px] text-[var(--cc-text-3)]">
                    {author?.displayName ?? "Team"}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-[13px] leading-[1.5] text-[var(--cc-text-2)]">{note.body}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <Badge key={tag} tone="neutral">
                        <Tag className="mr-1 inline size-3" aria-hidden="true" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <FieldNotes />
    </>
  );
}
