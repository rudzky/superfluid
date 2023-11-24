import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initialProfile";
import { ROUTES } from "@/lib/routes";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    inviteCode: string;
  };
}

export default async function InviteCodePage({ params }: PageProps) {
  const profile = await initialProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingWorkspace = await db.workspace.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingWorkspace) {
    return redirect(ROUTES.DASHBOARD(existingWorkspace.slug));
  }

  const workspace = await db.workspace.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (workspace) {
    return redirect(ROUTES.DASHBOARD(workspace.slug));
  }

  return null;
}
