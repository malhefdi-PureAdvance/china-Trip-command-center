"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { CloudUpload, KeyRound, NotebookPen, Plus, RefreshCw, Trash2 } from "lucide-react";

import { Button, Card, CardContent, CardHeader, CardTitle, cn } from "@pure-advance/design-system";

import {
  Chip,
  EmptyState,
  IconSquare,
  SectionHeading,
  type ChipTone
} from "@/components/command-kit";
import type { FieldNotePrompt } from "@/lib/mission-ops";
import { getBrowserSupabase } from "@/lib/supabase-browser";
import {
  deleteRemoteNote,
  syncTeamNotes,
  type FieldNote,
  type SyncState,
  type Template
} from "@/lib/team-notes-sync";

const STORAGE_KEY = "pa-field-notes";
const EMPTY: FieldNote[] = [];

// External store (localStorage-backed) read via useSyncExternalStore so there
// is no setState-in-effect and no SSR/hydration mismatch. getSnapshot must
// return a stable reference between writes. Local-first: sync only decorates
// notes with metadata; storage stays the device's source of truth.
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

const syncMeta: Record<SyncState, { text: string; dot: string; chip: ChipTone; pulse?: boolean }> =
  {
    local_only: { text: "Local only", dot: "bg-[var(--cc-text-disabled)]", chip: "neutral" },
    signed_out: { text: "Sign in to sync", dot: "bg-[var(--cc-cyan)]", chip: "cyanTint" },
    idle: { text: "Signed in", dot: "bg-[var(--cc-cyan)]", chip: "cyanTint" },
    syncing: { text: "Syncing…", dot: "bg-[var(--cc-cyan)]", chip: "cyanTint", pulse: true },
    synced: { text: "Synced", dot: "bg-[var(--cc-green)]", chip: "green" },
    offline: { text: "Offline", dot: "bg-[var(--cc-amber)]", chip: "amber" },
    error: { text: "Sync failed", dot: "bg-[var(--cc-amber)]", chip: "amber" }
  };

/** Sync state as an instrument light: colored dot + mono label. */
function SyncChip({ state }: Readonly<{ state: SyncState }>) {
  const meta = syncMeta[state];

  return (
    <Chip tone={meta.chip}>
      <span
        className={cn(
          "mr-1 inline-block size-[6px] rounded-full align-middle",
          meta.dot,
          meta.pulse && "mission-live-dot"
        )}
        aria-hidden="true"
      />
      {meta.text}
    </Chip>
  );
}

