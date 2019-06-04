import TinyRouter from "..";
import { set, init } from "./actions";

const tinyRouter: TinyRouter = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      path: "/",
      page: 1,
      query: {}
    }
  },
  actions: {
    router: {
      init,
      set
    }
  },
  libraries: {}
};

export default tinyRouter;
