"use client";

import React from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkspacePermission } from "@prisma/client";

import { editWorkspacePermissions } from "@/actions/edit-workspace-permissions";
import { EditWorkspacePermissionsSchema } from "@/actions/edit-workspace-permissions/schema";
import { TEditWorkspacePermissionsSchema } from "@/actions/edit-workspace-permissions/types";

import { ROUTES } from "@/lib/routes";

import { WorkspaceRolePermissions } from "./RolePermissions";

type Settings = {
  createProject: WorkspacePermission;
};

interface Props {
  workspaceSlug: string;
  settings: Settings;
}

export default function RolePermissionsSettings({
  settings,
  workspaceSlug,
}: Props) {
  const { createProject } = settings;

  const { handleSubmit, control } = useForm<TEditWorkspacePermissionsSchema>({
    resolver: zodResolver(EditWorkspacePermissionsSchema),
    mode: "onChange",
    defaultValues: {
      createProject,
    },
  });

  const onSubmit: SubmitHandler<TEditWorkspacePermissionsSchema> = async (
    data
  ) => {
    const result = await editWorkspacePermissions(workspaceSlug, data);

    if (result.success) {
      toast.success("Permissions changed successfully.");
      return;
    }

    const { errorType, error } = result;

    if (errorType === "AUTHENTICATION") redirect(ROUTES.SIGN_IN);
    else if (errorType === "VALIDATION") {
      toast.error(error.formErrors);
    } else if (errorType === "DATABASE") {
      toast.error(error);
    } else {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Create Project: </p>
      <WorkspaceRolePermissions control={control} fieldName="createProject" />
      <button type="submit">Save</button>
    </form>
  );
}
