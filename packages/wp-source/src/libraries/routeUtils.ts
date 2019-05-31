type RouteParams = {
  path: string;
  page?: number;
  query?: string | Record<string, any>;
};

const removeDomain = (input: string): string => {
  const [, result] = /^(?:https?:\/\/[^\/]*)?(\/.*)$/.exec(input);
  return result;
};

const addFinalSlash = (path: string): string => path.replace(/\/?$/, "/");

const objToQuery = (obj: Record<string, any>) =>
  `?${Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;

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
    query: query ? `?${query}` : ""
  };
};

export const paramsToRoute = ({
  path = "/",
  page = 1,
  query = ""
}: RouteParams): string => {
  // correct path
  path = addFinalSlash(path);

  const pathAndPage = page > 1 ? `${path}page/${page}/` : path;
  const queryStr = typeof query === "string" ? query : objToQuery(query);

  return `${page > 1 ? `${path}page/${page}/` : path}${queryStr}`;
};

export const normalize = (route: string): string =>
  paramsToRoute(routeToParams(route));

export default { routeToParams, paramsToRoute, normalize };
