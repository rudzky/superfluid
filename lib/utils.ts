import { WorkspaceMemberRole, WorkspacePermission } from "@prisma/client";
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

export const nameWordsCorrectly = (words: string[]) => {
  if (words.length === 1) return words[0];
  if (words.length === 2) return `${words[0]} and ${words[1]}`;
  if (words.length > 2) {
    const startingWords = words.slice(0, -1);
    const lastWord = words.slice(-1)[0];

    return `${startingWords.join(", ")} and ${lastWord}`;
  }
};

export const doesUserHasPermission = (
  userRole: WorkspaceMemberRole,
  requiredPermissionRole: WorkspacePermission
) => {
  switch (requiredPermissionRole) {
    case "ALL":
      return { isActionAllowed: true };
    case "OWNER":
      return { isActionAllowed: userRole === "OWNER", rolesAllowed: ["Owner"] };
    case "LEAD":
      return {
        isActionAllowed: ["OWNER", "LEAD"].includes(userRole),
        rolesAllowed: ["Owner", "Lead"],
      };
    case "MEMBER":
      return {
        isActionAllowed: ["OWNER", "LEAD", "MEMBER"].includes(userRole),
        rolesAllowed: ["Owner", "Lead", "Member"],
      };
  }

  return { isActionAllowed: false };
};
