import state from "../source/state";
import actions from "../source/actions";

import Api from "../libraries/api";
import Resolver from "../libraries/resolver";
import populate from "../libraries/populate";

import WpSource from "../type";

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
