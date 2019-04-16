import program from "commander";
import { create, createPackage, dev, build, serve } from "./actions";
import emitter from "./emitter";
import { version } from "../package.json";

export { create, emitter };

// Sets the version and the description of the program.
program.version(version).description("Frontity CLI");

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
  .command("create-package [name]")
  .description("Creates a new Frontity package.")
  .action(createPackage);

program
  .command("dev")
  .description("Starts the project in development mode.")
  .action(dev);

program
  .command("build")
  .description("Builds the project for production.")
  .action(build);

program
  .command("serve")
  .description("Starts a server in production mode.")
  .action(serve);

// Parses the parameters and adds them to the `command` object.
program.parse(process.argv);
