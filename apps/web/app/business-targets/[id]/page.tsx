import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  FileCheck2,
  Lock,
  MapPin,
  Route,
  ShieldCheck
} from "lucide-react";

import { cn } from "@pure-advance/design-system";

import {
  Callout,
  Chip,
  ExternalChip,
  ExternalLinkCard,
  FitGauge,
  IconSquare,
  KeyFacts,
  MarkerList
} from "@/components/command-kit";
import { SourceConfidenceBadge } from "@/components/source-confidence-badge";
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

const priorityChipTone = {
  cyan: "cyan",
  green: "green",
  amber: "amber",
  coral: "amber",
  neutral: "neutral"
} as const;

/** Numbered reading section — mono index + real title + hairline rule. */
const dossierTone = [
  {
    index: "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] text-[var(--cc-cyan)]",
    rail: "from-[var(--cc-cyan)]"
  },
  {
    index: "border-[var(--cc-purple-line)] bg-[var(--cc-purple-tint)] text-[var(--cc-purple-soft)]",
    rail: "from-[var(--cc-purple)]"
  },
  {
    index: "border-[var(--cc-amber-line)] bg-[var(--cc-amber-tint)] text-[var(--cc-amber-text)]",
    rail: "from-[var(--cc-amber)]"
  }
] as const;

