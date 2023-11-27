export class WorkspaceSettingsAccessError extends Error {
  constructor(
    message: string = "Workspace settings are exclusively accessible by the owner."
  ) {
    super(message);
    this.name = "WorkspaceAccessError";
  }
}
