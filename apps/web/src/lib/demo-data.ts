import { demoChina2026 } from "@pure-advance/domain";
import { formatCoordinates, getStaticMapPlaceholderLabel } from "@pure-advance/maps";

export const demoData = demoChina2026;
export const activeTrip = demoData.trips[0];

export function getLocationById(locationId: string | null) {
  if (!locationId) {
    return null;
  }

  return demoData.locations.find((location) => location.id === locationId) ?? null;
}

export function getPersonById(personId: string | null) {
  if (!personId) {
    return null;
  }

  return demoData.persons.find((person) => person.id === personId) ?? null;
}

export function getUserPerson(userId: string | null) {
  if (!userId) {
    return null;
  }

  const user = demoData.users.find((candidate) => candidate.id === userId);
  return getPersonById(user?.personId ?? null);
}

export function getTargetProfile(targetId: string) {
  return (
    demoData.businessTargetProfiles.find((profile) => profile.businessTargetId === targetId) ?? null
  );
}

export function getTargetScore(targetId: string) {
  return demoData.businessTargetScores.find((score) => score.businessTargetId === targetId) ?? null;
}

export function getTargetSources(targetId: string) {
  return demoData.businessTargetSources.filter((source) => source.businessTargetId === targetId);
}

export function getRouteLocations() {
  return demoData.locations.map((location) => ({
    ...location,
    coordinates: formatCoordinates(location),
    label: getStaticMapPlaceholderLabel(location)
  }));
}

export function getRouteSummaries() {
  return [
    {
      href: "/today",
      title: "Today",
      count: demoData.itineraryItems.length,
      label: "scheduled items"
    },
    {
      href: "/business-targets",
      title: "Targets",
      count: demoData.businessTargets.length,
      label: "demo targets"
    },
    {
      href: "/notes",
      title: "Notes",
      count: demoData.notes.length,
      label: "team notes"
    }
  ];
}

export function assertDemoCorridorIsSafe() {
  const serialized = JSON.stringify(demoData);

  return serialized.includes("Hong Kong") && serialized.includes("Shenzhen");
}
