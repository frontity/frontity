import { isEmptyDir } from "./utils";

type Options = {
  // Name of the app.
  name: string;
  // Path where the app should be created.
  path?: string;
  // Generate app inside a new directory.
  cwd?: boolean;
  // Support for TypeScript.
  typescript?: boolean;
  // Frontity packages that need to be installed.
  packages?: string[];
};

// There are different options of how this function should work:
// 1. We need a new dir so we create a new dir named after `options.name`
//    inside the path `options.path`.
// 2. We don't need a new dir, so we generate the app in the cwd or path passed.

export default (options: Options) => {
  isEmptyDir(process.cwd());
};
