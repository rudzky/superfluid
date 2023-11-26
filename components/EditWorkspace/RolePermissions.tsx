"use client";

import { Control, FieldValues, Path, useController } from "react-hook-form";
import { WORKSPACE_PERMISSION_ROLES } from "@/lib/utils";

interface Props<T extends FieldValues> {
  control: Control<T>;
  fieldName: Path<T>;
}

export function WorkspaceRolePermissions<T extends FieldValues>({
  control,
  fieldName,
}: Props<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: fieldName,
    control,
  });

  return (
    <div className="flex gap-2">
      <p>Allow to:</p>
      <select className="text-black" {...field} id={fieldName}>
        {WORKSPACE_PERMISSION_ROLES.map(({ key, text }) => (
          <option value={key} key={key}>
            {text}
          </option>
        ))}
      </select>
      {error?.message && <label htmlFor={fieldName}>{error?.message}</label>}
    </div>
  );
}
