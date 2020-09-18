import deepmerge from "deepmerge";
import { NormalizedSettings } from "@frontity/file-settings";
import { Package } from "@frontity/types";

/**
 * Options for {@link state}.
 */
interface StateOptions {
  /**
   * Settings for a frontity project.
   * They are defined in a [frontity.settings.js](https://docs.frontity.org/learning-frontity/project#the-frontity-setting-js-file) file.
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
  const paramsToDelete = ["frontity_source_auth", "frontity_name"];
  const options = {};
  const { searchParams } = url;

  paramsToDelete.forEach((param) => {
    if (searchParams.has(param)) {
      searchParams.delete(param);
      options[param] = searchParams.get(param);
    }
  });
  url.search = searchParams.toString();

  let state: Package["state"] = {
    frontity: {
      name: settings.name,
      mode: settings.mode,
      debug: false,
      platform: "server",
      rendering: "ssr",
      initialLink: `${url.pathname}${url.search}${url.hash}`,
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
