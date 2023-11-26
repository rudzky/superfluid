import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import CreateProject from "@/components/CreateProject";

import { db } from "@/lib/db";
import { ROUTES } from "@/lib/routes";
import { currentProfile } from "@/lib/currentProfile";

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateProject slug={dashboardData.slug} />
    </main>
  );
}
