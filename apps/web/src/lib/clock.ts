export type MissionClockReader = () => Date;

/**
 * Single production clock boundary for mission-state rendering. Tests inject a
 * fixed Date into selector helpers; routes call this instead of constructing
 * dates inline.
 */
export const getCurrentMissionNow: MissionClockReader = () => new Date();
