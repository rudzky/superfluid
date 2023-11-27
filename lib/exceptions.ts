export type ErrorData = {
  type: string;
  title: string;
  description?: string;
  cause?: string;
};

type AppErrorConfig = Partial<ErrorData>;

export class WorkspaceSettingsAccessError extends Error {
  constructor(
    config: AppErrorConfig = {
      title: "Workspace settings are exclusively accessible by the owner.",
      type: "WorkspaceAccessError",
    }
  ) {
    super(JSON.stringify(config));
  }
}

export class WorkspaceNotExistsError extends Error {
  constructor(
    config: AppErrorConfig = {
      title: "The requested workspace does not exist.",
      description: "Please ensure the correct workspace name and try again.",
      type: "WorkspaceNotExistsError",
    }
  ) {
    super(JSON.stringify(config));
  }
}

export class WorkspaceAccessError extends Error {
  constructor(
    config: AppErrorConfig = {
      title: "Error accessing the workspace.",
      description:
        "If you perceive this as an error, reach out to the workspace owner to address the issue.",
      cause: "",
      type: "WorkspaceAccessError",
    }
  ) {
    super(JSON.stringify(config));
  }
}

export class CreateProjectPermissionError extends Error {
  constructor(config: AppErrorConfig) {
    super(
      JSON.stringify({
        title: "Not allowed.",
        description: "Lack of permissions to create a project.",
        type: "CreateProjectPermissionError",
        ...config,
      })
    );
  }
}
