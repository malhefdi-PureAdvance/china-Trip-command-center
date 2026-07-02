"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { CloudUpload, KeyRound, NotebookPen, Plus, RefreshCw, Trash2 } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@pure-advance/design-system";

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

const syncBadge: Record<SyncState, { text: string; tone: "neutral" | "cyan" | "green" | "amber" }> =
  {
    local_only: { text: "Local only", tone: "neutral" },
    signed_out: { text: "Sign in to sync", tone: "neutral" },
    idle: { text: "Signed in", tone: "cyan" },
    syncing: { text: "Syncing…", tone: "cyan" },
    synced: { text: "Synced", tone: "green" },
    offline: { text: "Offline", tone: "amber" },
    error: { text: "Sync failed", tone: "amber" }
  };

export function FieldNotes() {
  const notes = useSyncExternalStore(
    subscribe,
    () => readNotes(),
    () => EMPTY
  );
  const [template, setTemplate] = useState<Template>("meeting");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(templates.meeting.scaffold);
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

  function noteBadge(note: FieldNote): { text: string; tone: "neutral" | "cyan" | "green" } {
    if (note.origin === "remote" && !note.mine) return { text: "Team", tone: "cyan" };
    if (note.remoteId) return { text: "Synced", tone: "green" };
    return { text: "Local", tone: "neutral" };
  }

  const badge = syncBadge[syncState];
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
        {syncState === "signed_out" ? (
          <Link
            href="/private"
            className="inline-flex items-center gap-1 rounded-full border border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--cc-cyan)]"
          >
            <KeyRound className="size-3" aria-hidden="true" />
            {badge.text}
          </Link>
        ) : (
          <Badge tone={badge.tone}>{badge.text}</Badge>
        )}
      </div>

      {session ? (
        <div className="mb-3 flex items-start justify-between gap-3 rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]">
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-[var(--cc-text)]">Team sync · signed in</p>
            <p className="mt-1 text-[11px] leading-[1.5] text-[var(--cc-text-3)]">
              Syncing shares a note with Pure Advance team members. Meeting and debrief text only —
              never booking references, IDs, payments, or private contacts.
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
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--cc-text-faint)]">
                      {templates[note.template]?.label ?? "Note"} · {formatTime(note.createdAt)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <Badge tone={label.tone}>{label.text}</Badge>
                    <button
                      type="button"
                      onClick={() => removeNote(note)}
                      aria-label={`Delete ${note.title}`}
                      className="rounded-[var(--cc-r-icon)] p-1.5 text-[var(--cc-text-faint)] active:translate-y-px"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap font-mono text-[12px] leading-[1.5] text-[var(--cc-text-2)]">
                    {note.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
