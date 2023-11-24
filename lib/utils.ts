import createSlug from "slugify";

export const slugify = (str: string) =>
  createSlug(str ?? "", {
    lower: true,
    locale: "en",
    trim: true,
  });
