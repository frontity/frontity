import TinyRouter from "../type";
import { set, init } from "./actions";

const tinyRouter: TinyRouter = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      path: "/",
      page: null,
      url: state => `${new URL(state.frontity.url, state.router.path)}`
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
