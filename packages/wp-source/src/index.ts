import WpSource from "./type";
import state from "./source/state";
import actions from "./source/actions";

import { Api, Resolver, populate } from "./libraries";

const wpSource = ({ libraries }): WpSource => ({
  name: "@frontity/wp-source",
  namespaces: ["source"],
  state: {
    source: state
  },
  actions: {
    source: actions(libraries)
  },
  libraries: {
    source: {
      api: new Api(),
      resolver: new Resolver(),
      populate
    }
  }
});

export default wpSource;
