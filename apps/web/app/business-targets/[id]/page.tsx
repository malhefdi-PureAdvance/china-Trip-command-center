import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  CircleHelp,
  Globe,
  Lightbulb,
  Lock,
  MapPin,
  MessagesSquare,
  NotebookPen,
  Route,
  Target,
  TriangleAlert
} from "lucide-react";

import { cn } from "@pure-advance/design-system";
import type { BusinessTargetDossier } from "@pure-advance/domain";

import {
  Callout,
  KeyFacts,
  LinkOut,
  MetaChip,
  SectionLabel,
  type ChipTone,
  type KeyFact
} from "@/components/command-kit";
import { categoryIcons } from "@/components/target-card";
import { getCurrentMissionNow } from "@/lib/clock";
import { buildMissionOps, relevanceForTarget } from "@/lib/mission-ops";
import {
  businessTargets,
  categoryMeta,
  getTargetById,
  priorityMeta,
  visitWindowHint
} from "@/lib/targets";

export function generateStaticParams() {
  return businessTargets.map((target) => ({ id: target.id }));
}

export const dynamic = "force-dynamic";

const priorityChipTone: Record<string, ChipTone> = {
  cyan: "cyanSolid",
  green: "green",
  amber: "amber",
  neutral: "neutral"
};

const confidenceTone: Record<
  BusinessTargetDossier["confidence"],
  { fact: KeyFact["tone"]; label: string }
> = {
  verified: { fact: "green", label: "Verified" },
  high: { fact: "cyan", label: "High" },
  medium: { fact: "default", label: "Medium" },
  low: { fact: "amber", label: "Low" },
  unknown: { fact: "amber", label: "Unknown" }
};

function FitReadout({ score }: Readonly<{ score: number }>) {
  return (
    <span className="flex items-center gap-2">
      <span className="font-mono text-[12px] font-semibold tracking-[0.01em]">{score}</span>
      <span
        className="h-[5px] w-10 overflow-hidden rounded-full bg-[var(--cc-surface-inset)]"
        aria-hidden="true"
      >
        <span
          className="block h-full rounded-full bg-[var(--cc-cyan)]"
          style={{ width: `${Math.max(4, Math.min(100, score))}%` }}
        />
      </span>
    </span>
  );
}

