import TinyRouter from "../types";
import { set, init, updateState, beforeSSR } from "./actions";

const tinyRouter: TinyRouter = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      link: "/",
      state: {},
      autoFetch: true,
    },
  },
  actions: {
    router: {
      init,
      set,
      updateState,
      beforeSSR,
    },
  },
  libraries: {},
};

export default tinyRouter;
