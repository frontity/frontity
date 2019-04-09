import * as program from "commander";
import create from "./create";
import { version } from "../package.json";

// Sets the version and the description of the program.
program.version(version).description("Frontity CLI");

// Register the `create` command.
// - Takes an optional parameter called `name`.
// - Creates a new Frontity app.
program
  .command("create [name]")
  .description("Creates a new Frontity app.")
  .action(create);

program.parse(process.argv);
