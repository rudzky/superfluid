import { db } from "@/lib/db";

export default async function Dashboard({
  params,
}: {
  params: { id: string };
}) {
  const dashboardData = await db.workspace.findUnique({
    where: {
      slug: params.id,
    },
  });

  return <div>Dashboard {dashboardData?.name}</div>;
}
