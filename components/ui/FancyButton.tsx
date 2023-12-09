"use client";

import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import {
  Button as ButtonCore,
  ButtonContext,
  useContextProps,
} from "react-aria-components";
import { AnimatePresence } from "framer-motion";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";

import { cn } from "@/lib/utils";
import { BaseButtonProps, IconWrapper } from "./Button";

const buttonVariants = cva(
  [
    "fancy-button outline-none relative rounded-lg p-0 flex justify-center items-center text-white-0 transition-shadow duration-200 overflow-hidden before:w-full before:h-full before:absolute before:rounded-[inherit] before:top-0 before:left-0 after:absolute",
  ],
  {
    variants: {
      variant: {
        neutral: [],
        blue: ["fancy-button--blue"],
        purple: ["fancy-button--purple"],
        error: ["fancy-button--error"],
      },
      size: {
        default: [
          "rounded-[10px] after:rounded-[9px] text-label-s",
          "[&>span]:px-2 [&>span]:py-[10px] [&>span]:space-x-1",
          "[&>span]:before:rounded-[10px]",
        ],
        small: [
          "rounded-lg after:rounded-[7px]",
          "[&>span]:p-2",
          "text-label-s",
        ],
        "x-small": ["rounded-lg", "[&>span]:p-[6px]", "text-label-s"],
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: "neutral",
      size: "default",
    },
  }
);

type FancyButtonProps = BaseButtonProps & VariantProps<typeof buttonVariants>;

export const FancyButton = React.forwardRef<
  HTMLButtonElement,
  FancyButtonProps
>((props, ref) => {
  [props, ref] = useContextProps(props, ref, ButtonContext);
  const {
    variant,
    size,
    className,
    icon: Icon,
    iconRight: IconRight,
    iconLeft: IconLeft,
    loading = false,
  } = props;

  return (
    <ButtonCore
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      ref={ref}
    >
      <span className="flex justify-center items-center grow z-10 rounded-lg transition-all text-white-0 before:absolute before:inset-0 before:transition-all">
        {Icon ? (
          <>
            {loading ? (
              <Loader4LineIcon size={20} className="animate-spin" />
            ) : (
              <Icon size={20} />
            )}
          </>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {IconLeft && (
                <IconWrapper firstChild>
                  <IconLeft size={20} />
                </IconWrapper>
              )}
            </AnimatePresence>
            {/* @ts-ignore */}
            <span className="inline-block px-1">{props.children}</span>
            <AnimatePresence initial={false}>
              {IconRight && !loading && (
                <IconWrapper>
                  <IconRight size={20} />
                </IconWrapper>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {loading && (
                <IconWrapper>
                  <Loader4LineIcon size={20} className="animate-spin" />
                </IconWrapper>
              )}
            </AnimatePresence>
          </>
        )}
      </span>
    </ButtonCore>
  );
});

FancyButton.displayName = "FancyButton";
