import { ArrowUpRight, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@pure-advance/design-system";

/**
 * Command-kit: the shared reading/inspect primitives of the command center.
 * Everything is built on the cc-* tokens (mono for data, cyan = act now,
 * amber = caution, purple = brand/finale, green = go) so dossiers, the
 * cockpit, and operate surfaces stay one visual system.
 */

export type ChipTone = "neutral" | "faint" | "cyan" | "cyanSolid" | "green" | "amber" | "purple";

const chipToneClass: Record<ChipTone, string> = {
  neutral: "border-[var(--cc-border-strong)] bg-transparent text-[var(--cc-text-3)]",
  faint: "border-[var(--cc-border)] bg-[var(--cc-surface-inset)] text-[var(--cc-text-faint)]",
  cyan: "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]",
  cyanSolid: "border-[var(--cc-cyan)] bg-[var(--cc-cyan)] text-[var(--cc-cyan-ink)]",
  green: "border-transparent bg-[var(--cc-green-tint)] text-[var(--cc-green)]",
  amber: "border-[var(--cc-amber-line)] bg-[var(--cc-amber-tint)] text-[var(--cc-amber-text)]",
  purple: "border-[var(--cc-purple-line)] bg-[var(--cc-purple-tint)] text-[var(--cc-purple-soft)]"
};

/** Small mono metadata chip — category, city, window, fit, source state. */
export function MetaChip({
  tone = "neutral",
  icon: Icon,
  className,
  children
}: Readonly<{
  tone?: ChipTone;
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <span
      className={cn(
        "inline-flex min-h-[22px] max-w-full items-center gap-1 rounded-[var(--cc-r-chip)] border px-[7px] py-1 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.05em]",
        chipToneClass[tone],
        className
      )}
    >
      {Icon ? <Icon className="size-3 shrink-0" aria-hidden="true" /> : null}
      <span className="min-w-0 truncate">{children}</span>
    </span>
  );
}

/** Mono section label with hairline rule — the section voice of the app. */
export function SectionLabel({
  icon: Icon,
  label,
  meta,
  tone = "cyan",
  as: Tag = "h2",
  id,
  className
}: Readonly<{
  icon?: LucideIcon;
  label: string;
  meta?: React.ReactNode;
  tone?: "cyan" | "purple" | "muted";
  as?: "h2" | "h3" | "span";
  id?: string;
  className?: string;
}>) {
  const toneClass =
    tone === "purple"
      ? "text-[var(--cc-purple-soft)]"
      : tone === "muted"
        ? "text-[var(--cc-text-faint)]"
        : "text-[var(--cc-cyan)]";

  return (
    <div className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <Tag
        id={id}
        className={cn(
          "flex shrink-0 items-center gap-2 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.14em]",
          toneClass
        )}
      >
        {Icon ? <Icon className="size-3.5 shrink-0" aria-hidden="true" /> : null}
        {label}
      </Tag>
      <span className="h-px min-w-4 flex-1 bg-[var(--cc-border)]" aria-hidden="true" />
      {meta ? <span className="flex shrink-0 items-center gap-1.5">{meta}</span> : null}
    </div>
  );
}

export type CalloutTone = "info" | "brand" | "warn" | "go" | "neutral";

const calloutToneClass: Record<CalloutTone, { box: string; title: string; rail: string }> = {
  info: {
    box: "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)]",
    title: "text-[var(--cc-cyan)]",
    rail: "bg-[var(--cc-cyan)]"
  },
  brand: {
    box: "border-[var(--cc-purple-line)] bg-[var(--cc-purple-tint)]",
    title: "text-[var(--cc-purple-soft)]",
    rail: "bg-[var(--cc-purple)]"
  },
  warn: {
    box: "border-[var(--cc-amber-line)] bg-[var(--cc-amber-tint)]",
    title: "text-[var(--cc-amber-text)]",
    rail: "bg-[var(--cc-amber)]"
  },
  go: {
    box: "border-transparent bg-[var(--cc-green-tint)]",
    title: "text-[var(--cc-green)]",
    rail: "bg-[var(--cc-green)]"
  },
  neutral: {
    box: "border-[var(--cc-border)] bg-[var(--cc-surface-inset)]",
    title: "text-[var(--cc-text-faint)]",
    rail: "bg-[var(--cc-border-strong)]"
  }
};

/** Tinted callout panel — why-now, fit, risks, privacy boundaries. */
export function Callout({
  tone = "info",
  icon: Icon,
  title,
  meta,
  rail = false,
  className,
  children
}: Readonly<{
  tone?: CalloutTone;
  icon?: LucideIcon;
  title?: string;
  meta?: React.ReactNode;
  rail?: boolean;
  className?: string;
  children: React.ReactNode;
}>) {
  const tones = calloutToneClass[tone];

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[var(--cc-r-card)] border p-3.5",
        tones.box,
        rail && "pl-4",
        className
      )}
    >
      {rail ? (
        <span className={cn("absolute inset-y-0 left-0 w-[3px]", tones.rail)} aria-hidden="true" />
      ) : null}
      {title ? (
        <p
          className={cn(
            "flex items-center gap-2 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.14em]",
            tones.title
          )}
        >
          {Icon ? <Icon className="size-3.5 shrink-0" aria-hidden="true" /> : null}
          <span className="min-w-0 flex-1">{title}</span>
          {meta}
        </p>
      ) : null}
      <div className={cn(title && "mt-2")}>{children}</div>
    </section>
  );
}

