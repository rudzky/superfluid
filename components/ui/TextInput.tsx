"use client";

import { ReactNode, useRef } from "react";
import type { AriaTextFieldProps } from "react-aria";
import { useTextField } from "react-aria";
import { RemixiconReactIconComponentType } from "remixicon-react";
import { AnimatePresence, Variants } from "framer-motion";
import { motion } from "framer-motion";

import InformationFillIcon from "remixicon-react/InformationFillIcon";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";
import ErrorWarningFillIcon from "remixicon-react/ErrorWarningFillIcon";

import { Tooltip } from "@/components/ui/Tooltip";
import { IconWrapper } from "@/components/ui/Button";

import { cn } from "@/lib/utils";

interface Props extends AriaTextFieldProps {
  optional?: boolean;
  labelInfoTooltip?: string;
  inputInfoTooltip?: string;
  icon?: RemixiconReactIconComponentType;
  loading?: boolean;
}

export function TextInput(props: Props) {
  let {
    label,
    optional = false,
    labelInfoTooltip,
    inputInfoTooltip,
    icon: Icon,
    loading,
  } = props;
  let ref = useRef(null);
  let {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useTextField(props, ref);

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
      <div className="relative w-72 rounded-[10px]">
        <input
          {...inputProps}
          ref={ref}
          className={cn(
            "order-2 peer outline-none w-full p-[10px] pl-3 gap-2 rounded-[10px] bg-white-0 hover:bg-weak-100 disabled:bg-weak-100 border border-soft-200 disabled:border-transparent hover:border-transparent text-paragraph-s text-main-900 disabled:text-disabled-300 ring-neutral-200 hover:placeholder:text-sub-500 placeholder:text-paragraph-s placeholder:text-soft-400 disabled:placeholder:text-disabled-300 focus:ring-2 focus:ring-offset-2 focus:border-strong-900 shadow-xs disabled:shadow-none hover:shadow-none transition-all",
            isInvalid &&
              "border-red-base focus:border-red-base focus:ring-red-lighter",
            Icon && "pl-10"
          )}
        />
        {Icon && (
          <Icon
            size={20}
            className={cn(
              "order-1 absolute fill-soft-400 peer-disabled:fill-disabled-300 peer-disabled:bg-weak-100 peer-hover:fill-sub-500 peer-focus:fill-sub-500 left-3 z-10 top-1/2 -translate-y-1/2 transition-colors",
              (isInvalid || !!inputProps.value) && "fill-sub-500"
            )}
          />
        )}
        <AnimatePresence initial={false}>
          {!loading && inputInfoTooltip && (
            <IconWrapper className="absolute right-[10px] top-1/2 -translate-y-1/2 bg-white-0 fill-soft-400 peer-hover:bg-weak-100 peer-disabled:bg-weak-100 peer-disabled:fill-disabled-300 transition-colors">
              <Tooltip description={inputInfoTooltip} render={<span />}>
                <InformationFillIcon size={17} className="fill-[inherit]" />
              </Tooltip>
            </IconWrapper>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {loading && (
            <IconWrapper className="absolute right-[10px] top-1/2 -translate-y-1/2 bg-white-0 fill-soft-400 peer-hover:bg-weak-100 peer-disabled:bg-weak-100 peer-disabled:fill-disabled-300 transition-colors">
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
