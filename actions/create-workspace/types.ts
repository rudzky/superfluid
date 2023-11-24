import { z } from "zod";
import { CreateWorkspaceSchema } from "./schema";

export type TCreateWorkspaceSchema = z.infer<typeof CreateWorkspaceSchema>;
