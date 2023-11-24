import CreateWorkspaceForm from "@/components/createWorkspaceForm";

export default function CreateWorkspace() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Create a new workspace</h1>
      <p className="text-center">
        Workspaces are shared environments where teams can work on projects and
        tasks.
      </p>
      <CreateWorkspaceForm />
    </main>
  );
}
