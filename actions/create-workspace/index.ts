"use server";

import { v4 as uuidv4 } from "uuid";
import { typeToFlattenedError } from "zod";
import { Prisma, Workspace } from "@prisma/client";

import { CreateWorkspaceSchema } from "@/actions/create-workspace/schema";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";

import { TCreateWorkspaceSchema } from "./types";

type ActionReturn =
  | {
      success: true;
      data: Workspace;
    }
  | {
      success: false;
      errorType: "VALIDATION";
      error: typeToFlattenedError<TCreateWorkspaceSchema, string>;
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

export async function createWorkspace(
  data: TCreateWorkspaceSchema
): Promise<ActionReturn> {
  const profile = await currentProfile();

  if (!profile) {
    return {
      success: false,
      errorType: "AUTHENTICATION",
      error: "Unathenticated!",
    };
  }

  const result = CreateWorkspaceSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errorType: "VALIDATION",
      error: result.error.flatten(),
    };
  }

  const { name, slug, imageUrl } = result.data;

  try {
    const response: Workspace = await db.workspace.create({
      data: {
        name,
        slug,
        inviteCode: uuidv4(),
        imageUrl: imageUrl ?? "",
        owner: {
          connect: {
            id: profile.id,
          },
        },
        members: {
          create: {
            profileId: profile.id,
            role: "OWNER",
          },
        },
      },
    });

    return { success: true, data: response };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          errorType: "DATABASE",
          error:
            "This workspace URL is already reserved. Please select another one.",
        };
      }
    }
    return { success: false, errorType: "OTHER", error };
  }
}
