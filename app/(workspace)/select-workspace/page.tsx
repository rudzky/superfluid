import Link from "next/link";
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

  return (
    <div>
      <h1>Select workspace</h1>
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
