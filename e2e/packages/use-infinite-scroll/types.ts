import { Package } from "frontity/types";
import TinyRouter from "@frontity/tiny-router/types";
import WpSource from "@frontity/wp-source/types";

interface UseInfiniteScroll extends Package {
  name: "use-infinite-scroll";
  state: {
    router?: TinyRouter["state"]["router"];
    source?: WpSource["state"]["source"];
  };
  actions: {
    router?: TinyRouter["actions"]["router"];
    source?: WpSource["actions"]["source"];
  };
  roots: {
    useInfiniteScroll: React.ReactType;
  };
  libraries: {};
}

export default UseInfiniteScroll;
