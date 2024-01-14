"use client";

import { ReactNode, useRef, useState } from "react";
import type { AriaTextFieldProps } from "react-aria";
import { useFocus, useTextField } from "react-aria";
import { RemixiconReactIconComponentType } from "remixicon-react";
import { AnimatePresence, Variants } from "framer-motion";
import { motion } from "framer-motion";

import InformationFillIcon from "remixicon-react/InformationFillIcon";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import ErrorWarningFillIcon from "remixicon-react/ErrorWarningFillIcon";

import { Tooltip } from "@/components/ui/Tooltip";
import { IconWrapper } from "@/components/ui/Button";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Prefix from "./Prefix";

const inputContainerVariants = cva(
  [
    "group relative overflow-hidden flex max-w-72 rounded-[10px] w-full bg-white-0 border border-soft-200 ring-neutral-200 shadow-xs transition-all",
  ],
  {
    variants: {
      variant: {
        text: ["focus-within:ring-2 ring-offset-2"],
        url: ["focus-within:ring-2 ring-offset-2"],
      },
      disabled: {
        true: "shadow-none bg-weak-100 border-transparent",
        false: "hover:shadow-none",
      },
      focused: {
        true: "",
      },
      invalid: {
        true: "border-red-base hover:border-red-base focus-within:border-red-base focus-within:ring-red-light hover:focus-within:ring-red-light",
      },
      size: {},
    },
    compoundVariants: [
      {
        variant: "text",
        invalid: false,
        disabled: false,
        className:
          "hover:bg-weak-100 hover:border-transparent focus-within:border-strong-900 hover:focus-within:border-strong-900 hover:focus-within:bg-white-0  focus-within:ring-neutral-200",
      },
    ],
  }
);

const inputVariants = cva(
  [
    "w-full bg-transparent outline-none p-[10px] pl-3 rounded-[inherit] text-paragraph-s text-main-900 placeholder:text-paragraph-s placeholder:text-soft-400 disabled:placeholder:text-disabled-300 transition-colors disabled:cursor-not-allowed placeholder:transition-colors",
  ],
  {
    variants: {
      variant: {
        text: [""],
        url: ["rounded-none"],
      },
      withIcon: {
        true: "",
      },
      disabled: {
        true: "",
      },
      focused: {
        true: "",
      },
      invalid: {
        true: "",
      },
      withTooltip: {
        true: "",
      },
      size: {
        medium: "",
        small: "",
        "x-small": "",
      },
    },
    compoundVariants: [
      {
        variant: "text",
        withIcon: true,
        className: ["pl-10"],
      },
      {
        variant: "text",
        withTooltip: true,
        className: ["pr-7"],
      },
      {
        variant: "text",
        disabled: false,
        className: [
          "group-hover:placeholder:text-sub-500 focus:placeholder:text-sub-500",
        ],
      },
      {
        variant: "url",
        disabled: false,
        className: [
          "hover:bg-weak-100 hover:placeholder:text-sub-500 focus:placeholder:text-sub-500 hover:focus:bg-white-0",
        ],
      },
    ],
    defaultVariants: {
      variant: "text",
      size: "medium",
    },
  }
);

const iconVariants = cva(
  [
    "absolute fill-soft-400 left-3 z-10 top-1/2 -translate-y-1/2 transition-colors",
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
        disabled: false,
        className: "group-hover:fill-sub-500 group-focus-within:fill-sub-500",
      },
      {
        disabled: true,
        className: "fill-disabled-300",
      },
      {
        disabled: false,
        withValue: true,
        className: "fill-sub-500",
      },
    ],
  }
);

interface Props
  extends AriaTextFieldProps,
    VariantProps<typeof inputContainerVariants> {
  optional?: boolean;
  labelInfoTooltip?: string;
  inputInfoTooltip?: string;
  icon?: RemixiconReactIconComponentType;
  loading?: boolean;
  prefix?: string;
}

