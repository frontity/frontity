import state from "../source/state";
import * as actions from "../source/actions";

import Api from "../libraries/api";
import Resolver from "../libraries/resolver";
import populate from "../libraries/populate";

import WpSource from "../types";

const wpSource: WpSource = {
  name: "@frontity/wp-source",
  state: {
    settings: {
      source: {
        apiUrl: "https://test.frontity.io",
        isCom: false
      }
    },
    source: state
  },
  actions: {
    source: actions
  },
  libraries: {
    api: new Api(),
    resolver: new Resolver(),
    populate
  }
};

export default wpSource;
