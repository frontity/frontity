import fetch from "cross-fetch";
import pathToRegexp from "path-to-regexp";
import { Key } from "path-to-regexp";
import { Context, Handler } from "../types";

const wpComBase = "https://public-api.wordpress.com/wp/v2/sites/";

class Api {
  apiUrl = "";
  isCom = false;

  init(
    this: Api,
    { apiUrl, isCom = false }: { apiUrl: string; isCom?: boolean }
  ) {
    this.apiUrl = apiUrl;
    this.isCom = isCom;
  }

  get(
    this: Api,
    {
      endpoint,
      params,
      apiUrl = this.apiUrl,
      isCom = this.isCom
    }: {
      endpoint: string;
      params?: { [param: string]: any };
      apiUrl?: string;
      isCom?: boolean;
    }
  ): Promise<Response> {
    // Build the base URL depending on whether it is WP.com or WP.org
    const baseUrl = isCom
      ? `${wpComBase}${apiUrl.replace(/^https?:\/\//, "")}/`
      : `${apiUrl}/wp-json`;

    // Add the REST path depending on whether it should start
    // with "/wp/v2" or not
    const requestUrl =
      isCom || endpoint.startsWith("/")
        ? `${baseUrl}${endpoint}`
        : `${baseUrl}/wp/v2/${endpoint}`;

    // Add query parameters
    const query = params
      ? `?${Object.entries(params)
          .filter(([key, value]) => value)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`
      : "";

    // Send request
    return fetch(`${requestUrl}${query}`);
  }
}

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
    ctx: Context,
    { name, page }: { name: string; page?: number }
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

export const api = new Api();
export const resolver = new Resolver();
