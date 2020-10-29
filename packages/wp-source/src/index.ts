import WpSource from "../types";
import state from "./state";
import actions from "./actions";
import { Api, populate, routeUtils, responseUtils } from "./libraries";

/**
 * The function that returns the wp-source package.
 *
 * @returns The wp-source package which includes its `state`, `actions` & `libraries`.
 */
const wpSource = (): WpSource => ({
  name: "@frontity/wp-source",
  state: {
    source: state,
    wpSource: {
      prefix: "/wp-json",
    },
  },
  actions: {
    source: actions,
  },
  libraries: {
    source: {
      api: new Api(),
      handlers: [],
      redirections: [],
      populate,
      ...routeUtils,
      ...responseUtils,
    },
  },
});

export default wpSource;
