export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  CREATE_WORKSPACE: "/create-workspace",
  SELECT_WORKSPACE: "/select-workspace",
  DASHBOARD: (workspaceSlug: string) => `/${workspaceSlug}`,
  DASHBOARD_SETTINGS: (workspaceSlug: string) => `/${workspaceSlug}/settings`,
};
