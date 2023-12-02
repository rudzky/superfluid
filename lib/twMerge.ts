import { extendTailwindMerge } from "tailwind-merge";

export const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "title-h1",
            "title-h2",
            "title-h3",
            "title-h4",
            "title-h5",
            "title-h6",
            "label-xl",
            "label-l",
            "label-m",
            "label-s",
            "label-xs",
            "paragraph-xl",
            "paragraph-l",
            "paragraph-m",
            "paragraph-s",
            "paragraph-xs",
            "subheading-m",
            "subheading-s",
            "subheading-xs",
            "subheading-2xs",
          ],
        },
      ],
    },
  },
});
