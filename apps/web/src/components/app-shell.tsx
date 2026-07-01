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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--cc-space-5)] px-[var(--cc-pad-screen)] py-[var(--cc-space-4)]">
      <header className="flex flex-col gap-[var(--cc-space-4)] border-b border-[var(--cc-border-faint)] pb-[var(--cc-space-4)] lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-[var(--cc-gap)]">
          <Link href="/today" className="inline-flex min-w-0 items-center gap-[var(--cc-gap)]">
            <span className="grid size-[34px] shrink-0 place-items-center rounded-[var(--cc-r-icon)] bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]">
              <ClipboardCheck className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[var(--cc-fs-title-sm)] font-[var(--cc-fw-x)] leading-tight tracking-[var(--cc-ls-title)] text-[var(--cc-text)] sm:text-[var(--cc-fs-title)]">
                China 2026 Command Center
              </span>
              <span className="mt-1 block font-mono text-[var(--cc-fs-caption)] uppercase tracking-[0.1em] text-[var(--cc-text-faint)]">
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
                  "shrink-0 font-mono uppercase tracking-[0.06em]",
                  isActive && "border-[var(--cc-cyan-line)] text-[var(--cc-cyan)]"
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
