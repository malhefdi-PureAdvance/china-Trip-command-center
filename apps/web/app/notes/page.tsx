import { Tag } from "lucide-react";

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@pure-advance/design-system";

import { PageHeader } from "@/components/page-header";
import { activeTrip, demoData, getUserPerson } from "@/lib/demo-data";

export default function NotesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notes"
        title="Team Notes"
        summary={`Shared notes for ${activeTrip.name}; all current entries are synthetic demo records.`}
        badge="No sensitive data"
      />
      <section className="grid gap-4 lg:grid-cols-2">
        {demoData.notes.map((note) => {
          const author = getUserPerson(note.authorUserId);

          return (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <p className="text-sm text-[var(--pa-muted)]">
                  {author?.displayName ?? "Demo author"}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6">{note.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
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
      </section>
    </>
  );
}
