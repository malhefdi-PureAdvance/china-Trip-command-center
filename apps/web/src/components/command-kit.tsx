import { ArrowUpRight, Check, CircleHelp, Globe, TriangleAlert } from "lucide-react";
import type { MapPin } from "lucide-react";

import { cn } from "@pure-advance/design-system";

/**
 * Command-kit: the app's shared presentation vocabulary, ported from the
 * Pure Advance command-center handoff patterns (cc-chip, cc-banner, cc-isq,
 * cc-checkrow). Purely presentational — no data logic, no client state.
 */

type IconType = typeof MapPin;

/* ---------- Metadata chip (cc-chip) ---------- */

export type ChipTone = "neutral" | "soft" | "cyan" | "cyanTint" | "green" | "amber" | "purple";

const chipToneClass: Record<ChipTone, string> = {
  neutral: "border-[var(--cc-border-strong)] bg-transparent text-[var(--cc-text-3)]",
  soft: "border-[var(--cc-border)] bg-[var(--cc-surface-inset)] text-[var(--cc-text-2)]",
  cyan: "border-[var(--cc-cyan)] bg-[var(--cc-cyan)] font-semibold text-[var(--cc-cyan-ink)]",
  cyanTint: "border-[var(--cc-cyan-line-soft)] bg-[var(--cc-cyan-tint-2)] text-[var(--cc-cyan)]",
  green: "border-transparent bg-[var(--cc-green-tint)] text-[var(--cc-green)]",
  amber: "border-[var(--cc-amber-line)] bg-[var(--cc-amber-tint)] text-[var(--cc-amber-text)]",
  purple: "border-[var(--cc-purple-line)] bg-[var(--cc-purple-tint)] text-[var(--cc-purple-soft)]"
};

/** Bridge for view models that still speak Badge tones. */
export const chipToneFromBadge: Record<"neutral" | "cyan" | "green" | "amber" | "coral", ChipTone> =
  {
    neutral: "neutral",
    cyan: "cyanTint",
    green: "green",
    amber: "amber",
    coral: "amber"
  };

export function Chip({
  tone = "neutral",
  icon: Icon,
  className,
  children,
  ...props
}: Readonly<
  React.HTMLAttributes<HTMLSpanElement> & {
    tone?: ChipTone;
    icon?: IconType;
  }
>) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1 rounded-[var(--cc-r-chip)] border px-[8px] py-[4px] font-mono text-[9.5px] uppercase leading-none tracking-[0.07em]",
        chipToneClass[tone],
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="size-3 shrink-0" aria-hidden="true" /> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}

/* ---------- Section heading (mono eyebrow + hairline rule) ---------- */

const sectionToneClass: Record<"cyan" | "purple" | "amber" | "neutral", string> = {
  cyan: "text-[var(--cc-cyan)]",
  purple: "text-[var(--cc-purple)]",
  amber: "text-[var(--cc-amber-text)]",
  neutral: "text-[var(--cc-text-3)]"
};

export function SectionHeading({
  icon: Icon,
  title,
  tone = "cyan",
  trailing,
  className
}: Readonly<{
  icon?: IconType;
  title: React.ReactNode;
  tone?: keyof typeof sectionToneClass;
  trailing?: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={cn("mb-2 flex min-w-0 items-center gap-2.5", className)}>
      {Icon ? (
        <Icon className={cn("size-4 shrink-0", sectionToneClass[tone])} aria-hidden="true" />
      ) : null}
      <span
        className={cn(
          "shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.12em]",
          sectionToneClass[tone]
        )}
      >
        {title}
      </span>
      <span className="h-px min-w-3 flex-1 bg-[var(--cc-border)]" aria-hidden="true" />
      {trailing ? (
        <span className="flex min-w-0 shrink-0 items-center gap-1.5">{trailing}</span>
      ) : null}
    </div>
  );
}

/* ---------- Callout panel (cc-banner) ---------- */

export type CalloutTone = "action" | "info" | "warn" | "brand" | "go" | "quiet";

const calloutToneClass: Record<CalloutTone, { panel: string; eyebrow: string; rail: string }> = {
  action: {
    panel: "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] shadow-[var(--cc-elev-1)]",
    eyebrow: "text-[var(--cc-cyan)]",
    rail: "bg-[var(--cc-cyan)]"
  },
  info: {
    panel: "border-[var(--cc-cyan-line-soft)] bg-[var(--cc-cyan-tint-2)]",
    eyebrow: "text-[var(--cc-cyan)]",
    rail: "bg-[var(--cc-cyan)]"
  },
  warn: {
    panel: "border-[var(--cc-amber-line)] bg-[var(--cc-amber-tint)]",
    eyebrow: "text-[var(--cc-amber-text)]",
    rail: "bg-[var(--cc-amber)]"
  },
  brand: {
    panel: "border-[var(--cc-purple-line)] bg-[var(--cc-purple-tint)]",
    eyebrow: "text-[var(--cc-purple-soft)]",
    rail: "bg-[var(--cc-purple)]"
  },
  go: {
    panel: "border-transparent bg-[var(--cc-green-tint)]",
    eyebrow: "text-[var(--cc-green)]",
    rail: "bg-[var(--cc-green)]"
  },
  quiet: {
    panel: "border-[var(--cc-border)] bg-[var(--cc-surface-inset)]",
    eyebrow: "text-[var(--cc-text-3)]",
    rail: "bg-[var(--cc-rail)]"
  }
};

