import pathToRegexp, { Key } from "path-to-regexp";
import { Handler } from "../type";

class Resolver {
  // Array containing all registered patterns with their handlers
  registered: {
    pattern: string;
    handler: Handler;
    regexp: RegExp;
    keys: Key[];
  }[] = [];

  init(this: Resolver) {
    this.registered = [];
  }

  // Adds a handler to registered
  add(this: Resolver, pattern: string, handler: Handler): void {
    const keys = [];
    const regexp = pathToRegexp(pattern, keys);
    this.registered.push({ pattern, handler, regexp, keys });
  }

  // Gets the appropriate handler and params after a match
  match(
    this: Resolver,
    name: string
  ): { handler: Handler; params: { [param: string]: any } } | null {
    let handler;
    let params = {};

    // Parse query if it exists
    const [path, query] = name.split("?");
    const queryParams = query
      ? query.split("&").reduce((result, param) => {
          const [k, v] = param.split("=");
          result[k] = v;
          return result;
        }, {})
      : {};

    // Then process the path
    const found = this.registered.find(({ regexp }) => regexp.test(path));

    if (!found) return null;

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

    // Return handler and params
    return { handler, params };
  }
}

export default Resolver;
