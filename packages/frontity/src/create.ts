import { Command } from "commander";

export default (name: string, _command: Command) => {
  console.log("My new app name is:", name);
};
