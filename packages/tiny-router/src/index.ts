import TinyRouter from "../type";
import { set, init } from "./actions";

const tinyRouter: TinyRouter = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      path: "/",
      page: null,
      url: state => {
        const baseUrl = state.frontity.url;
        const { path, page } = state.router;
        return `${new URL(
          page > 1 ? path.replace(/\/?$/, `/page/${page}`) : path,
          baseUrl
        )}`;
      }
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
