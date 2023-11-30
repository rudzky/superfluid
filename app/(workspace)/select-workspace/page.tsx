import Link from "next/link";
import { redirect } from "next/navigation";
import { redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { ROUTES } from "@/lib/routes";
import { currentProfile } from "@/lib/currentProfile";

export default async function SelectWorkspacePage() {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const userWorkspaces = await db.workspace.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!userWorkspaces.length) {
    redirect(ROUTES.CREATE_WORKSPACE);
  }

  return (
    <div>
      <h1 className="font-title text-title-h1">Select workspace</h1>

      <ul>
        {userWorkspaces.map(({ id, name, slug }) => (
          <li key={id}>
            <Link href={ROUTES.DASHBOARD(slug)}>
              {name} {profile.recentUsedWorkspaceSlug === slug ? "RECENT" : ""}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
