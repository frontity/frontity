import WpSource from "../types";
import state from "./state";
import actions from "./actions";
import { Api, populate, routeUtils, responseUtils } from "./libraries";

/**
 * Return an instance of the {@link WpSource} package which includes its
 * `state`, `actions` & `libraries`.
 *
 * @returns WpSource package.
 */
const wpSource = (): WpSource => ({
  name: "@frontity/wp-source",
  state: {
    source: state,
    wpSource: {
      // Just copy the value of `state.source.api` until we deprecate it and
      // move its logic to `state.wpSource.api` in the v2.
      api: ({ state }) => state.source.api,
      // Just copy the value of `state.source.isWpCom` until we deprecate it and
      // move its logic to `state.wpSource.isWpCom` in the v2.
      isWpCom: ({ state }) => state.source.isWpCom,
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
