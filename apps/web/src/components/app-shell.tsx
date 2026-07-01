"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  CalendarDays,
  ClipboardCheck,
  DatabaseZap,
  FileText,
  LayoutDashboard,
  Map,
  Users
} from "lucide-react";

import { Button, cn } from "@pure-advance/design-system";

const navItems = [
  { href: "/today", label: "Today", icon: LayoutDashboard },
  { href: "/itinerary", label: "Itinerary", icon: CalendarDays },
  { href: "/map", label: "Map", icon: Map },
  { href: "/business-targets", label: "Targets", icon: Building2 },
  { href: "/notes", label: "Notes", icon: FileText },
  { href: "/team", label: "Team", icon: Users },
  { href: "/admin/data-review", label: "Data Review", icon: DatabaseZap }
];

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link href="/today" className="inline-flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-[var(--pa-radius-control)] border border-[var(--pa-border)] bg-[var(--pa-surface)] text-[var(--pa-cyan)]">
              <ClipboardCheck className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xl font-semibold tracking-normal">
                China 2026 Command Center
              </span>
              <span className="block text-sm text-[var(--pa-muted)]">
                Hong Kong / Shenzhen mission operations
              </span>
            </span>
          </Link>
        </div>
        <nav aria-label="Primary" className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || (item.href !== "/today" && pathname.startsWith(item.href));

            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                className={cn(isActive && "border-[var(--pa-cyan)] text-[var(--pa-foreground)]")}
              >
                <Link href={item.href} aria-current={isActive ? "page" : undefined}>
                  <Icon className="size-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
