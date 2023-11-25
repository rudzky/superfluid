import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { ROUTES } from "@/lib/routes";
import { initialProfile } from "@/lib/initialProfile";

export default async function Home() {
  const user = await initialProfile();

  if (user.recentUsedWorkspaceSlug) {
    redirect(ROUTES.DASHBOARD(user.recentUsedWorkspaceSlug));
  }

  const userWorkspaces = await db.workspace.findMany({
    where: {
      members: {
        some: {
          profileId: user.id,
        },
      },
    },
  });

  if (!userWorkspaces.length) {
    redirect(ROUTES.CREATE_WORKSPACE);
  }

  redirect(ROUTES.SELECT_WORKSPACE);
}
