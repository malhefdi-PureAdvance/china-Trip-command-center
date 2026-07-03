"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  CalendarDays,
  ClipboardCheck,
  DatabaseZap,
  FileText,
  KeyRound,
  LayoutDashboard,
  Map,
  Users
} from "lucide-react";

import { Button, cn } from "@pure-advance/design-system";

import { ThemeToggle } from "./theme-toggle";

const primaryNavItems = [
  { href: "/today", label: "Today", icon: LayoutDashboard },
  { href: "/itinerary", label: "Itinerary", icon: CalendarDays },
  { href: "/map", label: "Map", icon: Map },
  { href: "/business-targets", label: "Targets", icon: Building2 },
  { href: "/notes", label: "Notes", icon: FileText }
];

const secondaryNavItems = [
  { href: "/team", label: "Team", icon: Users },
  { href: "/private", label: "Private", icon: KeyRound },
  { href: "/admin/data-review", label: "Data Review", icon: DatabaseZap }
];

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-[var(--cc-space-3)] px-[var(--cc-pad-screen)] py-[var(--cc-space-2)] md:gap-[var(--cc-space-5)] md:py-[var(--cc-space-4)]">
      <header className="flex flex-col gap-[var(--cc-space-2)] border-b border-[var(--cc-border-faint)] pb-[var(--cc-space-3)] md:gap-[var(--cc-space-4)] md:pb-[var(--cc-space-4)] lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-1 items-center justify-between gap-[var(--cc-gap)]">
          <Link href="/today" className="inline-flex min-w-0 items-center gap-[var(--cc-gap)]">
            <span className="grid size-8 shrink-0 place-items-center rounded-[var(--cc-r-icon)] bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)] sm:size-[34px]">
              <ClipboardCheck className="size-4 sm:size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[var(--cc-fs-title-sm)] font-[var(--cc-fw-x)] leading-tight tracking-[var(--cc-ls-title)] text-[var(--cc-text)] sm:hidden">
                China 2026
              </span>
              <span className="hidden truncate text-[var(--cc-fs-title)] font-[var(--cc-fw-x)] leading-tight tracking-[var(--cc-ls-title)] text-[var(--cc-text)] sm:block">
                China 2026 Command Center
              </span>
              <span className="mt-0.5 block truncate text-[10.5px] font-[var(--cc-fw-med)] text-[var(--cc-text-3)] sm:mt-1 sm:text-[var(--cc-fs-caption)]">
                <span className="sm:hidden">HK / Shenzhen ops</span>
                <span className="hidden sm:inline">Hong Kong / Shenzhen mission operations</span>
              </span>
            </span>
          </Link>
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
        <nav aria-label="Secondary" className="flex gap-1.5 md:hidden">
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href);

            return (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                size="sm"
                className={cn(
                  "cc-press min-h-10 flex-1 rounded-[10px] border-transparent px-2 font-mono text-[10px] uppercase tracking-[0.05em] text-[var(--cc-text-faint)]",
                  isActive &&
                    "border-transparent bg-[var(--cc-cyan-tint)] font-bold text-[var(--cc-cyan)]"
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
        <nav aria-label="Primary" className="hidden items-center gap-1.5 md:flex md:flex-wrap">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || (item.href !== "/today" && pathname.startsWith(item.href));

            return (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                size="sm"
                className={cn(
                  "cc-press shrink-0 border-transparent font-mono uppercase tracking-[0.06em]",
                  isActive &&
                    "border-transparent bg-[var(--cc-cyan-tint)] font-bold text-[var(--cc-cyan)]"
                )}
              >
                <Link href={item.href} aria-current={isActive ? "page" : undefined}>
                  <Icon className="size-4" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            );
          })}
          <span aria-hidden="true" className="mx-1 h-5 w-px shrink-0 bg-[var(--cc-border)]" />
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href);

            return (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                size="sm"
                className={cn(
                  "cc-press shrink-0 border-transparent px-2.5 font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--cc-text-faint)]",
                  isActive &&
                    "border-transparent bg-[var(--cc-cyan-tint)] font-bold text-[var(--cc-cyan)]"
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
      <main
        key={pathname}
        className="cc-route-enter pb-[calc(88px+env(safe-area-inset-bottom))] md:pb-0"
      >
        {children}
      </main>
      <nav
        aria-label="Primary"
        className="fixed inset-x-3 bottom-[calc(0.5rem+env(safe-area-inset-bottom))] z-50 grid grid-cols-5 gap-1 rounded-[20px] border border-[var(--cc-border)] bg-[color-mix(in_srgb,var(--cc-surface)_94%,transparent)] p-1 shadow-[0_16px_38px_rgba(0,0,0,0.24)] backdrop-blur md:hidden"
      >
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== "/today" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "cc-press flex min-h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-[15px] px-1 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.035em] text-[var(--cc-text-3)] transition-[background,color,transform] active:translate-y-px",
                isActive && "bg-[var(--cc-cyan)] text-[var(--cc-cyan-ink)]"
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
