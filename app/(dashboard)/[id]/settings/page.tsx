import React from "react";
import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import ImageSettings from "@/components/EditWorkspace/ImageSettings";
import RolePermissionsSettings from "@/components/EditWorkspace/RolePermissionsSettings";

import { db } from "@/lib/db";
import { ROUTES } from "@/lib/routes";
import { currentProfile } from "@/lib/currentProfile";
import { WorkspaceSettingsAccessError } from "@/lib/exceptions";

interface PageProps {
  params: { id: string };
}

export default async function DashboardSettingsPage({ params }: PageProps) {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const workspace = await db.workspace.findUnique({
    where: {
      slug: params.id,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!workspace) {
    return redirect(ROUTES.SELECT_WORKSPACE);
  }

  let workspaceUserCanEdit;

  if (profile.role === "ADMIN") {
    workspaceUserCanEdit = await db.workspace.findUnique({
      where: {
        slug: params.id,
      },
      include: {
        members: {
          select: {
            id: true,
            role: true,
            profile: {
              select: {
                name: true,
              },
            },
          },
        },
        settings: true,
      },
    });
  } else {
    workspaceUserCanEdit = await db.workspace.findUnique({
      where: {
        slug: params.id,
        members: {
          some: {
            profileId: profile.id,
            role: "OWNER",
          },
        },
      },
      include: {
        members: {
          select: {
            id: true,
            role: true,
            profile: {
              select: {
                name: true,
              },
            },
          },
        },
        settings: true,
      },
    });
  }

  if (!workspaceUserCanEdit) {
    throw new WorkspaceSettingsAccessError();
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

  return (
    <div>
      <h1>Settings</h1>

      <ImageSettings
        workspaceSlug={workspaceUserCanEdit.slug}
        imageUrl={workspaceUserCanEdit.imageUrl}
      />

      <RolePermissionsSettings
        workspaceSlug={workspaceUserCanEdit.slug}
        settings={workspaceUserCanEdit.settings}
      />

      <div className="my-4">
        <h2>Members</h2>
        <ul>
          {workspaceUserCanEdit.members.map(({ id, role, profile }) => (
            <li key={id}>
              {profile.name} ({role})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
