import { RouteParams } from "@frontity/source";
import WpSource from "../../";

export const getParams: WpSource["libraries"]["source"]["getParams"] = routeOrParams =>
  typeof routeOrParams === "string"
    ? routeToParams(routeOrParams)
    : {
        path: addFinalSlash(routeOrParams.path),
        page: routeOrParams.page || 1,
        query: routeOrParams.query || {}
      };

export const getRoute: WpSource["libraries"]["source"]["getRoute"] = routeOrParams =>
  typeof routeOrParams === "string"
    ? normalize(routeOrParams)
    : paramsToRoute(routeOrParams);

export default { getParams, getRoute };

// UTILS

const routeToParams = (route: string): RouteParams => {
  route = removeDomain(route);

  const [fullPath, query] = route.split("?");
  const [, path, page] = /^(.*)page\/(\d+)\/?(\?.*)?$/.exec(fullPath) || [
    null,
    fullPath,
    "1"
  ];

  return {
    path: addFinalSlash(path),
    page: parseInt(page, 10),
    query: queryToObj(query)
  };
};

const paramsToRoute = ({
  path = "/",
  page = 1,
  query = {}
}: RouteParams): string => {
  // correct path
  path = addFinalSlash(path);

  const pathAndPage = page > 1 ? `${path}page/${page}/` : path;
  const queryStr = objToQuery(query);

  return `${pathAndPage}${queryStr}`;
};

const normalize = (route: string): string =>
  paramsToRoute(routeToParams(route));

const removeDomain = (input: string): string => {
  const [, result] = /^(?:https?:\/\/[^\/]*)?(\/.*)$/.exec(input);
  return result;
};

const addFinalSlash = (path: string): string => path.replace(/\/?$/, "/");

const objToQuery = (obj: Record<string, any>) => {
  const entries = Object.entries(obj);
  return entries.length
    ? `?${entries.map(([key, value]) => `${key}=${value}`).join("&")}`
    : "";
};

const queryToObj = (query: string = "") =>
  query && query.includes("=")
    ? query.split("&").reduce((result, param) => {
        const [k, v] = param.split("=");
        result[k] = v;
        return result;
      }, {})
    : {};
