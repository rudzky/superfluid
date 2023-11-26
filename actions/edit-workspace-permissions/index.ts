"use server";

import { revalidatePath } from "next/cache";
import { typeToFlattenedError } from "zod";
import { Prisma, Workspace } from "@prisma/client";

import { db } from "@/lib/db";
import { ROUTES } from "@/lib/routes";
import { currentProfile } from "@/lib/currentProfile";

import { TEditWorkspacePermissionsSchema } from "./types";
import { EditWorkspacePermissionsSchema } from "./schema";

type ActionReturn =
  | {
      success: true;
      data: Workspace;
    }
  | {
      success: false;
      errorType: "VALIDATION";
      error: typeToFlattenedError<TEditWorkspacePermissionsSchema, string>;
    }
  | {
      success: false;
      errorType: "DATABASE" | "AUTHENTICATION";
      error: string;
    }
  | {
      success: false;
      errorType: "OTHER";
      error: unknown;
    };

export async function editWorkspacePermissions(
  slug: string,
  data: TEditWorkspacePermissionsSchema
): Promise<ActionReturn> {
  const profile = await currentProfile();

  if (!profile) {
    return {
      success: false,
      errorType: "AUTHENTICATION",
      error: "Unathenticated!",
    };
  }

  const result = EditWorkspacePermissionsSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errorType: "VALIDATION",
      error: result.error.flatten(),
    };
  }

  const { createProject } = result.data;

  try {
    const response: Workspace = await db.workspace.update({
      where: {
        slug,
      },
      data: {
        settings: {
          update: {
            createProject,
          },
        },
      },
    });

    revalidatePath(ROUTES.DASHBOARD_SETTINGS(slug));

    return { success: true, data: response };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        success: false,
        errorType: "DATABASE",
        error: error.message,
      };
    }
    return { success: false, errorType: "OTHER", error };
  }
}
