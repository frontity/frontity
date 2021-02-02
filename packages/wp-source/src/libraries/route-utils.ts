import { LinkParams } from "@frontity/source/types";
import WpSource from "../../types";
import pathToRegexp from "path-to-regexp";

/**
 * Add the final slash to a link. It does nothing if the link already has a
 * final slash.
 *
 * @param link - The link to be processed.
 *
 * @returns The same link but with the final slash.
 */
export const addFinalSlash = (link: string): string =>
  link.replace(/\/?$/, "/");

/**
 * Add the first slash to a link. It does nothing if the link already has a
 * leading slash.
 *
 * @param link - The link to be processed.
 *
 * @returns The same link but with the leading slash.
 */
export const addLeadingSlash = (link: string): string =>
  link.replace(/^\/?/, "/");

/**
 * Turn a query string into a query object.
 *
 * @param queryString - The query, in string format.
 *
 * @returns An object with the queries and its values.
 */
export const queryToObj = (queryString = ""): Record<string, string> =>
  queryString && queryString.includes("=")
    ? queryString.split("&").reduce((result, param) => {
        const [k, v] = param.split("=");
        result[k] = v;
        return result;
      }, {})
    : {};

/**
 * Turn a query object into a query string.
 *
 * @param queryObject -  The query object.
 *
 * @returns The query, in string format.
 */
export const objToQuery = (queryObject: Record<string, any>) => {
  const entries = Object.entries(queryObject).sort(([a], [b]) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  return entries.length
    ? `?${entries.map(([key, value]) => `${key}=${value}`).join("&")}`
    : "";
};

/**
 * Concatenate links together, making sure there are no double slashes.
 *
 * @param links - The links to be concatenated.
 *
 * @returns The final link.
 */
export const concatLink = (...links: string[]) =>
  [""]
    .concat(...links.map((path) => path.split("/").filter((p) => p)), "")
    .join("/");

/**
 * The return of the {@link extractLinkParts} function.
 */
interface ExtractLinkPartsReturn {
  /**
   * The pathname of the link.
   */
  pathname: string;

  /**
   * The query string of the link.
   */
  queryString: string;

  /**
   * The hash part of the link.
   */
  hash: string;
}

/**
 * Extract the different link parts: pathname, query and hash.
 *
 * @param link - The link.
 *
 * @returns An object with the different parts of the link. Defined in {@link
 * ExtractLinkPartsReturn}.
 */
export const extractLinkParts = (link: string): ExtractLinkPartsReturn => {
  const [
    ,
    pathname,
    queryString,
    hash,
  ] = /^(?:(?:[^:/?#]+):)?(?:\/\/(?:[^/?#]*))?([^?#]*)(?:\?([^#]*))?(#.*)?/.exec(
    link
  );
  return { pathname, queryString, hash };
};

/**
 * Extract the different Frontity link params.
 *
 * @param link - The link.
 *
 * @returns The link params, defined by {@link LinkParams}.
 */
const linkToParams = (link: string): LinkParams => {
  const { pathname, queryString, hash } = extractLinkParts(link);
  const [, path, page] = /^(.*)page\/(\d+)\/?(\?.*)?$/.exec(pathname) || [
    null,
    pathname,
    "1",
  ];

  return {
    path: addFinalSlash(path),
    route: addFinalSlash(path),
    page: parseInt(page, 10),
    query: queryToObj(queryString),
    queryString: objToQuery(queryToObj(queryString)),
    hash,
  };
};

/**
 * Turn a set of Frontity link params into a string link.
 *
 * @param linkParams - The link params, defined by {@link LinkParams}.
 *
 * @returns The link, in string format.
 */
const paramsToLink = ({
  path = "/",
  route,
  page = 1,
  query = {},
  hash = "",
}: LinkParams): string => {
  // Use route if present, otherwise use path.
  path = route || path;

  // Correct the path.
  path = addFinalSlash(path);

  const pathAndPage = page > 1 ? `${path}page/${page}/` : path;
  const queryString = objToQuery(query);

  return `${pathAndPage.toLowerCase()}${queryString}${hash}`;
};

/**
 * Extract the different Frontity link params.
 *
 * @param link - The link.
 *
 * @returns The link params, defined by {@link LinkParams}.
 */
export const parse: WpSource["libraries"]["source"]["parse"] = (link) =>
  linkToParams(link);

/**
 * Turn a set of Frontity link params into a string link.
 *
 * @param linkParams - The link params, defined by {@link LinkParams}.
 *
 * @returns The link, in string format.
 */
export const stringify: WpSource["libraries"]["source"]["stringify"] = (
  linkParams
) => paramsToLink(linkParams);

/**
 * Normalize a link, making sure that multiple links that should point to
 * the same canonical link are processed as a single one.
 *
 * It also strips out the "/amp" from the link, which is used on AMP pages.
 * TODO: This behaviour should be moved to a Frontity hook in source v2.
 *
 * @example `/some-post -> /some-post/`
 * @example `/some-post/amp -> /some-post/`
 *
 * @param link - The link to be normalized.
 *
 * @returns The normalized link.
 */
export const normalize = (link: string): string => {
  const regex = pathToRegexp("/(category|tag|author)/amp");

  if (!link.match(regex)) {
    link = link.replace(/\/amp$/, "");
  }
  return paramsToLink(linkToParams(link));
};

export default { parse, stringify, normalize };
