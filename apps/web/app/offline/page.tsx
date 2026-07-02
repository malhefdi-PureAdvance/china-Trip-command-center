import Link from "next/link";
import { ArrowRight, WifiOff } from "lucide-react";

import { PageHeader } from "@/components/page-header";

const cachedRoutes = [
  { href: "/today", label: "Today", note: "Mission clock · schedule focus" },
  { href: "/itinerary", label: "Itinerary", note: "Full mission timeline" },
  { href: "/business-targets", label: "Targets", note: "Visit dossiers you have opened" },
  { href: "/map", label: "Map", note: "Corridor intelligence" }
];

export default function OfflinePage() {
  return (
    <>
      <PageHeader
        eyebrow="Offline"
        title="No connection"
        summary="You are offline — likely mid-crossing between Hong Kong and Shenzhen. Cached mission pages below still work; live status needs a connection."
        badge="Cached shell"
      />
      <div className="mb-4 flex items-center gap-2 rounded-[var(--cc-r-card)] border border-[var(--cc-amber-line)] bg-[var(--cc-amber-tint)] p-3 text-[12px] text-[var(--cc-amber-text)]">
        <WifiOff className="size-4 shrink-0" aria-hidden="true" />
        Pages you have visited are cached on this device. Notes stay local and are safe.
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {cachedRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="flex items-center gap-3 rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)] active:translate-y-px"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-semibold text-[var(--cc-text)]">{route.label}</p>
              <p className="mt-0.5 truncate text-[11.5px] text-[var(--cc-text-3)]">{route.note}</p>
            </div>
            <ArrowRight className="size-4 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </>
  );
}
