import React from "react";
import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import ImageSettings from "@/components/EditWorkspace/ImageSettings";
import RolePermissionsSettings from "@/components/EditWorkspace/RolePermissionsSettings";

import { db } from "@/lib/db";
import { ROUTES } from "@/lib/routes";
import { currentProfile } from "@/lib/currentProfile";

interface PageProps {
  params: { id: string };
}

export default async function DashboardSettingsPage({ params }: PageProps) {
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
    <div>
      <h1>Settings</h1>

      <ImageSettings
        workspaceSlug={dashboardData.slug}
        imageUrl={dashboardData.imageUrl}
      />

      <RolePermissionsSettings
        workspaceSlug={dashboardData.slug}
        settings={dashboardData.settings}
      />
    </div>
  );
}
