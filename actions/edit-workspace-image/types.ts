import { z } from "zod";
import { EditWorkspaceImageSchema } from "./schema";

export type TEditeWorkspaceImageSchema = z.infer<
  typeof EditWorkspaceImageSchema
>;
