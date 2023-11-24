"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { createWorkspace } from "@/actions/create-workspace";
import { CreateWorkspaceSchema } from "@/actions/create-workspace/schema";
import { TCreateWorkspaceSchema } from "@/actions/create-workspace/types";

import { ROUTES } from "@/lib/routes";
import { slugify } from "@/lib/utils";

type Step = "BASIC_INFO" | "ADD_MEMBERS";

export default function CreateWorkspaceForm() {
  const [step, setStep] = useState<Step>("BASIC_INFO");

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    trigger,
    watch,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<TCreateWorkspaceSchema>({
    resolver: zodResolver(CreateWorkspaceSchema),
    mode: "onChange",
  });

  const { name } = watch();

  const onSubmit: SubmitHandler<TCreateWorkspaceSchema> = async (data) => {
    const result = await createWorkspace(data);

    if (result.success) {
      setStep("ADD_MEMBERS");
      return;
    }

    const { errorType, error } = result;

    if (errorType === "AUTHENTICATION") {
      redirect(ROUTES.SIGN_IN);
    } else if (errorType === "VALIDATION") {
      const { name: nameError, slug: slugError } = error.fieldErrors;

      if (nameError) {
        setError("name", {
          message: nameError[0],
        });
      }
      if (slugError) {
        setError("slug", {
          message: slugError[0],
        });
      }
    } else if (errorType === "DATABASE") {
      setError("slug", {
        message: error,
      });
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!dirtyFields.slug && !errors.name?.message) {
      setValue("slug", slugify(name));
    }

    if (touchedFields.name) {
      trigger("slug");
    }
  }, [
    name,
    setValue,
    trigger,
    touchedFields.name,
    dirtyFields.slug,
    errors.name?.message,
  ]);

  return (
    <div>
      {step === "BASIC_INFO" && (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
          <label htmlFor="name">Workspace name</label>
          <input
            {...register("name")}
            type="text"
            name="name"
            id="name"
            placeholder="Workspace name"
            className="text-black"
          />
          {errors.name && (
            <label htmlFor="name" className="text-sm text-red-400">
              {errors.name?.message}
            </label>
          )}

          <label htmlFor="slug">Workspace URL</label>
          <div>
            <span>superfluid.app/</span>
            <input
              {...register("slug")}
              type="text"
              name="slug"
              id="slug"
              placeholder="Workspace URL"
              className="text-black"
            />
          </div>
          {errors.slug && (
            <label htmlFor="slug" className="text-sm text-red-400">
              {errors.slug.message}
            </label>
          )}

          <button type="submit" className="p-2 border">
            Create workspace
          </button>
        </form>
      )}
    </div>
  );
}
