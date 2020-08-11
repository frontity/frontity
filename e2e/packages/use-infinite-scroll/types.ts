import { Package, Action, ServerAction } from "frontity/types";
import TinyRouter from "@frontity/tiny-router/types";
import WpSource from "@frontity/wp-source/types";

interface UseInfiniteScroll extends Package {
  name: "use-infinite-scroll";
  actions: {
    theme: {
      init: Action<Packages>;
      beforeSSR: ServerAction<Packages>;
    };
  };
  roots: {
    useInfiniteScroll: React.ReactType;
  };
}

export type Packages = UseInfiniteScroll & TinyRouter & WpSource;

export default UseInfiniteScroll;
