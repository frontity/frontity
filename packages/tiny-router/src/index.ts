import TinyRouter from "..";
import { set, init } from "./actions";

const tinyRouter: TinyRouter = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      path: "/",
      page: 1
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
