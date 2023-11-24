export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  CREATE_WORKSPACE: "/create-workspace",
  DASHBOARD: (workspaceSlug: string) => `/${workspaceSlug}`,
};
