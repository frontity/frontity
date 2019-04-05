import * as pathToRegexp from 'path-to-regexp';
import { Resolver } from "../types";

const initResolver = () : Resolver => ({
  // Array containing all registered patterns with their handlers
  registered: [],

  // Adds a handler to registered, using the pattern as key
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

export default initResolver();
