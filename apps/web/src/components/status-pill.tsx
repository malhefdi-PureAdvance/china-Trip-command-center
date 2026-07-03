import { Check } from "lucide-react";

import { Chip, type ChipTone } from "@/components/command-kit";

const toneByStatus: Record<string, ChipTone> = {
  confirmed: "soft",
  profiled: "cyanTint",
  proposed: "amber",
  source_needed: "amber",
  draft: "neutral",
  open: "amber",
  qualified: "green"
};

/** Confirmed is the norm on a locked itinerary — render it quiet with a green
 *  tick so the amber exceptions (proposed / source needed) are what pop. */
export function StatusPill({ status }: Readonly<{ status: string }>) {
  const label = status.replaceAll("_", " ");

  if (status === "confirmed") {
    return (
      <Chip tone="soft" icon={Check} iconClassName="text-[var(--cc-green)]">
        {label}
      </Chip>
    );
  }

  return <Chip tone={toneByStatus[status] ?? "neutral"}>{label}</Chip>;
}
