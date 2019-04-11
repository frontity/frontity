import { CreateOptions } from "../types";
import { mergeRight } from "ramda";

const defaultOptions: CreateOptions = {
  path: process.cwd(),
  useCwd: false,
  typescript: false,
  packages: [
    "@frontity/file-settings",
    "@frontity/wp-source",
    "@frontity/simple-router"
  ]
};

export const normalizeName = (name: string): string =>
  name.replace(/[\s_-]+/, "-").toLowerCase();

// This function normalizes and validates options.
export default (passedOptions: CreateOptions): CreateOptions => {
  const options = mergeRight(defaultOptions, passedOptions);

  // Normalize and valiidate `name` option.
  options.name = normalizeName(options.name);
  if (!/^[\w-]+$/.test(options.name))
    throw new Error(
      "The name of the package is not valid. Please enter a valid one (only letters and dashes)."
    );

  return options;
};
