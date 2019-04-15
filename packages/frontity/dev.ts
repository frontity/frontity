import { resolve } from "path";
import create from "./src/commands/create";
import emitter from "./src/emitter";

emitter.on("create", console.log);

create({
  name: "random-name",
  path: resolve(process.cwd(), "random-name"),
  packages: ["frontity", "@frontity/share", "@frontity/h2r"],
  typescript: true
});
