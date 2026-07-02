import type { SupabaseClient } from "@supabase/supabase-js";

// Team note sync — local-first. localStorage remains the source of truth for
// the device; sync only ADDS metadata (remoteId/syncedAt/origin) and never
// deletes a local note on failure. Remote transport is the user's own
// Supabase session (cross-origin REST — never intercepted by the service
// worker). RLS (migration 0004) is the enforcement layer: owner/team roles
// read+write team_notes; anonymous, non-members, and program_viewer get
// nothing (inserts fail, selects return empty).

export type Template = "meeting" | "lead" | "debrief";

export type FieldNote = {
  id: string;
  template: Template;
  title: string;
  body: string;
  createdAt: number;
  /** team_notes.id once pushed/pulled. Absent = local-only note. */
  remoteId?: string;
  /** Last successful sync of this note (ms epoch). */
  syncedAt?: number;
  /** "remote" = pulled from a teammate/another device. */
  origin?: "remote";
  /** True when the remote row was authored by the current user. */
  mine?: boolean;
};

export type TeamNoteRow = {
  id: string;
  author_user_id: string;
  title: string;
  body: string;
  created_at: string;
};

export type SyncState =
  | "local_only" // tier disabled/unconfigured — device storage only
  | "signed_out" // tier enabled, no session
  | "idle" // signed in, ready
  | "syncing"
  | "synced"
  | "offline"
  | "error";

export type SyncOutcome = {
  state: Extract<SyncState, "synced" | "error" | "offline">;
  pushed: number;
  pulled: number;
  message: string;
  notes: FieldNote[];
};

/** Local notes that still need a remote insert. */
export function planPush(notes: FieldNote[]): FieldNote[] {
  return notes.filter((note) => !note.remoteId);
}

/**
 * Merge remote rows into the local list. Rows already linked to a local note
 * (by remoteId) refresh `mine`; unknown rows are appended as remote-origin
 * notes. Never removes or rewrites local content.
 */
export function mergePull(
  local: FieldNote[],
  remote: TeamNoteRow[],
  myUserId: string
): { notes: FieldNote[]; pulled: number } {
  const byRemoteId = new Map(local.filter((n) => n.remoteId).map((n) => [n.remoteId!, n]));
  let pulled = 0;
  const additions: FieldNote[] = [];

  for (const row of remote) {
    const existing = byRemoteId.get(row.id);
    if (existing) {
      existing.mine = row.author_user_id === myUserId;
      continue;
    }
    pulled += 1;
    additions.push({
      id: `remote-${row.id}`,
      template: "meeting",
      title: row.title,
      body: row.body,
      createdAt: Date.parse(row.created_at) || 0,
      remoteId: row.id,
      syncedAt: 0,
      origin: "remote",
      mine: row.author_user_id === myUserId
    });
  }

  // Newest first, matching the local list's ordering convention.
  const merged = [...additions, ...local].sort((a, b) => b.createdAt - a.createdAt);
  return { notes: merged, pulled };
}

/** Map a Supabase/PostgREST failure to an honest user-facing message. */
export function describeSyncError(error: { code?: string; message?: string } | null): string {
  if (!error) return "Sync failed — unknown error.";
  if (error.code === "42501" || /row-level security/i.test(error.message ?? "")) {
    return "Not authorized to sync — your account has no team membership. Ask Mohammed to provision access.";
  }
  return `Sync failed — ${error.message ?? "network or server error"}. Local notes are safe on this device.`;
}

/**
 * Push unsynced notes, then pull the team's notes. Local-first guarantees:
 * every failure path returns the ORIGINAL notes (plus any partial sync
 * metadata) — nothing is ever dropped.
 */
export async function syncTeamNotes(
  supabase: SupabaseClient,
  userId: string,
  notes: FieldNote[],
  now: () => number = Date.now
): Promise<SyncOutcome> {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return {
      state: "offline",
      pushed: 0,
      pulled: 0,
      message: "Offline — notes stay on this device until you reconnect.",
      notes
    };
  }

  const working = notes.map((note) => ({ ...note }));
  let pushed = 0;

  for (const note of planPush(working)) {
    const { data, error } = await supabase
      .from("team_notes")
      .insert({ author_user_id: userId, title: note.title, body: note.body })
      .select("id")
      .single();

    if (error || !data) {
      return {
        state: "error",
        pushed,
        pulled: 0,
        message: describeSyncError(error),
        notes: working
      };
    }
    note.remoteId = data.id as string;
    note.syncedAt = now();
    note.mine = true;
    pushed += 1;
  }

  const { data: rows, error: pullError } = await supabase
    .from("team_notes")
    .select("id, author_user_id, title, body, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (pullError) {
    return {
      state: "error",
      pushed,
      pulled: 0,
      message: describeSyncError(pullError),
      notes: working
    };
  }

  const { notes: merged, pulled } = mergePull(working, (rows ?? []) as TeamNoteRow[], userId);
  return {
    state: "synced",
    pushed,
    pulled,
    message:
      pushed === 0 && pulled === 0
        ? "Everything is in sync."
        : `Synced — ${pushed} pushed, ${pulled} pulled.`,
    notes: merged
  };
}

/** Delete the remote copy of a note the user authored. Local copy untouched. */
export async function deleteRemoteNote(
  supabase: SupabaseClient,
  note: FieldNote
): Promise<{ ok: boolean; message?: string }> {
  if (!note.remoteId) return { ok: true };
  const { error } = await supabase.from("team_notes").delete().eq("id", note.remoteId);
  if (error) return { ok: false, message: describeSyncError(error) };
  return { ok: true };
}
