import clone from "clone-deep";
import WpSource from "../types";
import state from "./state";
import actions from "./actions";
import { Api, populate, routeUtils, responseUtils } from "./libraries";

const wpSource = (): WpSource => ({
  name: "@frontity/wp-source",
  state: {
    source: clone(state)
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
      ...routeUtils,
      ...responseUtils
    }
  }
});

export default wpSource;
