"use client";

import { ErrorData, WorkspaceSettingsAccessError } from "@/lib/exceptions";

export default function CantAccessSettings({
  error,
}: {
  error: WorkspaceSettingsAccessError;
}) {
  const { title, cause, description }: ErrorData = JSON.parse(error.message);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-medium text-5xl">{title}</h1>
      {description && <p>{description}</p>}
      {cause && <p>{cause}</p>}
    </main>
  );
}
