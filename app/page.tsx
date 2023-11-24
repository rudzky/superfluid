import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initialProfile";
import { ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await initialProfile();
  const userWorkspaces = await db.workspace.findMany({
    where: {
      members: {
        some: {
          profileId: user.profileId,
        },
      },
    },
  });

  if (!userWorkspaces.length) {
    redirect(ROUTES.CREATE_WORKSPACE);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello
    </main>
  );
}
