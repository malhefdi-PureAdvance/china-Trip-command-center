import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  LayoutDashboard,
  Map,
  PlaneTakeoff,
  WifiOff
} from "lucide-react";

import { Callout, IconSquare } from "@/components/command-kit";
import { PageHeader } from "@/components/page-header";

const cachedRoutes = [
  {
    href: "/flight-pack",
    label: "Flight pack",
    note: "Offline readiness · app-safe briefing pack",
    icon: PlaneTakeoff
  },
  {
    href: "/today",
    label: "Today",
    note: "Mission clock · schedule focus",
    icon: LayoutDashboard
  },
  { href: "/itinerary", label: "Itinerary", note: "Full mission timeline", icon: CalendarDays },
  {
    href: "/business-targets",
    label: "Targets",
    note: "Visit dossiers you have opened",
    icon: Building2
  },
  { href: "/map", label: "Map", note: "Corridor intelligence", icon: Map }
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
      <Callout tone="warn" icon={WifiOff} eyebrow="Offline mode" className="mb-4">
        Pages you have visited are cached on this device. Notes stay local and are safe.
      </Callout>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {cachedRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="cc-lift group flex items-center gap-3 rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]"
          >
            <IconSquare icon={route.icon} />
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
                {route.label}
              </p>
              <p className="mt-0.5 truncate text-[11.5px] text-[var(--cc-text-3)]">{route.note}</p>
            </div>
            <ArrowRight
              className="size-4 shrink-0 text-[var(--cc-cyan)] transition-transform duration-[var(--cc-dur-fast)] group-hover:translate-x-0.5 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </>
  );
}
