import WpSource from "..";
import state from "./state";
import actions from "./actions";
import { Api, Resolver, populate, routeUtils } from "./libraries";

const wpSource = (): WpSource => {
  // const resolver = new Resolver();
  return {
    name: "@frontity/wp-source",
    state: {
      source: state
    },
    actions: {
      source: actions
    },
    libraries: {
      source: {
        api: new Api(),
        handlers: [],
        redirections: [],
        populate,
        ...routeUtils
      }
    }
  };
};

export default wpSource;
