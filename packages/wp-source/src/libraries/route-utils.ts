import { RouteParams } from "@frontity/source";
import WpSource from "../../";

export const parse: WpSource["libraries"]["source"]["parse"] = route =>
  routeToParams(route);

export const stringify: WpSource["libraries"]["source"]["stringify"] = routeParams =>
  paramsToRoute(routeParams);

export const normalize = (route: string): string =>
  paramsToRoute(routeToParams(route));

export default { parse, stringify, normalize };

// UTILS

export const routeToParams = (route: string): RouteParams => {
  const [
    ,
    fullPath,
    query,
    hash
  ] = /^(?:(?:[^:/?#]+):)?(?:\/\/(?:[^/?#]*))?([^?#]*)(?:\?([^#]*))?(#.*)?/.exec(
    route
  );
  const [, path, page] = /^(.*)page\/(\d+)\/?(\?.*)?$/.exec(fullPath) || [
    null,
    fullPath,
    "1"
  ];

  return {
    path: addFinalSlash(path),
    page: parseInt(page, 10),
    query: queryToObj(query),
    hash
  };
};

export const paramsToRoute = ({
  path = "/",
  page = 1,
  query = {},
  hash = ""
}: RouteParams): string => {
  // correct path
  path = addFinalSlash(path);

  const pathAndPage = page > 1 ? `${path}page/${page}/` : path;
  const queryStr = objToQuery(query);

  return `${pathAndPage}${queryStr}${hash}`;
};

export const addFinalSlash = (path: string): string =>
  path.replace(/\/?$/, "/");

export const objToQuery = (obj: Record<string, any>) => {
  const entries = Object.entries(obj);
  return entries.length
    ? `?${entries.map(([key, value]) => `${key}=${value}`).join("&")}`
    : "";
};

export const queryToObj = (query: string = "") =>
  query && query.includes("=")
    ? query.split("&").reduce((result, param) => {
        const [k, v] = param.split("=");
        result[k] = v;
        return result;
      }, {})
    : {};
