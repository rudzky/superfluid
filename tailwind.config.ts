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
