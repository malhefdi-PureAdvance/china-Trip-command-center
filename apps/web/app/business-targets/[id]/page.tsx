import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CircleHelp,
  ExternalLink,
  Lightbulb,
  Lock,
  MapPin,
  Route,
  Target,
  TriangleAlert
} from "lucide-react";

import { Badge, cn } from "@pure-advance/design-system";

import { businessTargets, categoryMeta, getTargetById, priorityMeta } from "@/lib/targets";

export function generateStaticParams() {
  return businessTargets.map((target) => ({ id: target.id }));
}

const priorityToneClass: Record<string, string> = {
  cyan: "border-[var(--cc-cyan-line)] bg-[var(--cc-cyan-tint)] text-[var(--cc-cyan)]",
  green: "border-transparent bg-[var(--cc-green-tint)] text-[var(--cc-green)]",
  amber: "border-[var(--cc-amber-line)] bg-[var(--cc-amber-tint)] text-[var(--cc-amber-text)]",
  neutral: "border-[var(--cc-border-strong)] bg-transparent text-[var(--cc-text-3)]"
};

function Section({
  icon: Icon,
  title,
  children
}: Readonly<{ icon: typeof Target; title: string; children: React.ReactNode }>) {
  return (
    <section className="mt-5">
      <h2 className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cc-cyan)]">
        <Icon className="size-3.5" aria-hidden="true" />
        {title}
      </h2>
      <div className="mt-2 text-[13px] leading-[1.5] text-[var(--cc-text-2)]">{children}</div>
    </section>
  );
}

function Bullets({ items }: Readonly<{ items: string[] }>) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2">
          <span
            className="mt-1.5 size-1 shrink-0 rounded-full bg-[var(--cc-cyan)]"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function TargetDossierPage({
  params
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const target = getTargetById(id);
  if (!target) notFound();

  const priority = priorityMeta[target.priority];

  return (
    <>
      <Link
        href="/business-targets"
        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--cc-text-3)]"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Targets
      </Link>

      <header className="mt-3 border-b border-[var(--cc-border)] pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-2 py-1 font-mono text-[9px] font-semibold uppercase leading-none tracking-[0.08em]",
              priorityToneClass[priority.tone]
            )}
          >
            {priority.label}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--cc-text-faint)]">
            {categoryMeta[target.category].label}
          </span>
          {typeof target.fitScore === "number" ? (
            <span className="font-mono text-[10px] font-semibold text-[var(--cc-cyan)]">
              FIT {target.fitScore}
            </span>
          ) : null}
        </div>
        <h1 className="mt-2 text-balance text-[22px] font-[var(--cc-fw-x)] leading-tight tracking-[var(--cc-ls-display)] text-[var(--cc-text)]">
          {target.name}
        </h1>
        {target.nameLocal ? (
          <p className="mt-0.5 font-mono text-[12px] text-[var(--cc-text-faint)]">
            {target.nameLocal}
          </p>
        ) : null}
        <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[var(--cc-text-3)]">
          <MapPin className="size-3.5 shrink-0 text-[var(--cc-cyan)]" aria-hidden="true" />
          {target.area} · {target.corridor}
        </p>
        <p className="mt-3 text-[13.5px] leading-[1.5] text-[var(--cc-text)]">{target.oneLiner}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone={target.confidence === "unknown" ? "amber" : "cyan"}>
            {target.confidence} confidence
          </Badge>
          {target.website ? (
            <a
              href={target.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--cc-cyan)]"
            >
              <ExternalLink className="size-3.5" aria-hidden="true" />
              Website
            </a>
          ) : null}
        </div>
      </header>

      <Section icon={Target} title="What they do">
        <p>{target.whatTheyDo}</p>
      </Section>
      <Section icon={Lightbulb} title="Why it matters">
        <p>{target.whyItMatters}</p>
      </Section>
      <Section icon={Route} title="Visit objective & route">
        <p>{target.visitObjective}</p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--cc-text-faint)]">
          Route · {target.route}
        </p>
      </Section>
      {target.talkingPoints.length > 0 ? (
        <Section icon={Lightbulb} title="Talking points">
          <Bullets items={target.talkingPoints} />
        </Section>
      ) : null}
      {target.openQuestions.length > 0 ? (
        <Section icon={CircleHelp} title="Open questions">
          <Bullets items={target.openQuestions} />
        </Section>
      ) : null}
      {target.risks.length > 0 ? (
        <Section icon={TriangleAlert} title="Risks & unknowns">
          <Bullets items={target.risks} />
        </Section>
      ) : null}

      <div className="mt-6 flex items-start gap-2 rounded-[var(--cc-r-tile)] border border-[var(--cc-border)] bg-[var(--cc-surface-inset)] p-3">
        <Lock className="mt-0.5 size-4 shrink-0 text-[var(--cc-text-faint)]" aria-hidden="true" />
        <p className="text-[11.5px] leading-[1.5] text-[var(--cc-text-3)]">
          Contact details, exact address, and appointment logistics are kept in your private pack —
          verify privately before outreach. This dossier holds public, app-safe intelligence only.
        </p>
      </div>

      {target.publicSources.length > 0 ? (
        <Section icon={ExternalLink} title="Public sources">
          <ul className="space-y-1.5">
            {target.publicSources.map((url) => (
              <li key={url} className="min-w-0">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate font-mono text-[11px] text-[var(--cc-cyan)]"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
