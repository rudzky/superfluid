"use client";

import React, { ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import {
  Button as ButtonCore,
  ButtonProps as AriaButtonProps,
  ButtonContext,
  useContextProps,
} from "react-aria-components";
import { AnimatePresence, Variants, motion } from "framer-motion";

import { RemixiconReactIconComponentType } from "remixicon-react";
import Loader4LineIcon from "remixicon-react/Loader4LineIcon";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "outline-none inline-flex justify-center items-center relative cursor-pointer disabled:cursor-not-allowed transition-all duration-200 border border-transparent overflow-hidden  focus:ring-2 focus:ring-offset-2 hover:shadow-none focus:shadow-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-base text-white-0 shadow-xs shadow-primary-base/[8%] hover:bg-primary-dark focus:ring-primary-lighter",
        ],
        neutral: [
          "bg-surface-700 text-white-0 shadow-xs shadow-neutral-500/[6%] hover:bg-strong-900 focus:ring-[rgb(228,229,231)]",
        ],
        error: [
          "bg-red-base text-white-0 shadow-xs shadow-[rgb(233,53,53,0.08)] hover:bg-red-dark focus:ring-[rgb(255,236,235)]",
        ],
      },
      modifier: {
        stroke:
          "bg-white-0 hover:border-transparent hover:shadow-none focus:shadow-none",
        lighter: "shadow-none",
        ghost: "shadow-none bg-transparent",
        fancy:
          "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white-0/[12%] before:to-transparent after:transition-opacity after:opacity-0 after:absolute after:inset-0 after:bg-gradient-to-b after:from-white-0/[12%] after:to-transparent hover:after:opacity-100 focus:after:opacity-100",
      },
      size: {
        default: [
          "rounded-[10px] before:rounded-[9px] after:rounded-[9px] px-[10px] py-[9px] space-x-1 __gap-1 text-label-s",
        ],
        small: ["rounded-lg px-[8px] py-[7px] gap-1 text-label-s"],
        "x-small": ["rounded-lg px-[6px] py-[5px] gap-0.5 text-label-s"],
      },
      disabled: {
        true: "disabled:bg-weak-100 disabled:text-disabled-300 disabled:border-transparent disabled:shadow-none",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        modifier: "stroke",
        className:
          "border-primary-base text-primary-base hover:bg-primary-lighter focus:border-primary-base",
      },
      {
        variant: "primary",
        modifier: "lighter",
        className:
          "bg-primary-lighter text-primary-base hover:shadow-xs hover:shadow-primary-base/[8%] hover:border-primary-base hover:bg-white-0 focus:bg-white-0 focus:border-primary-base",
      },
      {
        variant: "primary",
        modifier: "ghost",
        className:
          "text-primary-base hover:bg-primary-lighter focus:border-primary-base",
      },
      {
        variant: "primary",
        modifier: "fancy",
        className: "hover:bg-primary-base",
      },
      {
        variant: "neutral",
        modifier: "stroke",
        className:
          "border-soft-200 text-sub-500 hover:bg-weak-100 focus:border-strong-900",
      },
      {
        variant: "neutral",
        modifier: "lighter",
        className:
          "bg-weak-100 text-sub-500 hover:shadow-xs hover:shadow-primary-base/[8%] hover:border-primary-base hover:bg-white-0 focus:bg-white-0 hover:border-soft-200 focus:border-strong-900",
      },
      {
        variant: "neutral",
        modifier: "ghost",
        className:
          "bg-transparent text-sub-500 hover:bg-weak-100 hover:text-main-900 focus:border-strong-900 focus:text-main-900",
      },
      {
        variant: "neutral",
        modifier: "fancy",
        className: "hover:bg-surface-700",
      },
      {
        variant: "error",
        modifier: "stroke",
        className:
          "border-red-base text-red-base hover:bg-red-lighter focus:border-red-base",
      },
      {
        variant: "error",
        modifier: "lighter",
        className:
          "bg-red-lighter text-red-base hover:shadow-xs hover:shadow-[rgb(233,53,53,0.08)] hover:border-red-base hover:bg-white-0 focus:bg-white-0 hover:border-red-base focus:border-red-base",
      },
      {
        variant: "error",
        modifier: "ghost",
        className:
          "bg-transparent text-red-base hover:bg-red-lighter hover:text-red-base focus:border-red-base",
      },
      {
        variant: "error",
        modifier: "fancy",
        className: "hover:bg-red-base",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type ButtonProps = AriaButtonProps &
  VariantProps<typeof buttonVariants> & {
    iconLeft?: RemixiconReactIconComponentType;
    iconRight?: RemixiconReactIconComponentType;
    icon?: RemixiconReactIconComponentType;
    loading?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    [props, ref] = useContextProps(props, ref, ButtonContext);
    const {
      variant,
      size,
      className,
      modifier,
      icon: Icon,
      iconRight: IconRight,
      iconLeft: IconLeft,
      loading = false,
      isDisabled: disabled,
    } = props;

    return (
      <ButtonCore
        className={cn(
          buttonVariants({ variant, modifier, size, disabled, className })
        )}
        {...props}
        ref={ref}
      >
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
      </ButtonCore>
    );
  }
);

Button.displayName = "Button";

const IconWrapper = ({
  children,
  firstChild,
}: {
  children: ReactNode;
  firstChild?: boolean;
}) => {
  const variants: Variants = {
    visible: {
      width: "auto",
      marginLeft: firstChild ? 0 : "4px",
      opacity: 1,
    },
    hidden: {
      width: 0,
      marginLeft: 0,
      opacity: 0,
    },
  };

  return (
    <motion.span
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      variants={variants}
    >
      {children}
    </motion.span>
  );
};
