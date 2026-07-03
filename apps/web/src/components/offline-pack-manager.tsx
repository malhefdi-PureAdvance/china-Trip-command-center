"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  CloudOff,
  Download,
  PlaneTakeoff,
  RefreshCw,
  ShieldCheck,
  Trash2
} from "lucide-react";

import { Button, Card, CardContent, CardHeader, CardTitle, cn } from "@pure-advance/design-system";

import { Callout, Chip, type ChipTone } from "@/components/command-kit";
import {
  clearOfflinePack,
  getOfflinePackStatus,
  installOfflinePack,
  verifyOfflineReadiness,
  type OfflinePackStatus,
  type OfflineReadinessReport
} from "@/lib/offline-pack/install";
import type { OfflineReadinessItem } from "@/lib/offline-pack/schema";
import { shortDate } from "@/lib/mission-timeline";

const statusChip: Record<OfflinePackStatus["state"], { tone: ChipTone; label: string }> = {
  installed: { tone: "green", label: "Installed" },
  stale: { tone: "amber", label: "Stale" },
  "not-installed": { tone: "neutral", label: "Not installed" },
  error: { tone: "amber", label: "Error" },
  unsupported: { tone: "neutral", label: "Unsupported" }
};

function formatTimestamp(iso: string | undefined): string | null {
  if (!iso) return null;
  try {
    const date = new Date(iso);
    const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    return `${shortDate(iso.slice(0, 10))} · ${time}`;
  } catch {
    return null;
  }
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

type ItemState = { tone: ChipTone; label: string };

function readinessItemState(
  item: OfflineReadinessItem,
  status: OfflinePackStatus | null,
  report: OfflineReadinessReport | null
): ItemState {
  if (item.status === "network-only") return { tone: "amber", label: "Network required" };

  const packInstalled = status?.state === "installed" || status?.state === "stale";

  if (item.id === "pack-data") {
    if (status?.state === "installed") return { tone: "green", label: "Installed" };
    if (status?.state === "stale") return { tone: "amber", label: "Stale — update" };
    return { tone: "neutral", label: "Not installed" };
  }
  if (item.id === "search-index") {
    return packInstalled && status?.documentCount
      ? { tone: "green", label: `${status.documentCount} documents` }
      : { tone: "neutral", label: "Installs with pack" };
  }
  if (item.id === "notes-local") {
    return { tone: "green", label: "Ready" };
  }
  if (item.id === "app-shell") {
    return report?.serviceWorkerActive
      ? { tone: "green", label: "Worker active" }
      : { tone: "neutral", label: "Installed app only" };
  }

  // Route items resolve from Cache Storage when the worker is active.
  if (item.href && report?.supported && report.serviceWorkerActive) {
    const check = report.routes.find((route) => route.route === item.href);
    if (check) {
      return check.cached
        ? { tone: "green", label: "Cached" }
        : { tone: "amber", label: "Not cached yet" };
    }
  }
  return report?.serviceWorkerActive
    ? { tone: "neutral", label: "Pending check" }
    : { tone: "neutral", label: "Installed app only" };
}

export function OfflinePackManager({
  readiness,
  verifyRoutes,
  packVersion
}: Readonly<{
  readiness: OfflineReadinessItem[];
  verifyRoutes: string[];
  packVersion: string;
}>) {
  const [status, setStatus] = useState<OfflinePackStatus | null>(null);
  const [report, setReport] = useState<OfflineReadinessReport | null>(null);
  const [storage, setStorage] = useState<{ usage: number; quota: number } | null>(null);
  const [busy, setBusy] = useState<"install" | "verify" | "clear" | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const [nextStatus, nextReport] = await Promise.all([
      getOfflinePackStatus(),
      verifyOfflineReadiness(verifyRoutes)
    ]);
    setStatus(nextStatus);
    setReport(nextReport);
    try {
      const estimate = await navigator.storage?.estimate?.();
      if (estimate?.usage !== undefined && estimate?.quota !== undefined) {
        setStorage({ usage: estimate.usage, quota: estimate.quota });
      }
    } catch {
      // Storage estimate is best-effort.
    }
  }, [verifyRoutes]);

  useEffect(() => {
    // Defer the first status read one tick so state updates are provably
    // asynchronous relative to the effect (and cancellable on unmount).
    let disposed = false;
    const timer = window.setTimeout(() => {
      if (!disposed) void refresh();
    }, 0);
    return () => {
      disposed = true;
      window.clearTimeout(timer);
    };
  }, [refresh]);

  async function handleInstall() {
    setBusy("install");
    setNotice(null);
    const result = await installOfflinePack();
    setStatus(result.status);
    if (result.ok) {
      setNotice(
        `Flight pack installed — ${result.status.documentCount ?? 0} documents, v${result.status.packVersion ?? packVersion}.`
      );
    }
    await refresh().catch(() => undefined);
    if (result.ok) {
      setStatus(result.status);
    }
    setBusy(null);
  }

  async function handleVerify() {
    setBusy("verify");
    setNotice(null);
    await refresh();
    setBusy(null);
  }

  async function handleClear() {
    setBusy("clear");
    setNotice(null);
    try {
      await clearOfflinePack();
      setNotice("Offline pack cleared. Local notes are untouched.");
    } catch {
      setNotice("Could not clear the pack — close other app tabs and try again.");
    }
    await refresh();
    setBusy(null);
  }

  const chip = status ? statusChip[status.state] : null;
  const installed = status?.state === "installed" || status?.state === "stale";
  const installedAt = formatTimestamp(status?.installedAt);
  const generatedAt = formatTimestamp(status?.generatedAt);

  return (
    <div className="space-y-4">
      <Card className="min-w-0">
        <CardHeader className="flex items-center justify-between gap-3">
          <CardTitle>Flight pack status</CardTitle>
          {chip ? <Chip tone={chip.tone}>{chip.label}</Chip> : <Chip tone="ghost">Checking…</Chip>}
        </CardHeader>
        <CardContent>
          <p className="text-[13px] leading-[1.5] text-[var(--cc-text-2)]" aria-live="polite">
            {status?.state === "installed" ? (
              <>Flight pack installed — briefing, targets, and search data are on this device.</>
            ) : status?.state === "stale" ? (
              <>Flight pack installed but stale — update it while you still have a connection.</>
            ) : status?.state === "unsupported" ? (
              <>This browser cannot store the pack. Use the installed app or a modern browser.</>
            ) : status?.state === "error" ? (
              <>{status.message ?? "Something went wrong reading offline storage."}</>
            ) : (
              <>
                Pack not installed yet. Prepare before takeoff so the briefing and mission data fly
                with you.
              </>
            )}
          </p>

          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5">
            {installed && status?.packVersion ? (
              <div>
                <dt className="cc-eyebrow-faint">Pack version</dt>
                <dd className="mt-0.5 font-mono text-[12.5px] font-semibold text-[var(--cc-text)]">
                  v{status.packVersion}
                </dd>
              </div>
            ) : null}
            {installedAt ? (
              <div>
                <dt className="cc-eyebrow-faint">Installed</dt>
                <dd className="mt-0.5 font-mono text-[12.5px] font-semibold text-[var(--cc-text)]">
                  {installedAt}
                </dd>
              </div>
            ) : null}
            {generatedAt ? (
              <div>
                <dt className="cc-eyebrow-faint">Data generated</dt>
                <dd className="mt-0.5 font-mono text-[12.5px] font-semibold text-[var(--cc-text)]">
                  {generatedAt}
                </dd>
              </div>
            ) : null}
            {storage ? (
              <div>
                <dt className="cc-eyebrow-faint">Device storage</dt>
                <dd className="mt-0.5 font-mono text-[12.5px] font-semibold text-[var(--cc-text)]">
                  {formatBytes(storage.usage)} of {formatBytes(storage.quota)}
                </dd>
              </div>
            ) : null}
          </dl>

          {notice ? (
            <p
              className="mt-3 flex items-start gap-1.5 text-[12.5px] leading-[1.5] text-[var(--cc-green)]"
              role="status"
            >
              <CheckCircle2 className="mt-[2px] size-3.5 shrink-0" aria-hidden="true" />
              {notice}
            </p>
          ) : null}
          {status?.state === "error" && status.message && !notice ? (
            <Callout tone="warn" icon={CloudOff} eyebrow="Install problem" className="mt-3">
              {status.message}
            </Callout>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              disabled={busy !== null || status?.state === "unsupported"}
              onClick={() => void handleInstall()}
            >
              {busy === "install" ? (
                <RefreshCw className="size-4 animate-spin" aria-hidden="true" />
              ) : installed ? (
                <Download className="size-4" aria-hidden="true" />
              ) : (
                <PlaneTakeoff className="size-4" aria-hidden="true" />
              )}
              {installed ? "Update flight pack" : "Prepare for flight"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={busy !== null}
              onClick={() => void handleVerify()}
            >
              {busy === "verify" ? (
                <RefreshCw className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <ShieldCheck className="size-4" aria-hidden="true" />
              )}
              Verify offline readiness
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={busy !== null || !installed}
              onClick={() => void handleClear()}
            >
              <Trash2 className="size-4" aria-hidden="true" />
              Clear offline pack
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader className="flex items-center justify-between gap-3">
          <CardTitle>Offline readiness checklist</CardTitle>
        </CardHeader>
        <CardContent>
          {!report?.serviceWorkerActive ? (
            <p className="mb-3 text-[12px] leading-[1.5] text-[var(--cc-text-3)]">
              Route caching activates in the installed production app (PWA). Pack data and local
              notes work everywhere.
            </p>
          ) : null}
          <ul className="divide-y divide-[var(--cc-border-faint)]">
            {readiness.map((item) => {
              const state = readinessItemState(item, status, report);
              return (
                <li
                  key={item.id}
                  className="flex min-w-0 items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold leading-[1.35] text-[var(--cc-text)]">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[11.5px] leading-[1.45] text-[var(--cc-text-3)]">
                      {item.description}
                    </p>
                  </div>
                  <Chip tone={state.tone} className={cn("shrink-0")}>
                    {state.label}
                  </Chip>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <Callout tone="quiet" icon={ShieldCheck} eyebrow="Offline is not private">
        The pack holds app-safe mission data only — it is device-local but copyable and exportable.
        Booking references, IDs, payment data, and private contacts never enter the pack; keep them
        in Wallet or your password manager.
      </Callout>
    </div>
  );
}
