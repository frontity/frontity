export type CreateOptions = {
  // Name of the app.
  name?: string;
  // Path where the app should be created.
  path?: string;
  // Generate the app inside the current working directory.
  useCwd?: boolean;
  // Support for TypeScript.
  typescript?: boolean;
  // Frontity packages that need to be installed.
  packages?: string[];
};
