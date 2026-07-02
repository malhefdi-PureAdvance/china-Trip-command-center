"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { LogIn, LogOut, MailCheck, ShieldAlert } from "lucide-react";

import { Badge, Button } from "@pure-advance/design-system";

type Props = {
  /** Present only when the private tier is enabled; public values only. */
  publicConfig: { url: string; anonKey: string } | null;
};

/**
 * Magic-link auth panel. Renders nothing interactive unless the server passed
 * an enabled public config. Sessions live in browser storage only; nothing is
 * cached by the service worker (auth/private routes are network-only).
 */
export function AuthPanel({ publicConfig }: Readonly<Props>) {
  const supabase = useMemo(
    () =>
      publicConfig
        ? createClient(publicConfig.url, publicConfig.anonKey, {
            auth: { autoRefreshToken: true, persistSession: true }
          })
        : null,
    [publicConfig]
  );

  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  if (!supabase) {
    return (
      <div className="flex items-start gap-2.5 rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] p-3">
        <ShieldAlert
          className="mt-0.5 size-4 shrink-0 text-[var(--cc-text-faint)]"
          aria-hidden="true"
        />
        <p className="text-[12px] leading-[1.5] text-[var(--cc-text-3)]">
          Sign-in is disabled. The auth shell activates only after Mohammed verifies row-level
          security and redirect URLs, then enables the private-tier flag.
        </p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="rounded-[var(--cc-r-card)] border border-[var(--cc-cyan-line)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--cc-cyan)]">
              Signed in
            </p>
            <p className="mt-1 truncate text-[13px] font-semibold text-[var(--cc-text)]">
              {session.user.email ?? session.user.id}
            </p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </Button>
        </div>
        <p className="mt-2 text-[11.5px] leading-[1.5] text-[var(--cc-text-3)]">
          Tier-2 content additionally requires a provisioned membership role — without one, RLS
          returns nothing by design.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]"
      onSubmit={async (event) => {
        event.preventDefault();
        if (!email.trim()) return;
        setPhase("sending");
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: { emailRedirectTo: `${window.location.origin}/private` }
        });
        setPhase(error ? "error" : "sent");
      }}
    >
      <label
        htmlFor="auth-email"
        className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--cc-text-faint)]"
      >
        Team sign-in · magic link
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="auth-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@pureadvance.sa"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 min-w-0 flex-1 rounded-[var(--cc-r-icon)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] px-3 text-[13px] text-[var(--cc-text)] outline-none placeholder:text-[var(--cc-text-dim)] focus:border-[var(--cc-cyan-line)]"
        />
        <Button type="submit" size="md" disabled={phase === "sending"}>
          <LogIn className="size-4" aria-hidden="true" />
          Send link
        </Button>
      </div>
      {phase === "sent" ? (
        <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[var(--cc-green)]">
          <MailCheck className="size-4" aria-hidden="true" />
          Check your inbox for the sign-in link.
        </p>
      ) : null}
      {phase === "error" ? (
        <p className="mt-2 text-[12px] text-[var(--cc-amber-text)]">
          Sign-in link could not be sent — verify auth settings and redirect URLs.
        </p>
      ) : null}
      <div className="mt-2">
        <Badge tone="amber">Enabled · not verified</Badge>
      </div>
    </form>
  );
}
