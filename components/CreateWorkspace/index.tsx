"use client";

import { useState } from "react";

import Form from "./Form";
import CopyInviteLink from "./CopyInviteLink";

export type WorkspaceData = {
  inviteCode: string;
  workspaceSlug: string;
};

export default function CreateWorkspace() {
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData | null>(
    null
  );

  return (
    <div>
      {!workspaceData && <Form setWorkspaceData={setWorkspaceData} />}
      {workspaceData && <CopyInviteLink workspaceData={workspaceData} />}
    </div>
  );
}
