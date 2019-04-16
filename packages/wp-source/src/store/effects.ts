import fetch from "cross-fetch";
import { normalize } from "normalizr";
import pathToRegexp from "path-to-regexp";
import { Key } from "path-to-regexp";
import { Context, Handler } from "./types";
import * as schemas from "../schemas";

const wpComBase = "https://public-api.wordpress.com/wp/v2/sites/";

class Api {
  siteUrl = "";
  isWpCom = false;

  init(
    this: Api,
    { siteUrl, isWpCom = false }: { siteUrl: string; isWpCom?: boolean }
  ) {
    this.siteUrl = siteUrl;
    this.isWpCom = isWpCom;
  }

  async get(
    this: Api,
    {
      endpoint,
      params,
      siteUrl = this.siteUrl,
      isWpCom = this.isWpCom
    }: {
      endpoint: string;
      params?: { [param: string]: any };
      siteUrl?: string;
      isWpCom?: boolean;
    }
  ): Promise<{
    isOk: boolean;
    entities?: any;
    total?: number;
    totalPages?: number;
  }> {
    // Build the base URL depending on whether it is WP.com or WP.org
    const baseUrl = isWpCom
      ? `${wpComBase}${siteUrl.replace(/^https?:\/\//, "")}/`
      : `${siteUrl}/wp-json`;

    // Add the REST path depending on whether it should start
    // with "/wp/v2" or not
    const requestUrl =
      isWpCom || endpoint.startsWith("/")
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
    let response: Response;

    try {
      // TODO: Handle redirects and stuff in the near future
      response = await fetch(`${requestUrl}${query}`);
      const json = await response.json();
      const isOk = response.ok;
      const total = response.headers.get("X-WP-Total");
      const totalPages = response.headers.get("X-WP-TotalPages");

      // Normalize response
      const { entities } = normalize(
        json,
        json instanceof Array ? schemas.list : schemas.entity
      );

      return {
        isOk,
        entities,
        total: total && parseInt(total),
        totalPages: totalPages && parseInt(totalPages)
      };
    } catch (e) {
      return { isOk: false };
    }
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
  ): { handler: Handler; params: { [param: string]: any } } {
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