export type KeyFact = {
  label: string;
  value: React.ReactNode;
  tone?: "default" | "cyan" | "amber" | "green";
  mono?: boolean;
};

const factToneClass: Record<NonNullable<KeyFact["tone"]>, string> = {
  default: "text-[var(--cc-text)]",
  cyan: "text-[var(--cc-cyan)]",
  amber: "text-[var(--cc-amber-text)]",
  green: "text-[var(--cc-green)]"
};

/** Key-value fact grid — replaces metadata prose with an instrument readout. */
export function KeyFacts({
  facts,
  columns = 2,
  className
}: Readonly<{ facts: KeyFact[]; columns?: 2 | 3 | 4; className?: string }>) {
  const colsClass =
    columns === 4 ? "sm:grid-cols-4" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <dl className={cn("grid grid-cols-2 gap-x-3 gap-y-3", colsClass, className)}>
      {facts.map((fact) => (
        <div key={fact.label} className="min-w-0">
          <dt className="font-mono text-[9px] uppercase leading-none tracking-[0.12em] text-[var(--cc-text-faint)]">
            {fact.label}
          </dt>
          <dd
            className={cn(
              "mt-1.5 text-[12.5px] font-semibold leading-[1.35]",
              fact.mono && "font-mono text-[12px] font-medium tracking-[0.01em]",
              factToneClass[fact.tone ?? "default"]
            )}
          >
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function pathHintOf(url: string): string | null {
  try {
    const { pathname } = new URL(url);
    if (!pathname || pathname === "/") return null;
    const trimmed = pathname.replace(/\/$/, "");
    return trimmed.length > 42 ? `${trimmed.slice(0, 41)}…` : trimmed;
  } catch {
    return null;
  }
}

/**
 * External-link card — a link that looks like an action, not plaintext.
 * Shows the destination domain so every source is attributable at a glance.
 */
export function LinkOut({
  href,
  label,
  hint,
  icon: Icon = Globe,
  className
}: Readonly<{
  href: string;
  label?: string;
  hint?: string;
  icon?: LucideIcon;
  className?: string;
}>) {
  const domain = hostnameOf(href);
  const sub = hint ?? pathHintOf(href) ?? "external link";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "lift group flex min-h-12 min-w-0 items-center gap-2.5 rounded-[var(--cc-r-tile)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-2.5 shadow-[var(--cc-elev-1)] hover:border-[var(--cc-cyan-line)]",
        className
      )}
    >
      <span
        className="grid size-8 shrink-0 place-items-center rounded-[var(--cc-r-icon)] bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]"
        aria-hidden="true"
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] font-semibold leading-tight text-[var(--cc-text)]">
          {label ?? domain}
        </span>
        <span className="mt-0.5 block truncate font-mono text-[10px] leading-none text-[var(--cc-text-faint)]">
          {label ? domain : sub}
        </span>
      </span>
      <ArrowUpRight
        className="size-4 shrink-0 text-[var(--cc-text-dim)] transition-transform duration-[var(--cc-dur-fast)] ease-[var(--cc-ease)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--cc-cyan)] motion-reduce:transition-none"
        aria-hidden="true"
      />
    </a>
  );
}

/** Designed empty state — never a bare sentence. */
export function EmptyState({
  icon: Icon,
  title,
  hint,
  children,
  className
}: Readonly<{
  icon: LucideIcon;
  title: string;
  hint?: string;
  children?: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "rounded-[var(--cc-r-card)] border border-dashed border-[var(--cc-border-strong)] bg-[var(--cc-surface-inset)] px-4 py-6 text-center",
        className
      )}
    >
      <span
        className="mx-auto grid size-9 place-items-center rounded-[var(--cc-r-icon)] bg-[var(--cc-surface-raised)] text-[var(--cc-text-3)]"
        aria-hidden="true"
      >
        <Icon className="size-4.5" />
      </span>
      <p className="mt-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--cc-text-3)]">
        {title}
      </p>
      {hint ? (
        <p className="mx-auto mt-1.5 max-w-[38ch] text-[12px] leading-[1.5] text-[var(--cc-text-faint)]">
          {hint}
        </p>
      ) : null}
      {children ? <div className="mt-3 flex justify-center">{children}</div> : null}
    </div>
  );
}