export function Callout({
  tone = "info",
  icon: Icon,
  eyebrow,
  rail = false,
  className,
  children,
  ...props
}: Readonly<
  React.HTMLAttributes<HTMLDivElement> & {
    tone?: CalloutTone;
    icon?: IconType;
    eyebrow?: React.ReactNode;
    rail?: boolean;
  }
>) {
  const styles = calloutToneClass[tone];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--cc-r-card)] border p-3",
        styles.panel,
        rail && "pl-[15px]",
        className
      )}
      {...props}
    >
      {rail ? (
        <span className={cn("absolute inset-y-0 left-0 w-[3px]", styles.rail)} aria-hidden="true" />
      ) : null}
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em]",
            styles.eyebrow
          )}
        >
          {Icon ? <Icon className="size-3.5 shrink-0" aria-hidden="true" /> : null}
          {eyebrow}
        </p>
      ) : null}
      <div
        className={cn("text-[12.5px] leading-[1.55] text-[var(--cc-text-2)]", eyebrow && "mt-2")}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- Key/value fact grid ---------- */

export type KeyFact = {
  label: string;
  value: React.ReactNode;
  icon?: IconType;
  span?: boolean;
};

export function KeyFacts({
  items,
  className
}: Readonly<{ items: (KeyFact | null | false)[]; className?: string }>) {
  const facts = items.filter((item): item is KeyFact => Boolean(item));

  return (
    <dl className={cn("grid grid-cols-2 gap-x-3 gap-y-3", className)}>
      {facts.map((fact) => (
        <div key={fact.label} className={cn("min-w-0", fact.span && "col-span-2")}>
          <dt className="flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--cc-text-faint)]">
            {fact.icon ? (
              <fact.icon className="size-3 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
            ) : null}
            {fact.label}
          </dt>
          <dd className="mt-1 text-[12.5px] font-semibold leading-[1.4] text-[var(--cc-text)]">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Fit gauge (segmented instrument meter) ---------- */

export function FitGauge({ score, className }: Readonly<{ score: number; className?: string }>) {
  const filled = Math.max(0, Math.min(5, Math.round(score / 20)));

  return (
    <span
      role="img"
      aria-label={`Fit score ${score} of 100`}
      className={cn("inline-flex shrink-0 items-center gap-1.5", className)}
    >
      <span className="flex gap-[3px]" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-[6.5px] w-[10px] rounded-[2px]",
              index < filled ? "bg-[var(--cc-cyan)]" : "bg-[var(--cc-border-strong)]"
            )}
          />
        ))}
      </span>
      <span className="font-mono text-[10.5px] font-semibold leading-none text-[var(--cc-cyan)]">
        {score}
      </span>
    </span>
  );
}

/* ---------- External link treatments ---------- */

export function describeExternalUrl(url: string): { domain: string; path: string | null } {
  try {
    const parsed = new URL(url);
    const domain = parsed.hostname.replace(/^www\./u, "");
    const path = parsed.pathname.replace(/\/$/u, "");
    return { domain, path: path && path !== "" ? path : null };
  } catch {
    return { domain: url, path: null };
  }
}

export function ExternalLinkCard({
  href,
  label,
  className
}: Readonly<{ href: string; label?: string; className?: string }>) {
  const { domain, path } = describeExternalUrl(href);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "cc-lift group flex min-h-11 w-full min-w-0 max-w-full items-center gap-2.5 overflow-hidden rounded-[var(--cc-r-tile)] border border-[var(--cc-border)] bg-[var(--cc-surface)] px-3 py-2 shadow-[var(--cc-elev-1)]",
        className
      )}
    >
      <span
        className="grid size-7 shrink-0 place-items-center rounded-[8px] bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]"
        aria-hidden="true"
      >
        <Globe className="size-3.5" />
      </span>
      <span className="min-w-0 flex-1 basis-0">
        <span className="block truncate text-[12.5px] font-semibold leading-tight text-[var(--cc-text)]">
          {label ?? domain}
        </span>
        <span className="mt-0.5 block truncate font-mono text-[10px] text-[var(--cc-text-faint)]">
          {label ? domain : null}
          {label && path ? " · " : null}
          {path}
          {!label && !path ? "public source" : null}
        </span>
      </span>
      <ArrowUpRight
        className="cc-ext-arrow size-4 shrink-0 text-[var(--cc-cyan)]"
        aria-hidden="true"
      />
    </a>
  );
}