function DossierSection({
  index,
  title,
  children
}: Readonly<{ index: number; title: string; children: React.ReactNode }>) {
  const tone = dossierTone[(index - 1) % dossierTone.length];

  return (
    <section className="group relative mt-4 overflow-hidden rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[var(--cc-elev-1)]">
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r to-transparent",
          tone.rail
        )}
        aria-hidden="true"
      />
      <div className="p-4">
        <header className="flex items-start gap-3">
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-[10px] border font-mono text-[10px] font-black leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]",
              tone.index
            )}
            aria-hidden="true"
          >
            {String(index).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[19px] font-[var(--cc-fw-x)] leading-[1.08] tracking-[-0.02em] text-[var(--cc-text)] sm:text-[21px]">
              {title}
            </h2>
          </div>
        </header>
        <div className="mt-3 rounded-[var(--cc-r-tile)] border border-[var(--cc-border-faint)] bg-[var(--cc-surface-inset)] p-3.5 sm:p-4">
          {children}
        </div>
      </div>
    </section>
  );
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
  const visitWindow = visitWindowHint(target);

  const sections: { title: string; body: React.ReactNode }[] = [
    {
      title: "What they do",
      body: <div className="cc-prose">{target.whatTheyDo}</div>
    },
    {
      title: "Why it matters",
      body: <div className="cc-prose">{target.whyItMatters}</div>
    },
    {
      title: "Visit objective & route",
      body: (
        <>
          <div className="cc-prose">{target.visitObjective}</div>
          <div className="mt-3 flex max-w-[64ch] items-start gap-2.5 rounded-[var(--cc-r-tile)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] p-2.5">
            <IconSquare icon={Route} size="sm" />
            <div className="min-w-0">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--cc-text-faint)]">
                Approach route
              </p>
              <p className="mt-1 text-[12.5px] leading-[1.5] text-[var(--cc-text-2)]">
                {target.route}
              </p>
            </div>
          </div>
        </>
      )
    }
  ];

  if (target.talkingPoints.length > 0) {
    sections.push({
      title: "Talking points",
      body: <MarkerList items={target.talkingPoints} marker="tick" className="max-w-[64ch]" />
    });
  }

  if (target.openQuestions.length > 0) {
    sections.push({
      title: "Open questions",
      body: <MarkerList items={target.openQuestions} marker="question" className="max-w-[64ch]" />
    });
  }

  if (target.risks.length > 0) {
    sections.push({
      title: "Risks & unknowns",
      body: (
        <Callout tone="warn" className="max-w-[64ch]">
          <MarkerList items={target.risks} marker="risk" />
        </Callout>
      )
    });
  }

  if (target.publicSources.length > 0) {
    sections.push({
      title: "Public sources",
      body: (
        <div className="grid max-w-[64ch] gap-2 sm:grid-cols-2">
          {target.publicSources.map((url) => (
            <ExternalLinkCard key={url} href={url} />
          ))}
        </div>
      )
    });
  }

  return (
    <>
      <Link
        href="/business-targets"
        className="inline-flex min-h-9 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--cc-text-3)] transition-colors hover:text-[var(--cc-text)]"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All targets
      </Link>

      {/* Masthead — the inspect surface */}
      <header className="relative mt-2 overflow-hidden rounded-[var(--cc-r-card)] border border-[var(--cc-border)] bg-[var(--cc-surface)] shadow-[var(--cc-elev-2)]">
        <span
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--cc-cyan)] via-[var(--cc-cyan-line-soft)] to-transparent"
          aria-hidden="true"
        />
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <Chip tone={priorityChipTone[priority.tone]}>{priority.label}</Chip>
            <Chip tone="soft" icon={CategoryIcon}>
              {category.label}
            </Chip>
            {typeof target.fitScore === "number" ? (
              <FitGauge score={target.fitScore} className="ml-auto" />
            ) : null}
          </div>
          <h1 className="mt-3 text-balance text-[23px] font-[var(--cc-fw-x)] leading-[1.08] tracking-[var(--cc-ls-display)] text-[var(--cc-text)]">
            {target.name}
          </h1>
          {target.nameLocal ? (
            <p className="mt-1 font-mono text-[11.5px] text-[var(--cc-text-faint)]">
              {target.nameLocal}
            </p>
          ) : null}
          <p className="mt-2.5 max-w-[62ch] text-[13.5px] leading-[1.55] text-[var(--cc-text-2)]">
            {target.oneLiner}
          </p>
        </div>
        <div className="border-t border-[var(--cc-border-faint)] p-4 pt-3">
          <KeyFacts
            items={[
              {
                label: "Location",
                value: `${target.area} · ${target.corridor}`,
                icon: MapPin,
                span: true
              },
              visitWindow
                ? {
                    label: "Visit window",
                    value: visitWindow,
                    icon: CalendarClock,
                    span: visitWindow.length > 30
                  }
                : null,
              {
                label: "Source status",
                value: (
                  <span className="flex flex-wrap items-center gap-1.5">
                    <SourceConfidenceBadge confidence={target.confidence} />
                    <Chip tone="soft" icon={FileCheck2}>
                      {target.status.replaceAll("_", " ")}
                    </Chip>
                  </span>
                ),
                icon: ShieldCheck,
                span: !visitWindow || visitWindow.length > 30
              }
            ]}
          />
          {target.website ? (
            <div className="mt-3.5 flex flex-wrap gap-2">
              <ExternalChip href={target.website}>Website</ExternalChip>
            </div>
          ) : null}
        </div>
      </header>

      {/* Command panel — what to do, and why now */}
      <Callout tone="action" rail icon={CheckCircle2} eyebrow="Next action" className="mt-3">
        <p className="text-[13.5px] font-medium leading-[1.5] text-[var(--cc-text)]">
          {relevance.nextAction}
        </p>
        <p className="mt-2 border-t border-[var(--cc-cyan-line-soft)] pt-2 text-[12.5px] leading-[1.5] text-[var(--cc-text-3)]">
          <span className="font-semibold text-[var(--cc-text-2)]">Why now:</span> {relevance.whyNow}
        </p>
        {relevance.relatedEvent ? (
          <Link
            href="/itinerary"
            className="mt-2.5 inline-flex min-h-9 items-center gap-1.5 rounded-[var(--cc-r-icon)] border border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint-2)] px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--cc-cyan)] cc-lift"
          >
            View related timeline block
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        ) : null}
      </Callout>

      {sections.map((section, index) => (
        <DossierSection key={section.title} index={index + 1} title={section.title}>
          {section.body}
        </DossierSection>
      ))}

      <Callout tone="quiet" icon={Lock} eyebrow="Private-pack boundary" className="mt-6">
        Contact details, exact address, and appointment logistics are kept in your private pack —
        verify privately before outreach. This dossier holds public, app-safe intelligence only.
      </Callout>
    </>
  );
}
