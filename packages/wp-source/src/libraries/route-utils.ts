import WpSource from "../../types";

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
 * RegExp used inside {@link extractLinkParts} for parsing links into parts.
 * It's not directly replaceable with {@link URL}.
 *
 * @remarks Code explanation:
 *
 * ```
 * ^              // Beginning of line
 *
 * (?:            // Protocol (optional)
 *   (?:[^:/?#]+) // Any character other than ':', '/', '?', '#'
 *   :            // ':' character
 * )?
 *
 * (?:            // Host (optional)
 *   \/\/         // The double-slash that follows the protocol
 *   (?:[^/?#]*)  // Hostname and port
 * )?
 *                // Pathname
 * ([^?#]*)       // 1st capturing group
 *
 * (?:            // Search (optional)
 *   \?           // [?] character
 *   ([^#]*)      // 2nd capturing group (note: the [?] is not included)
 * )?
 *                // Hash (optional)
 * (#.*)?         // 3rd capturing group
 * ```
 */
const extractLinkRegExp =
  /^(?:(?:[^:/?#]+):)?(?:\/\/(?:[^/?#]*))?([^?#]*)(?:\?([^#]*))?(#.*)?/;

/**
 * Extract the different link parts: pathname, query and hash.
 *
 * @param link - The link.
 *
 * @returns An object with the different parts of the link. Defined in {@link
 * ExtractLinkPartsReturn}.
 */
export const extractLinkParts = (link: string): ExtractLinkPartsReturn => {
  const [, pathname, queryString, hash] = extractLinkRegExp.exec(link);
  return { pathname, queryString, hash };
};

/**
 * RegExp used inside {@link parse} to extract the path and page number.
 *
 * @remarks Code explanation:
 *
 * ```
 * ^       // Beginning of line
 * (.*)    // Pathname (1st capturing group)
 * page\/  // The "page/" string
 * (\d+)   // Page number (2nd capturing group)
 * \/?     // Optional "/"
 * (\?.*)? // Optional query string
 * $       // End of line
 * ```
 */
const pageNumberRegexp = /^(.*)page\/(\d+)\/?(\?.*)?$/;

/**
 * Extract the different Frontity link params.
 *
 * @param link - The link.
 *
 * @returns The link params, defined by {@link LinkParams}.
 */
export const parse: WpSource["libraries"]["source"]["parse"] = (link) => {
  const { pathname, queryString, hash } = extractLinkParts(link);
  const [, path, page] = pageNumberRegexp.exec(pathname) || [
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
export const stringify: WpSource["libraries"]["source"]["stringify"] = ({
  path = "/",
  route,
  page = 1,
  query = {},
  hash = "",
}) => {
  // Use route if present, otherwise use path.
  route = route || path;

  // Correct the route.
  route = addFinalSlash(route);

  const pathAndPage = page > 1 ? `${route}page/${page}/` : route;
  const queryString = objToQuery(query);

  return `${pathAndPage.toLowerCase()}${queryString}${hash}`;
};

/**
 * Normalize a link, making sure that multiple links that should point to
 * the same canonical link are processed as a single one.
 *
 * @example `/some-post -> /some-post/`
 *
 * @param link - The link to be normalized.
 *
 * @returns The normalized link.
 */
export const normalize = (link: string): string => stringify(parse(link));

export default { parse, stringify, normalize };
