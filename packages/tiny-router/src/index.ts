import TinyRouter from "../types";
import { set, init, beforeSSR } from "./actions";

const tinyRouter: TinyRouter = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      link: "/",
      state: {},
      autoFetch: true,
      redirections: "no",
    },
  },
  actions: {
    router: {
      init,
      set,
      beforeSSR,
    },
  },
  libraries: {},
};

export default tinyRouter;
