"use client";

import React from "react";
import User3LineIcon from "remixicon-react/User3LineIcon";
import { TextInput } from "@/components/ui/TextInput/index";

export default function Inputs() {
  return (
    <div className="grid gap-4 p-6">
      <h1>Text inputs:</h1>
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
        variant={"text"}
      />
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
        isDisabled
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
      <h1>URL inputs:</h1>
      <TextInput
        label="Website"
        optional
        type="url"
        prefix="superfluid.app/"
        labelInfoTooltip="This is the info"
        placeholder="really-fancy"
        icon={User3LineIcon}
        inputInfoTooltip="hej hej siemka"
        description="This is a hint text to help user."
        isRequired
        validate={(value) => value.length < 3 || "There was a problem..."}
        validationBehavior="aria"
        variant={"url"}
      />
      <TextInput
        label="Website"
        optional
        type="url"
        prefix="superfluid.app/"
        labelInfoTooltip="This is the info"
        placeholder="really-fancy"
        icon={User3LineIcon}
        inputInfoTooltip="hej hej siemka"
        description="This is a hint text to help user."
        isRequired
        validate={(value) => value.length < 3 || "There was a problem..."}
        validationBehavior="aria"
        variant={"url"}
        isDisabled
      />
    </div>
  );
}
