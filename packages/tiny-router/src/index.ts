import TinyRouter from "../type";
import { set, init } from "./actions";

const tinyRouter: TinyRouter = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      path: "/",
      page: null
    }
  },
  actions: {
    router: {
      init,
      set
    }
  }
};

export default tinyRouter;
