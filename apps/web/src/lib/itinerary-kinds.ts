import {
  Bed,
  Bus,
  Building2,
  ClipboardList,
  Clock,
  Plane,
  TrainFront,
  Users,
  UtensilsCrossed
} from "lucide-react";
import type { ItineraryItem } from "@pure-advance/domain";

/** Icon + label per schedule-item kind, so timeline rows scan by shape. */
export const itineraryKindMeta: Record<
  ItineraryItem["kind"],
  { icon: typeof Plane; label: string }
> = {
  flight: { icon: Plane, label: "Flight" },
  train: { icon: TrainFront, label: "Train" },
  transfer: { icon: Bus, label: "Transfer" },
  hotel: { icon: Bed, label: "Hotel" },
  meeting: { icon: Users, label: "Meeting" },
  site_visit: { icon: Building2, label: "Site visit" },
  meal: { icon: UtensilsCrossed, label: "Meal" },
  buffer: { icon: Clock, label: "Buffer" },
  admin: { icon: ClipboardList, label: "Admin" }
};
