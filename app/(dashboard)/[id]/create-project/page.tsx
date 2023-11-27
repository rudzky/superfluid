import { redirectToSignIn } from "@clerk/nextjs";

import CreateProject from "@/components/CreateProject";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/currentProfile";
import { doesUserHasPermission, nameWordsCorrectly } from "@/lib/utils";
import {
  CreateProjectPermissionError,
  WorkspaceAccessError,
  WorkspaceNotExistsError,
} from "@/lib/exceptions";

interface PageProps {
  params: { id: string };
}

export default async function CreateProjectPage({ params }: PageProps) {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const workspace = await db.workspace.findUnique({
    where: {
      slug: params.id,
    },
    include: {
      members: true,
      settings: true,
    },
  });

  if (!workspace) {
    throw new WorkspaceNotExistsError();
  }

  const userAsMember = workspace.members.find(
    ({ profileId }) => profileId === profile.id
  );

  if (!userAsMember) {
    throw new WorkspaceAccessError();
  }

  await db.profile.update({
    where: {
      id: profile.id,
    },
    data: {
      recentUsedWorkspace: {
        connect: {
          id: workspace.id,
        },
      },
    },
  });

  const { isActionAllowed, rolesAllowed } = doesUserHasPermission(
    userAsMember.role,
    workspace.settings.createProject
  );

  if (!isActionAllowed) {
    throw new CreateProjectPermissionError({
      cause: rolesAllowed?.length
        ? `Only ${nameWordsCorrectly(rolesAllowed)} are allowed to do this
              action.`
        : undefined,
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateProject slug={workspace.slug} />
    </main>
  );
}