export function TextInput(props: Props) {
  const [events, setEvents] = useState<string[]>([]);

  const {
    label,
    optional = false,
    labelInfoTooltip,
    inputInfoTooltip,
    icon: Icon,
    loading,
    variant = "text",
    size,
    prefix = "https://",
  } = props;
  const ref = useRef(null);
  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useTextField(props, ref);

  const { disabled: isDisabled } = inputProps;

  const { focusProps } = useFocus({
    onFocus: () => {
      setEvents((prev) => [...new Set([...prev, "focus"])]);
    },
    onBlur: () => {
      setEvents((prev) => prev.filter((events) => events !== "focus"));
    },
  });

  const isFocus = events.includes("focus");
  const type = inputProps.type;

  return (
    <div className="grid gap-1 w-72">
      <div className="flex items-center">
        <label {...labelProps} className="text-label-s text-main-900">
          {label}
          {!!optional && (
            <span className="text-paragraph-s text-sub-500">(Optional)</span>
          )}
        </label>
        {!!labelInfoTooltip && (
          <Tooltip description={labelInfoTooltip} render={<span />}>
            <InformationFillIcon size={17} className="fill-disabled-300" />
          </Tooltip>
        )}
      </div>
      <div
        className={cn(
          inputContainerVariants({
            variant,
            size,
            disabled: isDisabled,
            focused: isFocus,
            invalid: isInvalid,
          })
        )}
      >
        {type === "url" && (
          <Prefix
            prefix={prefix}
            disabled={!!isDisabled}
            focused={isFocus}
            invalid={isInvalid}
            withValue={!!inputProps.value}
          />
        )}

        {Icon && type !== "url" && (
          <Icon
            size={20}
            className={cn(
              iconVariants({
                disabled: isDisabled,
                focused: isFocus,
                invalid: isInvalid,
                withValue: !!inputProps.value,
              })
            )}
          />
        )}

        <input
          {...inputProps}
          {...focusProps}
          ref={ref}
          className={cn(
            inputVariants({
              variant,
              size,
              disabled: isDisabled,
              focused: isFocus,
              invalid: isInvalid,
              withIcon: !!Icon,
              withTooltip: !!inputInfoTooltip,
            })
          )}
        />

        <AnimatePresence initial={false}>
          {!loading && inputInfoTooltip && (
            <IconWrapper
              className={cn(
                "absolute right-[10px] top-1/2 -translate-y-1/2 fill-soft-400 transition-colors",
                isDisabled && "fill-disabled-300"
              )}
            >
              <Tooltip
                description={inputInfoTooltip}
                render={<span />}
                disabled={isDisabled}
              >
                <InformationFillIcon size={17} className="fill-[inherit]" />
              </Tooltip>
            </IconWrapper>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {loading && (
            <IconWrapper
              className={cn(
                "absolute right-[10px] top-1/2 -translate-y-1/2 fill-soft-400 transition-colors",
                isDisabled && "fill-disabled-300"
              )}
            >
              <Loader4LineIcon
                size={20}
                className="animate-spin fill-[inherit]"
              />
            </IconWrapper>
          )}
        </AnimatePresence>
      </div>
      {(!!props.description || isInvalid) && (
        <div>
          <AnimatePresence initial={false}>
            {!isInvalid && props.description && (
              <VerticalHeightAnimator className="block">
                <div
                  {...descriptionProps}
                  className={cn(
                    "text-sub-500 flex gap-1",
                    inputProps.disabled && "text-disabled-300"
                  )}
                >
                  <ErrorWarningFillIcon size={16} />
                  <span className="text-paragraph-xs">{props.description}</span>
                </div>
              </VerticalHeightAnimator>
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {isInvalid && (
              <VerticalHeightAnimator className="block">
                <div
                  {...errorMessageProps}
                  className="text-red-base flex gap-1"
                >
                  <ErrorWarningFillIcon size={16} />
                  <span className="text-paragraph-xs ">
                    {validationErrors.join(", ")}
                  </span>
                </div>
              </VerticalHeightAnimator>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

const VerticalHeightAnimator = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const variants: Variants = {
    visible: {
      height: "auto",
      opacity: 1,
    },
    hidden: {
      height: 0,
      opacity: 0,
    },
  };

  return (
    <motion.div
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