/** Reading section: mono label band, then measured body copy. */
function ReadingSection({
  icon,
  label,
  meta,
  children
}: Readonly<{
  icon: typeof Target;
  label: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <section className="mt-6 first:mt-0">
      <SectionLabel icon={icon} label={label} meta={meta} />
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

function NumberedList({ items }: Readonly<{ items: string[] }>) {
  return (
    <ol className="space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2.5">
          <span
            className="mt-[3px] w-5 shrink-0 text-right font-mono text-[10px] font-semibold leading-none text-[var(--cc-cyan)]"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0 max-w-[60ch] text-[13px] leading-[1.55] text-[var(--cc-text-2)]">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

function IconList({
  items,
  icon: Icon,
  iconClass
}: Readonly<{ items: string[]; icon: typeof Target; iconClass: string }>) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2.5">
          <Icon className={cn("mt-[2px] size-3.5 shrink-0", iconClass)} aria-hidden="true" />
          <span className="min-w-0 max-w-[60ch] text-[13px] leading-[1.55] text-[var(--cc-text-2)]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export default async function TargetDossierPage({
  params
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const target = getTargetById(id);
  if (!target) notFound();

  const priority = priorityMeta[target.priority];
  const category = categoryMeta[target.category];
  const CategoryIcon = categoryIcons[target.category];
  const relevance = relevanceForTarget(buildMissionOps(getCurrentMissionNow()), target);
  const windowHint = visitWindowHint(target);
  const confidence = confidenceTone[target.confidence];
  const sources = target.publicSources.filter(
    (url) => !target.website || normalizeUrl(url) !== normalizeUrl(target.website)
  );

  const keyFacts: KeyFact[] = [
    typeof target.fitScore === "number"
      ? { label: "Pure Advance fit", value: <FitReadout score={target.fitScore} />, tone: "cyan" }
      : { label: "Pure Advance fit", value: "Not scored", tone: "default" },
    {
      label: "Source confidence",
      value: `${confidence.label} confidence`,
      tone: confidence.fact
    },
    {
      label: "Dossier status",
      value: target.status.replaceAll("_", " "),
      mono: true
    },
    windowHint
      ? { label: "Visit window", value: windowHint, tone: "amber" }
      : { label: "Corridor", value: target.corridor, mono: true }
  ];

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Link
        href="/business-targets"
        className="-my-1 inline-flex min-h-9 items-center gap-1.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--cc-text-3)] transition-colors hover:text-[var(--cc-cyan)]"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Targets
      </Link>

      {/* Masthead: everything needed to place this target in ten seconds. */}
      <header className="mt-2.5 overflow-hidden rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[var(--cc-elev-2)]">
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <MetaChip tone={priorityChipTone[priority.tone]}>{priority.label}</MetaChip>
            <MetaChip tone="neutral" icon={CategoryIcon}>
              {category.label}
            </MetaChip>
          </div>
          <h1 className="mt-2.5 text-balance text-[23px] font-[var(--cc-fw-x)] leading-[1.08] tracking-[var(--cc-ls-display)] text-[var(--cc-text)] sm:text-[26px]">
            {target.name}
          </h1>
          {target.nameLocal ? (
            <p className="mt-1 font-mono text-[11.5px] leading-[1.4] text-[var(--cc-text-faint)]">
              {target.nameLocal}
            </p>
          ) : null}
          <p className="mt-2 flex items-start gap-1.5 text-[12px] leading-[1.45] text-[var(--cc-text-3)]">
            <MapPin className="mt-px size-3.5 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
            <span className="min-w-0">
              {target.area} · {target.corridor}
            </span>
          </p>
          <p className="reading-lead mt-3">{target.oneLiner}</p>
        </div>
        <div className="border-t border-[var(--cc-border-faint)] bg-[var(--cc-surface-inset)] px-4 py-3">
          <KeyFacts facts={keyFacts} columns={4} />
        </div>
      </header>

      {/* Command block: the decision layer sits above the reading layer. */}
      <Callout
        tone="info"
        rail
        icon={CheckCircle2}
        title="Next action"
        className="mt-3 shadow-[var(--cc-elev-1)]"
      >
        <p className="max-w-[58ch] text-[13.5px] font-semibold leading-[1.5] text-[var(--cc-text)]">
          {relevance.nextAction}
        </p>
        <p className="mt-2 flex items-start gap-1.5 text-[12px] leading-[1.5] text-[var(--cc-text-3)]">
          <CalendarClock
            className="mt-[2px] size-3.5 shrink-0 text-[var(--cc-amber-text)]"
            aria-hidden="true"
          />
          <span className="min-w-0">
            <span className="font-semibold text-[var(--cc-text-2)]">Why now:</span>{" "}
            {relevance.whyNow}
          </span>
        </p>
        {relevance.relatedEvent ? (
          <Link
            href="/itinerary"
            className="lift mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-[var(--cc-r-chip)] border border-[var(--cc-cyan-line)] bg-[var(--cc-surface)] px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--cc-cyan)]"
          >
            <Route className="size-3.5" aria-hidden="true" />
            View timeline block
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        ) : null}
      </Callout>

      <Callout
        tone="brand"
        icon={Lightbulb}
        title="Why it matters · Pure Advance fit"
        className="mt-3"
      >
        <p className="reading">{target.whyItMatters}</p>
      </Callout>

      <div className="mt-6 space-y-6">
        <ReadingSection icon={Target} label="What they do">
          <p className="reading">{target.whatTheyDo}</p>
        </ReadingSection>

        <ReadingSection icon={Route} label="Visit plan">
          <p className="reading">{target.visitObjective}</p>
          <div className="mt-3 rounded-[var(--cc-r-tile)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] p-3">
            <p className="font-mono text-[9px] uppercase leading-none tracking-[0.12em] text-[var(--cc-text-faint)]">
              Approach route
            </p>
            <p className="mt-1.5 max-w-[60ch] text-[12.5px] leading-[1.55] text-[var(--cc-text-2)]">
              {target.route}
            </p>
          </div>
        </ReadingSection>

        {target.talkingPoints.length > 0 ? (
          <ReadingSection
            icon={MessagesSquare}
            label="Talking points"
            meta={<MetaChip tone="faint">{target.talkingPoints.length}</MetaChip>}
          >
            <NumberedList items={target.talkingPoints} />
          </ReadingSection>
        ) : null}

        {target.openQuestions.length > 0 ? (
          <ReadingSection
            icon={CircleHelp}
            label="Open questions"
            meta={<MetaChip tone="faint">{target.openQuestions.length}</MetaChip>}
          >
            <IconList
              items={target.openQuestions}
              icon={CircleHelp}
              iconClass="text-[var(--cc-text-faint)]"
            />
          </ReadingSection>
        ) : null}

        {target.risks.length > 0 ? (
          <Callout tone="warn" icon={TriangleAlert} title="Risks & unknowns">
            <IconList
              items={target.risks}
              icon={TriangleAlert}
              iconClass="text-[var(--cc-amber-text)]"
            />
          </Callout>
        ) : null}

        <Callout tone="neutral" icon={Lock} title="Private pack boundary">
          <p className="max-w-[60ch] text-[12px] leading-[1.55] text-[var(--cc-text-3)]">
            Contact details, exact address, and appointment logistics are kept in your private pack
            — verify privately before outreach. This dossier holds public, app-safe intelligence
            only.
          </p>
        </Callout>

        {target.website || sources.length > 0 ? (
          <section>
            <SectionLabel
              icon={Globe}
              label="Sources & links"
              meta={<MetaChip tone="faint">{sources.length + (target.website ? 1 : 0)}</MetaChip>}
            />
            <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
              {target.website ? (
                <LinkOut href={target.website} label="Official website" icon={Globe} />
              ) : null}
              {sources.map((url) => (
                <LinkOut key={url} href={url} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--cc-border-faint)] pt-4">
          <Link
            href="/notes"
            className="lift inline-flex min-h-10 items-center gap-2 rounded-[var(--cc-r-icon)] border border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint)] px-3.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[var(--cc-cyan)]"
          >
            <NotebookPen className="size-4" aria-hidden="true" />
            Capture meeting note
          </Link>
          <Link
            href="/business-targets"
            className="lift inline-flex min-h-10 items-center gap-2 rounded-[var(--cc-r-icon)] border border-[var(--cc-border-strong)] px-3.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[var(--cc-text-3)]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All targets
          </Link>
        </div>
      </div>
    </div>
  );
}
