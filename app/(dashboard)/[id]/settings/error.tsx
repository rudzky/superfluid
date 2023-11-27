"use client";

export default function CantAccessSettings({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-medium text-5xl">Something went wrong!</h1>
      <p>{error.message}</p>
    </main>
  );
}
