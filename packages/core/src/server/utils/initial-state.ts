import deepmerge from "deepmerge";
import { NormalizedSettings } from "@frontity/file-settings";
import { Package } from "@frontity/types";
import snakeToCamel from "../../utils/snake-to-camel";

/**
 * Options for {@link state}.
 */
interface StateOptions {
  /**
   * Settings for a frontity project. They are defined in a
   * [frontity.settings.js](https://docs.frontity.org/learning-frontity/project#the-frontity-setting-js-file)
   * file.
   */
  settings: NormalizedSettings;

  /**
   * The WHATWG parsed URL object for the current page. Passed from the
   * [context](https://koajs.com/#context) of the Koa app.
   */
  url: URL;
}

/**
 * Initialize the state of a Frontity project.
 *
 * @param options - Defined in {@link StateOptions}.
 * @returns The Frontity state object.
 */
const state = ({ settings, url }: StateOptions) => {
  const options = {};

  // Get all the params in the query string that start with "frontity_", add
  // them to `state.frontity.options` using camel case for the key and delete
  // them from the search. Avoid modifying the original `ctx.URL`.
  const searchParams = new URLSearchParams(url.search);
  url.searchParams.forEach((value, key) => {
    if (key.startsWith("frontity_")) {
      const camelKey = snakeToCamel(key.replace("frontity_", ""));
      options[camelKey] = value;
      searchParams.delete(key);
    }
  });
  const search = searchParams.toString() ? `?${searchParams.toString()}` : "";

  let state: Package["state"] = {
    frontity: {
      name: settings.name,
      mode: settings.mode,
      debug: false,
      platform: "server",
      rendering: "ssr",
      initialLink: `${url.pathname}${search}${url.hash}`,
      options,
      packages: settings.packages.map((pkg) => pkg.name),
    },
  };

  // Merge the initial state with the general state of settings.
  state = deepmerge(settings.state, state, {
    clone: false,
  });

  // Merge the state with each package state, in order.
  settings.packages.forEach((pkg) => {
    state = deepmerge(state, pkg.state, {
      clone: false,
    });
  });

  return state;
};

export default state;
