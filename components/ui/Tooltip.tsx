"use client";

import { forwardRef } from "react";
import * as Ariakit from "@ariakit/react";
import { AnimatePresence, motion } from "framer-motion";

interface TooltipAnchorProps extends Ariakit.TooltipAnchorProps {
  description: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipAnchorProps>(
  function TooltipAnchor({ description, ...props }, ref) {
    const tooltip = Ariakit.useTooltipStore();
    const mounted = tooltip.useState("mounted");

    const y = tooltip.useState((state) => {
      const dir = state.currentPlacement.split("-")[0]!;
      return dir === "top" ? -8 : 8;
    });

    return (
      <Ariakit.TooltipProvider store={tooltip} hideTimeout={250}>
        <Ariakit.TooltipAnchor {...props} ref={ref} />
        <AnimatePresence>
          {mounted && (
            <Ariakit.Tooltip
              gutter={4}
              alwaysVisible
              className="bg-white-0 border border-soft-200 rounded-md text-main-900 px-[6px] py-[2px] text-paragraph-xs"
              render={
                <motion.div
                  initial={{ opacity: 0, y }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y }}
                />
              }
            >
              <Ariakit.TooltipArrow />
              {description}
            </Ariakit.Tooltip>
          )}
        </AnimatePresence>
      </Ariakit.TooltipProvider>
    );
  }
);
