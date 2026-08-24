export const APPLICATION_DEADLINE_ISO = "2026-08-31T18:00:00+05:30";

export const isPortalClosed = (): boolean => {
  return Date.now() > new Date(APPLICATION_DEADLINE_ISO).getTime();
};

export const PORTAL_CLOSED_MESSAGE = "Application submission is closed.";
