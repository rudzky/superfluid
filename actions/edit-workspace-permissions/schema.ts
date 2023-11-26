import { z } from "zod";
import { WorkspacePermission } from "@prisma/client";

export const EditWorkspacePermissionsSchema = z.object({
  createProject: z.nativeEnum(WorkspacePermission),
});
