import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initialProfile";

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello
    </main>
  );
}
