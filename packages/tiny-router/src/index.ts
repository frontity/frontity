import TinyRouter from "../types";
import { set, init, beforeSSR } from "./actions";
import WPSource from "@frontity/wp-source/src";

const tinyRouter: TinyRouter = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      link: "/",
      autoFetch: true
    },
    source: WPSource().state.source // TODO: notr sure if that's correct
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
