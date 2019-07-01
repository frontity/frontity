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
import { readFileSync } from "fs-extra";
import { resolve } from "path";
import { create, dev, build, serve, subscribe, info, unknown } from "./actions";

const { version } = JSON.parse(
  readFileSync(resolve(__dirname, "../package.json"), { encoding: "utf8" })
);

// Sets the version and the description of the program.
program
  .version(version)
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
  .action(create);

program
  .command("dev")
  .option("-p, --production", "Builds the project for production.")
  .option("--port <port>", "Runs the server on a custom port. Default is 3000.")
  .option("-s, --https", "Runs the server using https.")
  .option("--target <target>")
  .description("Starts a server in development mode.")
  .action(dev);

program
  .command("build")
  .option("-d, --development", "Builds the project for development.")
  .option("--target <target>")
  .description("Builds the project for production.")
  .action(build);

program
  .command("serve")
  .option("--port <port>", "Runs the server on a custom port. Default is 3000.")
  .option("-s, --https", "Runs the server using https.")
  .description("Starts a server in production mode.")
  .action(serve);

program
  .command("subscribe <email>")
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
