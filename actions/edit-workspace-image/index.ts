"use server";

import { revalidatePath } from "next/cache";
import { typeToFlattenedError } from "zod";
import { Prisma, Workspace } from "@prisma/client";

import { db } from "@/lib/db";
import { ROUTES } from "@/lib/routes";
import { currentProfile } from "@/lib/currentProfile";

import { TEditeWorkspaceImageSchema } from "./types";
import { EditWorkspaceImageSchema } from "./schema";

type ActionReturn =
  | {
      success: true;
      data: Workspace;
    }
  | {
      success: false;
      errorType: "VALIDATION";
      error: typeToFlattenedError<TEditeWorkspaceImageSchema, string>;
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

export async function editWorkspaceImage(
  slug: string,
  data: TEditeWorkspaceImageSchema
): Promise<ActionReturn> {
  const profile = await currentProfile();

  if (!profile) {
    return {
      success: false,
      errorType: "AUTHENTICATION",
      error: "Unathenticated!",
    };
  }

  const result = EditWorkspaceImageSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errorType: "VALIDATION",
      error: result.error.flatten(),
    };
  }

  const { imageUrl } = result.data;

  try {
    const response: Workspace = await db.workspace.update({
      where: {
        slug,
      },
      data: {
        imageUrl,
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
