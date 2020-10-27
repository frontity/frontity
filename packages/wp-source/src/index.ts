import WpSource from "../types";
import state from "./state";
import actions from "./actions";
import { Api, populate, routeUtils, responseUtils } from "./libraries";

/**
 * Return an instance of the {@link WpSource} package.
 *
 * @returns WpSource package.
 */
const wpSource = (): WpSource => ({
  name: "@frontity/wp-source",
  state: {
    source: state,
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
