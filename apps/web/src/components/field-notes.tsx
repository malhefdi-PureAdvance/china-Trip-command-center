"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { NotebookPen, Plus, Trash2 } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@pure-advance/design-system";

type Template = "meeting" | "lead" | "debrief";

type FieldNote = {
  id: string;
  template: Template;
  title: string;
  body: string;
  createdAt: number;
};

const STORAGE_KEY = "pa-field-notes";
const EMPTY: FieldNote[] = [];

// External store (localStorage-backed) read via useSyncExternalStore so there
// is no setState-in-effect and no SSR/hydration mismatch. getSnapshot must
// return a stable reference between writes.
let cache: FieldNote[] | null = null;
const listeners = new Set<() => void>();

function readNotes(): FieldNote[] {
  if (cache === null) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      cache = Array.isArray(parsed) ? (parsed as FieldNote[]) : [];
    } catch {
      cache = [];
    }
  }
  return cache;
}

function writeNotes(next: FieldNote[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private mode) — keep in-memory only
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const templates: Record<Template, { label: string; titlePlaceholder: string; scaffold: string }> = {
  meeting: {
    label: "Meeting note",
    titlePlaceholder: "Company / person met",
    scaffold:
      "Context:\n\nKey points:\n- \n- \n\nAsks / offers:\n- \n\nNext action (owner · when):\n- "
  },
  lead: {
    label: "Lead follow-up",
    titlePlaceholder: "Lead / company",
    scaffold: "Stage:\nOwner:\nNext step:\nDue:\nNotes:\n- "
  },
  debrief: {
    label: "Daily debrief",
    titlePlaceholder: "Day (e.g. Jul 8 · LEAP East)",
    scaffold: "Wins:\n- \n\nBlockers:\n- \n\nTomorrow:\n- "
  }
};

function formatTime(ts: number): string {
  try {
    return new Date(ts).toLocaleString("en-GB", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "";
  }
}

export function FieldNotes() {
  const notes = useSyncExternalStore(
    subscribe,
    () => readNotes(),
    () => EMPTY
  );
  const [template, setTemplate] = useState<Template>("meeting");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(templates.meeting.scaffold);
  const counter = useRef(0);

  function pickTemplate(next: Template) {
    setTemplate(next);
    if (body === templates[template].scaffold || body.trim() === "") {
      setBody(templates[next].scaffold);
    }
  }

  function addNote() {
    if (title.trim() === "" && body.trim() === "") return;
    counter.current += 1;
    const note: FieldNote = {
      id: `${Date.now()}-${counter.current}`,
      template,
      title: title.trim() || templates[template].label,
      body: body.trim(),
      createdAt: Date.now()
    };
    writeNotes([note, ...notes]);
    setTitle("");
    setBody(templates[template].scaffold);
  }

  function removeNote(id: string) {
    writeNotes(notes.filter((note) => note.id !== id));
  }

  const inputClass =
    "w-full rounded-[var(--cc-r-icon)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] px-3 py-2 text-[13px] text-[var(--cc-text)] outline-none placeholder:text-[var(--cc-text-dim)] focus:border-[var(--cc-cyan-line)]";

  return (
    <section aria-label="Field capture" className="mt-6">
      <div className="mb-2 flex items-center gap-2.5">
        <NotebookPen className="size-4 text-[var(--cc-cyan)]" aria-hidden="true" />
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
          Field capture
        </span>
        <span className="h-px flex-1 bg-[var(--cc-border)]" />
        <Badge tone="neutral">On this device</Badge>
      </div>

      <Card className="min-w-0">
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(templates) as Template[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => pickTemplate(key)}
                className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.06em] transition-colors ${
                  template === key
                    ? "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]"
                    : "border-[var(--cc-border)] bg-[var(--cc-surface-inset)] text-[var(--cc-text-3)]"
                }`}
              >
                {templates[key].label}
              </button>
            ))}
          </div>
          <input
            className={inputClass}
            placeholder={templates[template].titlePlaceholder}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            className={`${inputClass} min-h-32 resize-y font-mono text-[12px] leading-[1.5]`}
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] text-[var(--cc-text-faint)]">
              Saved only in this browser. Nothing is uploaded.
            </p>
            <Button type="button" size="sm" onClick={addNote}>
              <Plus className="size-4" aria-hidden="true" />
              Save note
            </Button>
          </div>
        </CardContent>
      </Card>

      {notes.length > 0 ? (
        <div className="mt-3 space-y-2.5">
          {notes.map((note) => (
            <Card key={note.id} className="min-w-0">
              <CardHeader className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle className="truncate">{note.title}</CardTitle>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--cc-text-faint)]">
                    {templates[note.template].label} · {formatTime(note.createdAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeNote(note.id)}
                  aria-label={`Delete ${note.title}`}
                  className="shrink-0 rounded-[var(--cc-r-icon)] p-1.5 text-[var(--cc-text-faint)] active:translate-y-px"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap font-mono text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
                  {note.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </section>
  );
}
