import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, LayoutDashboard, Map, WifiOff } from "lucide-react";

import { Callout } from "@/components/command-kit";
import { PageHeader } from "@/components/page-header";

const cachedRoutes = [
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
        badgeTone="amber"
      />
      <Callout tone="warn" icon={WifiOff} title="Offline mode" className="mb-4">
        <p className="max-w-[60ch] text-[12px] leading-[1.55] text-[var(--cc-text-2)]">
          Pages you have visited are cached on this device. Notes stay local and are safe.
        </p>
      </Callout>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {cachedRoutes.map((route) => {
          const Icon = route.icon;

          return (
            <Link
              key={route.href}
              href={route.href}
              className="lift group flex items-center gap-3 rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)] hover:border-[var(--cc-border-strong)]"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-[var(--cc-r-icon)] bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-bold tracking-[-0.01em] text-[var(--cc-text)]">
                  {route.label}
                </p>
                <p className="mt-0.5 truncate text-[11.5px] text-[var(--cc-text-3)]">
                  {route.note}
                </p>
              </div>
              <ArrowRight
                className="size-4 shrink-0 text-[var(--cc-cyan)] transition-transform duration-[var(--cc-dur-fast)] ease-[var(--cc-ease)] group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
