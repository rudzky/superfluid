"use client";

import { FancyButton } from "@/components/ui/FancyButton";
import { useState } from "react";
import ArrowLeftSLineIcon from "remixicon-react/ArrowLeftSLineIcon";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";

export default function FancyButtons() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <section className="p-4 flex gap-2 items-center">
        <FancyButton
          variant={"neutral"}
          iconRight={ArrowRightSLineIcon}
          loading={loading}
          onPress={() => setLoading((prev) => !prev)}
        >
          Button
        </FancyButton>
        <FancyButton
          variant={"neutral"}
          size={"small"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
        >
          Button
        </FancyButton>
        <FancyButton
          variant={"neutral"}
          size={"x-small"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
        >
          Button
        </FancyButton>
        <FancyButton
          variant={"neutral"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
          isDisabled
        >
          Button
        </FancyButton>
      </section>
      <section className="p-4 flex gap-2 items-center">
        <FancyButton
          variant={"blue"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
        >
          Button
        </FancyButton>
        <FancyButton
          variant={"blue"}
          size={"small"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
        >
          Button
        </FancyButton>
        <FancyButton
          variant={"blue"}
          size={"x-small"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
        >
          Button
        </FancyButton>
        <FancyButton
          variant={"blue"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
          isDisabled
        >
          Button
        </FancyButton>
      </section>
      <section className="p-4 flex gap-2 items-center">
        <FancyButton
          variant={"purple"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
        >
          Button
        </FancyButton>
        <FancyButton
          variant={"purple"}
          size={"small"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
        >
          Button
        </FancyButton>
        <FancyButton
          variant={"purple"}
          size={"x-small"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
        >
          Button
        </FancyButton>
        <FancyButton
          variant={"purple"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
          isDisabled
        >
          Button
        </FancyButton>
      </section>
      <section className="p-4 flex gap-2 items-center">
        <FancyButton
          variant={"error"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
        >
          Button
        </FancyButton>
        <FancyButton
          variant={"error"}
          size={"small"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
        >
          Button
        </FancyButton>
        <FancyButton
          variant={"error"}
          size={"x-small"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
        >
          Button
        </FancyButton>
        <FancyButton
          variant={"error"}
          iconLeft={ArrowLeftSLineIcon}
          iconRight={ArrowRightSLineIcon}
          isDisabled
        >
          Button
        </FancyButton>
      </section>
    </div>
  );
}
