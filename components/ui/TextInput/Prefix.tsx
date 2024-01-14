import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

interface Props {
  prefix: string;
  disabled: boolean;
  focused: boolean;
  invalid: boolean;
  withValue: boolean;
}

const prefixVariants = cva(
  [
    "block px-3 py-[10px] text-paragraph-s text-soft-400 border-r border-soft-200 transition-colors",
  ],
  {
    variants: {
      disabled: {
        true: "",
      },
      focused: {
        true: "",
      },
      invalid: {
        true: "",
      },
      withValue: {
        true: "",
      },
    },
    compoundVariants: [
      {
        focused: true,
        className: "text-sub-500",
      },
      {
        withValue: true,
        className: "text-sub-500",
      },
      {
        disabled: true,
        className: "text-disabled-300",
      },
    ],
  }
);

export default function Prefix({
  disabled,
  focused,
  invalid,
  withValue,
  prefix,
}: Props) {
  return (
    <span
      className={cn(
        prefixVariants({
          disabled,
          focused,
          invalid,
          withValue,
        })
      )}
    >
      {prefix}
    </span>
  );
}
