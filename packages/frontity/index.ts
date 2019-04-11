import create, { events } from "./src/commands/create";

events.on("create", console.log);
create({ name: "random-name" });
