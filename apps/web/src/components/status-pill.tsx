import { Badge, type BadgeProps } from "@pure-advance/design-system";

const toneByStatus: Record<string, BadgeProps["tone"]> = {
  confirmed: "green",
  profiled: "cyan",
  proposed: "amber",
  source_needed: "amber",
  draft: "neutral",
  open: "coral",
  qualified: "green"
};

export function StatusPill({ status }: Readonly<{ status: string }>) {
  const label = status.replaceAll("_", " ");

  return <Badge tone={toneByStatus[status] ?? "neutral"}>{label}</Badge>;
}
