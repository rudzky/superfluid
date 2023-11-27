import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { UserButton, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { ROUTES } from "@/lib/routes";
import { currentProfile } from "@/lib/currentProfile";

interface PageProps {
  params: { id: string };
}

export default async function Dashboard({ params }: PageProps) {
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
    <div>
      <UserButton />
      {dashboardData.imageUrl ? (
        <Image
          width={24}
          height={24}
          src={dashboardData.imageUrl}
          alt="Upload"
          className="w-6 h-6 object-cover rounded-md"
        />
      ) : (
        <div className="">
          {dashboardData.name
            .split(" ")
            .slice(0, 2)
            .map(([letter]) => letter)}
        </div>
      )}
      Dashboard {dashboardData?.name}
      <p contentEditable>/invitation/{dashboardData?.inviteCode}</p>
      <Link
        href={ROUTES.CREATE_PROJECT(dashboardData.slug)}
        className="border rounded-lg p-2 mt-2"
      >
        <span>Create new project</span>
        <i className="ri-add-line"></i>
      </Link>
      <Link
        href={ROUTES.DASHBOARD_SETTINGS(dashboardData.slug)}
        className="border rounded-lg p-2 mt-2"
      >
        <span>Settings</span>
        <i className="ri-settings-3-line"></i>
      </Link>
    </div>
  );
}
