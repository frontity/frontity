import { RouteParams } from "@frontity/source/types";
import WpSource from "../../types";

export const addFinalSlash = (path: string): string =>
  path.replace(/\/?$/, "/");

export const queryToObj = (query = "") =>
  query && query.includes("=")
    ? query.split("&").reduce((result, param) => {
        const [k, v] = param.split("=");
        result[k] = v;
        return result;
      }, {})
    : {};

export const objToQuery = (obj: Record<string, any>) => {
  const entries = Object.entries(obj);
  return entries.length
    ? `?${entries.map(([key, value]) => `${key}=${value}`).join("&")}`
    : "";
};

export const concatPath = (...paths: string[]) =>
  [""]
    .concat(...paths.map(path => path.split("/").filter(p => p)), "")
    .join("/");

export const decomposeRoute = (route: string) => {
  const [
    ,
    pathname,
    query,
    hash
  ] = /^(?:(?:[^:/?#]+):)?(?:\/\/(?:[^/?#]*))?([^?#]*)(?:\?([^#]*))?(#.*)?/.exec(
    route
  );
  return { pathname, query, hash };
};

export const routeToParams = (route: string): RouteParams => {
  const { pathname, query, hash } = decomposeRoute(route);
  const [, path, page] = /^(.*)page\/(\d+)\/?(\?.*)?$/.exec(pathname) || [
    null,
    pathname,
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

export const parse: WpSource["libraries"]["source"]["parse"] = route =>
  routeToParams(route);

export const stringify: WpSource["libraries"]["source"]["stringify"] = routeParams =>
  paramsToRoute(routeParams);

export const normalize = (route: string): string =>
  paramsToRoute(routeToParams(route));

export default { parse, stringify, normalize };
