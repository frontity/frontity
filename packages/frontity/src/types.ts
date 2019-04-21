import { EventEmitter } from "events";

// Options passed to the `create` function.
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
  // Emitter used to send the process messages.
  emitter?: EventEmitter;
};

// Settings generated in `createPackageJson` function
// to populate the initial `package.json` file.
export type PackageJson = {
  name: string;
  version: string;
  description: string;
  keywords: string[];
  scripts: {
    dev: string;
    build: string;
    serve: string;
  };
};
