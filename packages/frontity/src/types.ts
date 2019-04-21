import { EventEmitter } from "events";

// Options passed to the `create` function.
export type CreateOptions = {
  // Name of the app.
  name?: string;
  // Path where the app should be created.
  path?: string;
  // Support for TypeScript.
  typescript?: boolean;
  // Frontity packages that need to be installed.
  packages?: string[];
  // Frontity starter theme to clone.
  theme?: string;
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
