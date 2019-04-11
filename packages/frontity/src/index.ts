import program from "commander";
import create from "./commands/create";
import { version } from "../package.json";

// Sets the version and the description of the program.
program.version(version).description("Frontity CLI");

// Register the `create` command.
// - Takes an optional parameter called `name`.
// - Creates a new Frontity app.
program
  .command("create [name]")
  .option("-ts, --typescript", "Adds support for TypeScript")
  .description("Creates a new Frontity app.")
  .action((name: string, _command) => {
    create({ name });
  });

program.parse(process.argv);
