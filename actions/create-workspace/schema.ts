import { z } from "zod";
import validator from "validator";

export const WorkspaceNameSchema = z
  .string()
  .trim()
  .min(3, {
    message: "Workspace name has to be at least 3 characters long.",
  })
  .refine(
    (name) => validator.isAlphanumeric(name, undefined, { ignore: " " }),
    {
      message: "Only alphanumeric characters are allowed.",
    }
  );

export const CreateWorkspaceSchema = z.object({
  imageUrl: z.string().optional(),
  name: WorkspaceNameSchema,
  slug: z
    .string()
    .trim()
    .min(3, {
      message: "Workspace URL has to be at least 3 characters long.",
    })
    .regex(/^[a-z0-9]+(?:(?:-|_)+[a-z0-9]+)*$/, {
      message: "Slug has to be in the correct format.",
    }),
});
