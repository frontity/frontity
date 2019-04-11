import { EventEmitter } from "events";
import { resolve } from "path";
import { ensureDirSync } from "fs-extra";
import { isEmptyDir, normalizeOptions } from "../utils";
import { CreateOptions } from "../types";

const events = new EventEmitter();

export default (passedOptions?: CreateOptions): void => {
  // Parses and validates options.
  events.emit("create", "Parsing and validating options...");
  const options = normalizeOptions(passedOptions);
  const path =
    !options.useCwd && options.name
      ? resolve(options.path, options.name)
      : options.path;

  // Creates a directory in that path if it doesn't already exist.
  events.emit("create", "Ensuring directory...");
  ensureDirSync(path);

  // Check if the directory is empty.
  if (!isEmptyDir(path))
    throw new Error("The directory passed to `create` function is not empty");

  events.emit("Generating `package.json`...");
};

export { events };
