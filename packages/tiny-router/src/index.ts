import TinyRouter from "..";
import { set, init, beforeSSR } from "./actions";

const tinyRouter: TinyRouter = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      link: "/",
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
