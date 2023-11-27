"use client";

import { ErrorData } from "@/lib/exceptions";

const ERRORS_ALLOWED_TO_RESET = [
  "WorkspaceAccessError",
  "CreateProjectAccessError",
];

export default function CreateProjectErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { type, title, cause, description }: ErrorData = JSON.parse(
    error.message
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-medium text-5xl">{title}</h1>
      {description && <p>{description}</p>}
      {cause && <p>{cause}</p>}
      {ERRORS_ALLOWED_TO_RESET.includes(type) && (
        <button className="p-4 border rounded-xl" onClick={() => reset()}>
          Try again
        </button>
      )}
    </main>
  );
}
