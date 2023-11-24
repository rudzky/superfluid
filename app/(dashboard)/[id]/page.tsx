import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";

interface PageProps {
  params: { id: string };
}

export default async function Dashboard({ params }: PageProps) {
  const dashboardData = await db.workspace.findUnique({
    where: {
      slug: params.id,
    },
  });

  return (
    <div>
      <UserButton />
      Dashboard {dashboardData?.name}
      <p>/invitation/{dashboardData?.inviteCode}</p>
    </div>
  );
}
