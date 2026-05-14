// ─────────────────────────────────────────────────────────────────────────────
// Route → Header Title Map
//
// Add an entry here whenever you add a new sidebar route.
// Nested routes are handled automatically via prefix matching —
// e.g. "/applications/123" will resolve to the "/applications" entry.
// ─────────────────────────────────────────────────────────────────────────────

export interface RouteTitle {
  title: string;
}

export const ROUTE_TITLES: Record<string, RouteTitle> = {
  "/admin/dashboard": { title: "Dashboard Overview" },
  "/admin/applications": { title: "Applications" },
  "/student/profile": { title: "Profile" },
};

export const DEFAULT_ROUTE_TITLE: RouteTitle = { title: "Dashboard" };
