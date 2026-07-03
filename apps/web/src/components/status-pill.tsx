import { Chip, type ChipTone } from "@/components/command-kit";

const toneByStatus: Record<string, ChipTone> = {
  confirmed: "green",
  profiled: "cyanTint",
  proposed: "amber",
  source_needed: "amber",
  draft: "neutral",
  open: "amber",
  qualified: "green"
};

export function StatusPill({ status }: Readonly<{ status: string }>) {
  const label = status.replaceAll("_", " ");

  return <Chip tone={toneByStatus[status] ?? "neutral"}>{label}</Chip>;
}
