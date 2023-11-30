import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      neutral: {
        0: "hsl(var(--neutral-0))",
        100: "hsl(var(--neutral-100))",
        200: "hsl(var(--neutral-200))",
        300: "hsl(var(--neutral-300))",
        400: "hsl(var(--neutral-400))",
        500: "hsl(var(--neutral-500))",
        600: "hsl(var(--neutral-600))",
        700: "hsl(var(--neutral-700))",
        800: "hsl(var(--neutral-800))",
        900: "hsl(var(--neutral-900))",
      },
      blue: {
        darker: "hsl(var(--blue-darker))",
        dark: "hsl(var(--blue-dark))",
        base: "hsl(var(--blue-base))",
        light: "hsl(var(--blue-light))",
        lighter: "hsl(var(--blue-lighter))",
      },
      orange: {
        darker: "hsl(var(--orange-darker))",
        dark: "hsl(var(--orange-dark))",
        base: "hsl(var(--orange-base))",
        light: "hsl(var(--orange-light))",
        lighter: "hsl(var(--orange-lighter))",
      },
      yellow: {
        darker: "hsl(var(--yellow-darker))",
        dark: "hsl(var(--yellow-dark))",
        base: "hsl(var(--yellow-base))",
        light: "hsl(var(--yellow-light))",
        lighter: "hsl(var(--yellow-lighter))",
      },
      red: {
        darker: "hsl(var(--red-darker))",
        dark: "hsl(var(--red-dark))",
        base: "hsl(var(--red-base))",
        light: "hsl(var(--red-light))",
        lighter: "hsl(var(--red-lighter))",
      },
      green: {
        darker: "hsl(var(--green-darker))",
        dark: "hsl(var(--green-dark))",
        base: "hsl(var(--green-base))",
        light: "hsl(var(--green-light))",
        lighter: "hsl(var(--green-lighter))",
      },
      purple: {
        darker: "hsl(var(--purple-darker))",
        dark: "hsl(var(--purple-dark))",
        base: "hsl(var(--purple-base))",
        light: "hsl(var(--purple-light))",
        lighter: "hsl(var(--purple-lighter))",
      },
      pink: {
        darker: "hsl(var(--pink-darker))",
        dark: "hsl(var(--pink-dark))",
        base: "hsl(var(--pink-base))",
        light: "hsl(var(--pink-light))",
        lighter: "hsl(var(--pink-lighter))",
      },
      teal: {
        darker: "hsl(var(--teal-darker))",
        dark: "hsl(var(--teal-dark))",
        base: "hsl(var(--teal-base))",
        light: "hsl(var(--teal-light))",
        lighter: "hsl(var(--teal-lighter))",
      },
      primary: {
        darker: "hsl(var(--primary-darker))",
        dark: "hsl(var(--primary-dark))",
        base: "hsl(var(--primary-base))",
        light: "hsl(var(--primary-light))",
        lighter: "hsl(var(--primary-lighter))",
      },
      bg: {
        "strong-900": "hsl(var(--bg-strong-900))",
        "surface-700": "hsl(var(--bg-surface-700))",
        "soft-200": "hsl(var(--bg-soft-200))",
        "weak-100": "hsl(var(--bg-weak-100))",
        "white-0": "hsl(var(--bg-white-0))",
      },
      text: {
        "main-900": "hsl(var(--text-main-900))",
        "sub-500": "hsl(var(--text-sub-500))",
        "soft-400": "hsl(var(--text-soft-400))",
        "disabled-300": "hsl(var(--text-disabled-300))",
        "white-0": "hsl(var(--text-white-0))",
      },
      state: {
        success: "hsl(var(--state-success))",
        warning: "hsl(var(--state-warning))",
        error: "hsl(var(--state-error))",
        information: "hsl(var(--state-information))",
        away: "hsl(var(--state-away))",
        feature: "hsl(var(--state-feature))",
        neutral: "hsl(var(--state-neutral))",
        verified: "hsl(var(--state-verified))",
      },
    },
    fontFamily: {
      base: ["var(--font-inter)"],
      title: ["var(--font-inter-display)"],
    },
    fontSize: {
      // TITLES
      "title-h1": [
        "3.5rem",
        {
          lineHeight: "4rem",
          letterSpacing: "-0.01em",
          fontWeight: "500",
        },
      ],
      "title-h2": [
        "3rem",
        {
          lineHeight: "3.5rem",
          letterSpacing: "-0.01em",
          fontWeight: "500",
        },
      ],
      "title-h3": [
        "2.5rem",
        {
          lineHeight: "3rem",
          letterSpacing: "-0.01em",
          fontWeight: "500",
        },
      ],
      "title-h4": [
        "2rem",
        {
          lineHeight: "2.5rem",
          fontWeight: "500",
        },
      ],
      "title-h5": [
        "1.5rem",
        {
          lineHeight: "2rem",
          fontWeight: "500",
        },
      ],
      "title-h6": [
        "1.25rem",
        {
          lineHeight: "1.75rem",
          fontWeight: "500",
        },
      ],
      // LABELS
      "label-xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
          letterSpacing: "-0.015em",
          fontWeight: "500",
        },
      ],
      "label-l": [
        "1.125rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "-0.015em",
          fontWeight: "500",
        },
      ],
      "label-m": [
        "1rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "-0.011em",
          fontWeight: "500",
        },
      ],
      "label-s": [
        "0.875rem",
        {
          lineHeight: "1.25rem",
          letterSpacing: "-0.06em",
          fontWeight: "500",
        },
      ],
      "label-xs": [
        "0.75rem",
        {
          lineHeight: "1rem",
          fontWeight: "500",
        },
      ],
      // PARAGRAPHS
      "paragraph-xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
          letterSpacing: "-0.015",
          fontWeight: "400",
        },
      ],
      "paragraph-l": [
        "1.125rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "-0.015",
          fontWeight: "400",
        },
      ],
      "paragraph-m": [
        "1rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "-0.011",
          fontWeight: "400",
        },
      ],
      "paragraph-s": [
        "0.875rem",
        {
          lineHeight: "1.25rem",
          letterSpacing: "-0.06",
          fontWeight: "400",
        },
      ],
      "paragraph-xs": [
        "0.75rem",
        {
          lineHeight: "1rem",
          fontWeight: "400",
        },
      ],
      // SUBHEADINGS
      "subheading-m": [
        "1rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "-0.06",
          fontWeight: "500",
        },
      ],
      "subheading-s": [
        "0.875rem",
        {
          lineHeight: "1.25rem",
          letterSpacing: "-0.06",
          fontWeight: "500",
        },
      ],
      "subheading-xs": [
        "0.75rem",
        {
          lineHeight: "1rem",
          letterSpacing: "-0.04",
          fontWeight: "500",
        },
      ],
      "subheading-2xs": [
        "0.6875rem",
        {
          lineHeight: "0.75rem",
          letterSpacing: "-0.02",
          fontWeight: "500",
        },
      ],
    },
    boxShadow: {
      xs: "0 1px 2px 0 rgb(228 229 231 / 24%)",
      s: "0 2px 4px 0 rgb(28 28 28 / 4%)",
      m: "0 16px 32px -12px rgb(89 92 94 / 10%)",
      l: "0 16px 40px -8px rgb(89 92 94 / 16%)",
      xl: "0 24px 56px -4px rgb(89 92 94 / 16%)",
      "2xl": "0 40px 96px -8px rgb(89 92 94 / 20%)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default withUt(config);
