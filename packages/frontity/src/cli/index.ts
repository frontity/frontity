#! /usr/bin/env node
import * as tsNode from "ts-node";

tsNode.register({
  transpileOnly: true,
  compilerOptions: {
    // Target latest version of ECMAScript.
    target: "es2017",
    // Search under node_modules for non-relative imports.
    moduleResolution: "node",
    // commonjs modules.
    module: "commonjs",
    // Allow default imports from modules with no default export.
    allowSyntheticDefaultImports: true,
    // Don't emit; allow Babel to transform files.
    noEmit: true,
    // Import non-ES modules as default imports.
    esModuleInterop: true,
    // Resolve JSON files.
    resolveJsonModule: true,
    // Support for JSX.
    jsx: "react",
    // Transpile JS as well.
    allowJs: true
  }
});

import program from "commander";
import { dev, build, serve } from "../commands";

import { default as create } from "./create";
import { default as createPackage } from "./create-package";
import { default as subscribe } from "./subscribe";
import { default as unknown } from "./unknown";
import { default as info } from "./info";

import packageJson from "../../package.json";

// Sets the version and the description of the program.
program
  .version(packageJson.version)
  .usage("<command> [options]")
  .description("Frontity CLI");

// Registers a `create` command that takes an optional
// parameter called `name`. It also accepts the following
// options: --typescript, --use-cwd.
program
  .command("create [name]")
  .option("-t, --typescript", "Adds support for TypeScript")
  .option("-c, --use-cwd", "Generates the project in the current directory.")
  .description("Creates a new Frontity project.")
  .action((name, { ...args }) => create({ name, ...args }));

program
  .command("create-package [name]")
  .option("-n, --namespace <value>", "Sets the namespace for this package")
  .description("Creates a new Frontity package in a project.")
  .action((name, { ...args }) => createPackage({ name, ...args }));

program
  .command("dev")
  .option("-p, --production", "Builds the project for production.")
  .option("--port <port>", "Runs the server on a custom port. Default is 3000.")
  .option("-s, --https", "Runs the server using https.")
  .option(
    "--dont-open-browser",
    "Don't open a browser window with the localhost."
  )
  .option(
    "--target <target>",
    'create bundles with "es5" or "module". Default target is "module".'
  )
  .description("Starts a server in development mode.")
  .action(dev);

program
  .command("build")
  .option("-d, --development", "Builds the project for development.")
  .option(
    "--target <target>",
    'create bundles with "es5" or "module". Default target is "module".'
  )
  .description("Builds the project for production.")
  .action(build);

program
  .command("serve")
  .option("--port <port>", "Runs the server on a custom port. Default is 3000.")
  .option("-s, --https", "Runs the server using https.")
  .description("Starts a server in production mode.")
  .action(serve);

program
  .command("subscribe [email]")
  .description("Subscribe to Frontity newsletter.")
  .action(subscribe);

program
  .command("info")
  .description("Get environment information for debugging and issue reporting.")
  .action(info);

program.on("command:*", ([command]: string[]) => unknown(command, program));

// Parses the arguments and adds them to the `command` object.
program.parse(process.argv);

if (!program.args.length) program.help();
