import TinyRouter from "../types";
import { set, init, beforeSSR } from "./actions";

const tinyRouter: TinyRouter = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      link: "/",
      history: [],
      autoFetch: true
    }
  },
  actions: {
    router: {
      init,
      set,
      beforeSSR
    }
  },
  libraries: {}
};

export default tinyRouter;
