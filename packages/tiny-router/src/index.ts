import TinyRouter from "../types";
import { set, init, beforeSSR } from "./actions";

const tinyRouter: TinyRouter = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      link: "/",
      state: {},
      autoFetch: true,
      redirections: "none",
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
