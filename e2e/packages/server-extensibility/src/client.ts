import Root from "./components";
import type ServerExtensibility from "../types";

const serverExtensibility: ServerExtensibility = {
  name: "e2e-server-extensibility",
  roots: {
    serverExtensibility: Root,
  },
};

export default serverExtensibility;