export function ExternalChip({
  href,
  icon: Icon = Globe,
  children,
  className
}: Readonly<{
  href: string;
  icon?: IconType;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "cc-lift group inline-flex min-h-9 items-center gap-1.5 rounded-[var(--cc-r-icon)] border border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] px-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.05em] text-[var(--cc-cyan)]",
        className
      )}
    >
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
      <ArrowUpRight className="cc-ext-arrow size-3.5 shrink-0" aria-hidden="true" />
    </a>
  );
}

/* ---------- Marker list (semantic bullets) ---------- */

export type MarkerKind = "point" | "tick" | "question" | "risk";

const markerMeta: Record<Exclude<MarkerKind, "point">, { icon: IconType; className: string }> = {
  tick: { icon: Check, className: "text-[var(--cc-green)]" },
  question: { icon: CircleHelp, className: "text-[var(--cc-cyan)]" },
  risk: { icon: TriangleAlert, className: "text-[var(--cc-amber-text)]" }
};

export function MarkerList({
  items,
  marker = "point",
  className
}: Readonly<{ items: string[]; marker?: MarkerKind; className?: string }>) {
  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-2.5 rounded-[var(--cc-r-tile)] border border-[var(--cc-border-faint)] bg-[var(--cc-surface)] px-3 py-2.5 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
        >
          {marker === "point" ? (
            <span
              className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[var(--cc-cyan)]"
              aria-hidden="true"
            />
          ) : (
            (() => {
              const meta = markerMeta[marker];
              const Icon = meta.icon;
              return (
                <Icon
                  className={cn("mt-[2px] size-4 shrink-0", meta.className)}
                  aria-hidden="true"
                />
              );
            })()
          )}
          <span className="min-w-0 text-[13.5px] leading-[1.5] text-[var(--cc-text-2)]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Icon square (cc-isq) ---------- */

const iconSquareToneClass: Record<"cyan" | "green" | "amber" | "purple" | "neutral", string> = {
  cyan: "bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]",
  green: "bg-[var(--cc-green-tint)] text-[var(--cc-green)]",
  amber: "bg-[var(--cc-amber-tint)] text-[var(--cc-amber-text)]",
  purple: "bg-[var(--cc-purple-tint)] text-[var(--cc-purple-soft)]",
  neutral: "bg-[var(--cc-surface-raised)] text-[var(--cc-text-3)]"
};

export function IconSquare({
  icon: Icon,
  tone = "cyan",
  size = "md",
  className
}: Readonly<{
  icon: IconType;
  tone?: keyof typeof iconSquareToneClass;
  size?: "sm" | "md";
  className?: string;
}>) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-[var(--cc-r-icon)]",
        size === "md" ? "size-[34px]" : "size-7 rounded-[8px]",
        iconSquareToneClass[tone],
        className
      )}
      aria-hidden="true"
    >
      <Icon className={size === "md" ? "size-4" : "size-3.5"} />
    </span>
  );
}

/* ---------- Empty state ---------- */

export function EmptyState({
  icon,
  title,
  body,
  action,
  className
}: Readonly<{
  icon: IconType;
  title: string;
  body?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "rounded-[var(--cc-r-card)] border border-dashed border-[var(--cc-border-strong)] bg-[var(--cc-surface-inset)] px-4 py-6 text-center",
        className
      )}
    >
      <IconSquare icon={icon} tone="neutral" className="mx-auto" />
      <p className="mt-2.5 text-[13px] font-semibold text-[var(--cc-text)]">{title}</p>
      {body ? (
        <p className="mx-auto mt-1 max-w-sm text-[12px] leading-[1.5] text-[var(--cc-text-3)]">
          {body}
        </p>
      ) : null}
      {action ? <div className="mt-3 flex justify-center">{action}</div> : null}
    </div>
  );
}

/* ---------- Stat tile (instrument numeral) ---------- */

export function StatTile({
  value,
  label,
  tone = "cyan",
  className
}: Readonly<{
  value: React.ReactNode;
  label: string;
  tone?: "cyan" | "neutral";
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-[var(--cc-r-tile)] border border-[var(--cc-border)] bg-[var(--cc-surface)] p-3 shadow-[var(--cc-elev-1)]",
        className
      )}
    >
      <p
        className={cn(
          "font-mono text-[20px] font-semibold leading-none tracking-[-0.01em]",
          tone === "cyan" ? "text-[var(--cc-cyan)]" : "text-[var(--cc-text)]"
        )}
      >
        {value}
      </p>
      <p className="mt-1.5 text-[10.5px] leading-tight text-[var(--cc-text-3)]">{label}</p>
    </div>
  );
}
