import type { Location } from "@pure-advance/domain";

export interface MapProviderConfig {
  provider: "none" | "mapbox" | "google" | "amap";
  publicToken?: string;
}

export function formatCoordinates(location: Pick<Location, "latitude" | "longitude">) {
  if (location.latitude === null || location.longitude === null) {
    return "Coordinates pending";
  }

  return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
}

export function getStaticMapPlaceholderLabel(
  location: Pick<Location, "name" | "city" | "country">
) {
  return `${location.name} / ${location.city}, ${location.country}`;
}
