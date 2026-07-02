import { describe, expect, it } from "vitest";

import {
  describeSyncError,
  mergePull,
  planPush,
  syncTeamNotes,
  type FieldNote,
  type TeamNoteRow
} from "./team-notes-sync";

const local = (over: Partial<FieldNote> = {}): FieldNote => ({
  id: "l1",
  template: "meeting",
  title: "HKSTP debrief",
  body: "Key points",
  createdAt: 100,
  ...over
});

type InsertResult = {
  data: { id: string } | null;
  error: { code?: string; message?: string } | null;
};

// Minimal supabase stub covering the exact query chains the sync uses.
function stubSupabase(opts: {
  insert?: InsertResult;
  select?: { data: TeamNoteRow[] | null; error: { message: string } | null };
}) {
  return {
    from: () => ({
      insert: () => ({
        select: () => ({
          single: async () => opts.insert ?? { data: { id: "r-new" }, error: null }
        })
      }),
      select: () => ({
        order: () => ({
          limit: async () => opts.select ?? { data: [], error: null }
        })
      }),
      delete: () => ({ eq: async () => ({ error: null }) })
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}

describe("planPush", () => {
  it("selects only notes without a remoteId", () => {
    const notes = [local(), local({ id: "l2", remoteId: "r2" })];
    expect(planPush(notes).map((n) => n.id)).toEqual(["l1"]);
  });
});

describe("mergePull", () => {
  it("appends unknown remote rows as remote-origin and marks authorship", () => {
    const remote: TeamNoteRow[] = [
      {
        id: "r9",
        author_user_id: "me",
        title: "Mine",
        body: "b",
        created_at: "2026-07-08T10:00:00Z"
      },
      {
        id: "r8",
        author_user_id: "other",
        title: "Teammate",
        body: "b",
        created_at: "2026-07-09T10:00:00Z"
      }
    ];
    const { notes, pulled } = mergePull([local()], remote, "me");
    expect(pulled).toBe(2);
    const mine = notes.find((n) => n.remoteId === "r9");
    const theirs = notes.find((n) => n.remoteId === "r8");
    expect(mine?.origin).toBe("remote");
    expect(mine?.mine).toBe(true);
    expect(theirs?.mine).toBe(false);
    // Local note untouched.
    expect(notes.find((n) => n.id === "l1")?.body).toBe("Key points");
  });

  it("does not duplicate rows already linked locally", () => {
    const linked = local({ id: "l2", remoteId: "r2" });
    const { notes, pulled } = mergePull(
      [linked],
      [
        {
          id: "r2",
          author_user_id: "me",
          title: "x",
          body: "y",
          created_at: "2026-07-08T00:00:00Z"
        }
      ],
      "me"
    );
    expect(pulled).toBe(0);
    expect(notes).toHaveLength(1);
    expect(notes[0].mine).toBe(true);
  });
});

describe("syncTeamNotes (local-first guarantees)", () => {
  it("pushes unsynced notes and reports synced", async () => {
    const out = await syncTeamNotes(stubSupabase({}), "me", [local()], () => 999);
    expect(out.state).toBe("synced");
    expect(out.pushed).toBe(1);
    expect(out.notes[0].remoteId).toBe("r-new");
    expect(out.notes[0].syncedAt).toBe(999);
  });

  it("keeps every local note when an RLS denial occurs", async () => {
    const out = await syncTeamNotes(
      stubSupabase({
        insert: { data: null, error: { code: "42501", message: "row-level security" } }
      }),
      "me",
      [local(), local({ id: "l2", title: "Second" })]
    );
    expect(out.state).toBe("error");
    expect(out.message).toContain("no team membership");
    expect(out.notes).toHaveLength(2);
    expect(out.notes.every((n) => !n.remoteId)).toBe(true);
  });

  it("keeps notes and partial push metadata when the pull fails", async () => {
    const out = await syncTeamNotes(
      stubSupabase({ select: { data: null, error: { message: "boom" } } }),
      "me",
      [local()]
    );
    expect(out.state).toBe("error");
    expect(out.pushed).toBe(1);
    expect(out.notes[0].remoteId).toBe("r-new");
    expect(out.message).toContain("Local notes are safe");
  });
});

describe("describeSyncError", () => {
  it("maps RLS denials to the membership message", () => {
    expect(describeSyncError({ code: "42501" })).toContain("no team membership");
    expect(describeSyncError({ message: "new row violates row-level security" })).toContain(
      "no team membership"
    );
  });
});
