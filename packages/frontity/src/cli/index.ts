#! /usr/bin/env node
import "./dotenv";
import program from "commander";
import { default as create } from "./create";
import { default as createPackage } from "./create-package";
import { default as dev } from "./dev";
import { default as build } from "./build";
import { default as serve } from "./serve";
import { default as subscribe } from "./subscribe";
import { default as unknown } from "./unknown";
import { default as info } from "./info";

import packageJson from "../../package.json";

// Sets the version and the description of the program.
program
  .version(packageJson.version, "-v, --version")
  .usage("<command> [options]")
  .description("Frontity CLI");

// Registers a `create` command that takes an optional
// parameter called `name`. It also accepts the following
// options: --typescript, --use-cwd.
program
  .command("create [name]")
  .option("--theme <theme>", "The theme to use")
  .option("--typescript", "Adds support for TypeScript")
  .option("--use-cwd", "Generates the project in the current directory.")
  .option("--no-prompt", "Skips prompting the user for options")
  .description("Creates a new Frontity project.")
  .action((name, { ...args }) => create({ name, ...args }));

program
  .command("create-package [name]")
  .option("--namespace <value>", "Sets the namespace for this package")
  .option("--no-prompt", "Skips prompting the user for options")
  .description("Creates a new Frontity package in a project.")
  .action((name, { ...args }) => createPackage({ name, ...args }));

program
  .command("dev")
  .option("--prod, --production", "Builds the project for production.")
  .option("--port <port>", "Runs the server on a custom port. Default is 3000.")
  .option("--https", "Runs the server using https.")
  .option(
    "--dont-open-browser",
    "Don't open a browser window with the localhost."
  )
  .option(
    "--target <target>",
    'create bundles with "es5" or "module". Default target is "module".'
  )
  .option("--publicPath <path>", "DEPRECATED, use --public-path instead.")
  .option(
    "--public-path <path>",
    'set the public path for static assets. Default path is "/static/".'
  )
  .description("Starts a server in development mode.")
  .action(dev);

program
  .command("build")
  .option("--dev, --development", "Builds the project for development.")
  .option(
    "--target <target>",
    'create bundles with "es5", "module" or "both". Default target is "both".'
  )
  .option("--publicPath <path>", "DEPRECATED, use --public-path instead.")
  .option(
    "--public-path <path>",
    'set the public path for static assets. Default path is "/static/".'
  )
  .description("Builds the project for production.")
  .action(build);

program
  .command("serve")
  .option("--port <port>", "Runs the server on a custom port. Default is 3000.")
  .option("--https", "Runs the server using https.")
  .description("Starts a server in production mode.")
  .action(serve);

program
  .command("subscribe [email]")
  .description("Subscribe to Frontity newsletter.")
  .action((email) => subscribe({ email }));

program
  .command("info")
  .description("Get environment information for debugging and issue reporting.")
  .action(info);

program.on("command:*", ([command]: string[]) => unknown(command, program));

// Parses the arguments and adds them to the `command` object.
program.parse(process.argv);

if (!program.args.length) program.help();
