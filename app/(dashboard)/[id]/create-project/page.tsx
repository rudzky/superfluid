import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import CreateProject from "@/components/CreateProject";

import { db } from "@/lib/db";
import { ROUTES } from "@/lib/routes";
import { currentProfile } from "@/lib/currentProfile";
import { doesUserHasPermission, nameWordsCorrectly } from "@/lib/utils";

interface PageProps {
  params: { id: string };
}

export default async function CreateProjectPage({ params }: PageProps) {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const dashboardData = await db.workspace.findUnique({
    where: {
      slug: params.id,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      settings: true,
      members: true,
    },
  });

  if (!dashboardData) {
    return redirect(ROUTES.SELECT_WORKSPACE);
  }

  await db.profile.update({
    where: {
      id: profile.id,
    },
    data: {
      recentUsedWorkspace: {
        connect: {
          id: dashboardData.id,
        },
      },
    },
  });

  const userAsMember = dashboardData.members.find(
    ({ profileId }) => profileId === profile.id
  );

  if (!userAsMember) {
    throw new Error("Something went wrong");
  }

  const { isActionAllowed, rolesAllowed } = doesUserHasPermission(
    userAsMember.role,
    dashboardData.settings.createProject
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isActionAllowed ? (
        <CreateProject slug={dashboardData.slug} />
      ) : (
        <div className="grid place-items-center">
          <h1 className="font-medium text-4xl">Access denied</h1>
          <p className="font-semibold text-lg mt-4">
            You do not have enough privileges to create a project.
          </p>
          {rolesAllowed?.length && (
            <p>
              Only {nameWordsCorrectly(rolesAllowed)} are allowed to do this
              action.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
