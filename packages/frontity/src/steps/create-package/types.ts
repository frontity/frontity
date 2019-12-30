// Options passed to the `create-package` function.
export type Options = {
  // Name of the package.
  name?: string;
  // Namespace of the package.
  namespace?: string;
  // Path of the Frontity project.
  projectPath?: string;
  // Path where the package should be created (relative to `projectPath`).
  packagePath?: string;
  // Support for TypeScript.
  typescript?: boolean;
};
