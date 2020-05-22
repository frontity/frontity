import { Package } from "frontity/types";

interface UseInView extends Package {
  name: "use-in-view";
  state: {};
  actions: {};
  roots: {
    useInView: React.ReactType;
  };
  libraries: {};
}

export default UseInView;
