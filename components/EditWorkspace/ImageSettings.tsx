"use client";

import React from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import FileUpload from "@/components/Fileupload";

import { TEditeWorkspaceImageSchema } from "@/actions/edit-workspace-image/types";
import { EditWorkspaceImageSchema } from "@/actions/edit-workspace-image/schema";
import { editWorkspaceImage } from "@/actions/edit-workspace-image";

import { ROUTES } from "@/lib/routes";

interface Props {
  workspaceSlug: string;
  imageUrl: string;
}

export default function ImageSettings({ workspaceSlug, imageUrl }: Props) {
  const { handleSubmit, control } = useForm<TEditeWorkspaceImageSchema>({
    resolver: zodResolver(EditWorkspaceImageSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<TEditeWorkspaceImageSchema> = async (data) => {
    const result = await editWorkspaceImage(workspaceSlug, data);

    if (result.success) {
      toast.success("Image updat");
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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
      <FileUpload
        control={control}
        endpoint="serverImage"
        field="imageUrl"
        currentValue={imageUrl.length ? imageUrl : undefined}
        onSuccess={() => handleSubmit(onSubmit)()}
      />
    </form>
  );
}
