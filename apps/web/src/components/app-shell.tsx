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

import { ThemeToggle } from "./theme-toggle";

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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 rounded-[calc(var(--pa-radius-card)+6px)] border border-[color-mix(in_srgb,var(--pa-border)_72%,transparent)] bg-[color-mix(in_srgb,var(--pa-surface)_72%,transparent)] p-4 shadow-[var(--pa-shadow-card)] backdrop-blur sm:p-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Link href="/today" className="inline-flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-[var(--pa-radius-control)] border border-[color-mix(in_srgb,var(--pa-primary)_38%,var(--pa-border))] bg-[color-mix(in_srgb,var(--pa-primary)_10%,var(--pa-surface))] text-[var(--pa-primary)]">
              <ClipboardCheck className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-semibold tracking-[-0.03em] text-[var(--pa-foreground)] sm:text-xl">
                China 2026 Command Center
              </span>
              <span className="block text-sm font-medium text-[var(--pa-muted)]">
                Hong Kong / Shenzhen mission operations
              </span>
            </span>
          </Link>
        </div>
        <ThemeToggle />
        <nav
          aria-label="Primary"
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
        >
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
                className={cn(
                  "shrink-0",
                  isActive &&
                    "border-[var(--pa-primary)] text-[var(--pa-foreground)] shadow-[0_0_0_1px_color-mix(in_srgb,var(--pa-primary)_18%,transparent)]"
                )}
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
