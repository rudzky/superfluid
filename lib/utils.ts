import createSlug from "slugify";

export const slugify = (str: string) =>
  createSlug(str ?? "", {
    lower: true,
    locale: "en",
    trim: true,
  });

export const WORKSPACE_PERMISSION_ROLES = [
  { key: "ALL", text: "All" },
  { key: "OWNER", text: "Owner" },
  { key: "LEAD", text: "Lead" },
  { key: "MEMBER", text: "Member" },
  { key: "VIEWER", text: "Viewer" },
];
