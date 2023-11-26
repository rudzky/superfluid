import { z } from "zod";

export const EditWorkspaceImageSchema = z.object({
  imageUrl: z.string().optional(),
});
