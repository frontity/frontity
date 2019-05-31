type RouteParams = {
  path: string;
  page?: number;
  query?: Record<string, any>;
};

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

export const routeToParams = (route: string): RouteParams => {
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

export const paramsToRoute = ({
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

export const normalize = (route: string): string =>
  paramsToRoute(routeToParams(route));

export default { routeToParams, paramsToRoute, normalize };
