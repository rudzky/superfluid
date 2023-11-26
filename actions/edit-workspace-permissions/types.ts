import { z } from "zod";
import { EditWorkspacePermissionsSchema } from "./schema";

export type TEditWorkspacePermissionsSchema = z.infer<
  typeof EditWorkspacePermissionsSchema
>;
