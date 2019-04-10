import pathToRegexp from 'path-to-regexp';
import fetch from "node-fetch";
import { Api, Resolver } from "./types";

const wpComBase = "https://public-api.wordpress.com/wp/v2/sites/";

const api: Api = {
  get: ({ endpoint, params, siteUrl, isWpCom }) => {
    // Build the base URL depending on whether it is WP.com or WP.org
    const baseUrl = isWpCom
      ? `${wpComBase}${siteUrl.replace(/^https?:\/\//, "")}/`
      : `${siteUrl}/wp-json`;

    // Add the REST path depending on whether it should start
    // with "/wp/v2" or not
    const requestUrl = isWpCom || endpoint.startsWith("/")
      ? `${baseUrl}${endpoint}`
      : `${baseUrl}/wp/v2/${endpoint}`;

    // Add query parameters
    const query = params
      ? `?${Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`
      : "";

    // Send request and return promise
    return fetch(`${requestUrl}${query}`);
  }
};

const initResolver = () : Resolver => ({
  // Array containing all registered patterns with their handlers
  registered: [],

  // Adds a handler to registered
  add(this: Resolver, pattern, handler) {
    const keys = [];
    const regexp = pathToRegexp(pattern, keys);
    this.registered.push({ pattern, handler, regexp, keys });
  },

  // Gets the appropriate handler and params after a match
  match(this: Resolver, name) {
    let handler;
    let params = {};

    // Parse query if it exists
    const [path, query] = name.split('?');
    const queryParams = query
      ? query.split('&').reduce((result, param) => {
          const [k, v] = param.split('=');
          result[k] = v;
          return result;
        }, {})
      : {};

    // Then process the path
    const found = this.registered.find(({ regexp }) => regexp.test(path));
    if (found) {
      const { regexp, keys } = found;
      const pathParams = path
        .match(regexp)
        .slice(1)
        .reduce((result, value, index) => {
          result[keys[index].name] = value;
          return result;
        }, {});

      // Set handler
      handler = found.handler;

      // Merge all params
      params = Object.assign(pathParams, queryParams);
    }

    return { handler, params };
  },
})

const resolver = initResolver();

export { api, resolver };