export function FieldNotes({
  prompts = [],
  initialPromptId
}: Readonly<{ prompts?: FieldNotePrompt[]; initialPromptId?: string }>) {
  const notes = useSyncExternalStore(
    subscribe,
    () => readNotes(),
    () => EMPTY
  );
  const selectedPrompt = initialPromptId
    ? (prompts.find((candidate) => candidate.id === initialPromptId) ?? null)
    : null;
  const [template, setTemplate] = useState<Template>(selectedPrompt?.template ?? "meeting");
  const [title, setTitle] = useState(selectedPrompt?.title ?? "");
  const [body, setBody] = useState(selectedPrompt?.body ?? templates.meeting.scaffold);
  const [session, setSession] = useState<Session | null>(null);
  const [syncState, setSyncState] = useState<SyncState>("local_only");
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const counter = useRef(0);

  const supabase = typeof window !== "undefined" ? getBrowserSupabase() : null;

  useEffect(() => {
    // No client → the initial "local_only" state already applies.
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSyncState(data.session ? "idle" : "signed_out");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setSyncState(next ? "idle" : "signed_out");
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  async function runSync() {
    if (!supabase || !session) return;
    setSyncState("syncing");
    setSyncMessage(null);
    const outcome = await syncTeamNotes(supabase, session.user.id, readNotes());
    writeNotes(outcome.notes);
    setSyncState(outcome.state);
    setSyncMessage(outcome.message);
  }

  function pickTemplate(next: Template) {
    setTemplate(next);
    if (body === templates[template].scaffold || body.trim() === "") {
      setBody(templates[next].scaffold);
    }
  }

  function applyPrompt(prompt: FieldNotePrompt) {
    setTemplate(prompt.template);
    setTitle(prompt.title);
    setBody(prompt.body);
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
    writeNotes([note, ...readNotes()]);
    setTitle("");
    setBody(templates[template].scaffold);
  }

  async function removeNote(note: FieldNote) {
    // Local-first: never lose the local copy if the remote delete fails.
    if (note.remoteId && note.mine && supabase && session) {
      const result = await deleteRemoteNote(supabase, note);
      if (!result.ok) {
        setSyncState("error");
        setSyncMessage(result.message ?? "Remote delete failed — note kept.");
        return;
      }
    }
    writeNotes(readNotes().filter((candidate) => candidate.id !== note.id));
  }

  function noteBadge(note: FieldNote): { text: string; tone: ChipTone } {
    if (note.origin === "remote" && !note.mine) return { text: "Team", tone: "cyanTint" };
    if (note.remoteId) return { text: "Synced", tone: "green" };
    return { text: "Local", tone: "neutral" };
  }

  const inputClass =
    "w-full rounded-[var(--cc-r-icon)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] px-3 py-2 text-[13px] text-[var(--cc-text)] outline-none transition-colors placeholder:text-[var(--cc-text-dim)] focus:border-[var(--cc-cyan-line)]";

  return (
    <section aria-label="Field capture" className="mt-6">
      <SectionHeading
        icon={NotebookPen}
        title="Field capture"
        trailing={
          syncState === "signed_out" ? (
            <Link
              href="/private"
              className="cc-lift cc-press inline-flex min-h-9 items-center gap-1 rounded-[var(--cc-r-chip)] border border-[var(--cc-cyan-line-soft)] bg-[var(--cc-cyan-tint-2)] px-2.5 font-mono text-[9.5px] uppercase leading-none tracking-[0.07em] text-[var(--cc-cyan)]"
            >
              <KeyRound className="size-3" aria-hidden="true" />
              {syncMeta.signed_out.text}
            </Link>
          ) : (
            <SyncChip state={syncState} />
          )
        }
      />

      {session ? (
        <div className="mb-3 flex items-start justify-between gap-3 rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]">
          <div className="flex min-w-0 items-start gap-2.5">
            <IconSquare icon={CloudUpload} size="sm" />
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-[var(--cc-text)]">
                Team sync · signed in
              </p>
              <p className="mt-1 text-[11px] leading-[1.5] text-[var(--cc-text-3)]">
                Syncing shares a note with Pure Advance team members. Meeting and debrief text only
                — never booking references, IDs, payments, or private contacts.
              </p>
              {syncMessage ? (
                <p
                  className={`mt-1.5 text-[11.5px] ${
                    syncState === "error" || syncState === "offline"
                      ? "text-[var(--cc-amber-text)]"
                      : "text-[var(--cc-green)]"
                  }`}
                >
                  {syncMessage}
                </p>
              ) : null}
            </div>
          </div>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={syncState === "syncing"}
            onClick={runSync}
          >
            {syncState === "syncing" ? (
              <RefreshCw className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <CloudUpload className="size-4" aria-hidden="true" />
            )}
            Sync now
          </Button>
        </div>
      ) : null}

      {prompts.length > 0 ? (
        <>
          <div className="mb-1.5 grid gap-2.5 lg:grid-cols-2">
            {prompts.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => applyPrompt(prompt)}
                className="cc-lift cc-press min-w-0 rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 text-left shadow-[var(--cc-elev-1)]"
              >
                <span className="cc-eyebrow text-[var(--cc-cyan)]">{prompt.label}</span>
                <span className="mt-1 block truncate text-[13px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
                  {prompt.title}
                </span>
              </button>
            ))}
          </div>
          <p className="mb-3 text-[11px] leading-[1.5] text-[var(--cc-text-faint)]">
            App-safe templates — no IDs, booking references, payment data, or private contacts.
          </p>
        </>
      ) : null}

      <Card className="min-w-0">
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(templates) as Template[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => pickTemplate(key)}
                className={cn(
                  "cc-lift inline-flex min-h-9 shrink-0 items-center rounded-[var(--cc-r-icon)] border px-3 font-mono text-[10px] uppercase tracking-[0.06em] transition-colors",
                  template === key
                    ? "border-[var(--cc-cyan)] bg-[var(--cc-cyan)] font-semibold text-[var(--cc-cyan-ink)] shadow-[var(--cc-shadow-cta)]"
                    : "border-[var(--cc-border)] bg-[var(--cc-surface-inset)] text-[var(--cc-text-3)]"
                )}
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
              {session
                ? "Saved on this device first; sync when you choose."
                : "Saved only in this browser. Nothing is uploaded."}
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
          {notes.map((note) => {
            const label = noteBadge(note);
            return (
              <Card key={note.id} className="min-w-0">
                <CardHeader className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="truncate">{note.title}</CardTitle>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--cc-text-faint)]">
                      {templates[note.template]?.label ?? "Note"} · {formatTime(note.createdAt)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <Chip tone={label.tone}>{label.text}</Chip>
                    <button
                      type="button"
                      onClick={() => removeNote(note)}
                      aria-label={`Delete ${note.title}`}
                      className="grid size-9 place-items-center rounded-[var(--cc-r-icon)] text-[var(--cc-text-faint)] transition-colors hover:bg-[var(--cc-surface-inset)] hover:text-[var(--cc-amber-text)] active:translate-y-px"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap font-mono text-[12px] leading-[1.55] text-[var(--cc-text-2)]">
                    {note.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          className="mt-3"
          icon={NotebookPen}
          title="No field notes yet"
          body="Notes stay on this device until you choose to sync. Capture the first meeting note or daily debrief above."
        />
      )}
    </section>
  );
}
