"use client";

import { TextInput } from "@/components/ui/TextInput";
import React from "react";
import User3LineIcon from "remixicon-react/User3LineIcon";

export default function Inputs() {
  return (
    <div className="grid gap-4 p-6">
      <TextInput
        label="Change Label"
        optional
        labelInfoTooltip="This is the info"
        placeholder="Placeholder text..."
        icon={User3LineIcon}
        inputInfoTooltip="hej hej siemka"
        description="This is a hint text to help user."
        isRequired
        validate={(value) => value.length < 3 || "There was a problem..."}
        validationBehavior="aria"
      />
      <TextInput
        label="Change Label"
        optional
        labelInfoTooltip="This is the info"
        placeholder="Placeholder text..."
        inputInfoTooltip="hej hej siemka"
        description="This is a hint text to help user."
        isRequired
        validate={(value) => value.length < 3 || "There was a problem..."}
        validationBehavior="aria"
      />
      <TextInput
        label="Change Label"
        optional
        labelInfoTooltip="This is the info"
        placeholder="Placeholder text..."
        inputInfoTooltip="hej hej siemka"
        description="This is a hint text to help user."
        isRequired
        validate={(value) => value.length < 3 || "There was a problem..."}
        validationBehavior="aria"
        isDisabled
      />
    </div>
  );
}
