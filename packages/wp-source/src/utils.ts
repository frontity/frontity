import { RedirectionData } from "@frontity/source/types";
import { fetch } from "frontity";
import { State } from "frontity/types";
import { Packages } from "../types";

/**
 * The options for the {@link fetchRedirection} function.
 */
interface FetchRedirectionOptions {
  /**
   * The original link that we need to check for redirections.
   */
  link: string;

  /**
   * The Frontity state.
   */
  state: State<Packages>;
}

/**
 * The options of the {@link getRedirectionData} function.
 */
interface GetRedirectionDataOptions {
  /**
   * The HTTP status.
   */
  status: 301 | 302 | 307 | 308;

  /**
   * The new link.
   */
  location: string;

  /**
   * The Frontity URL.
   */
  frontityUrl: string;

  /**
   * The source backend URL.
   */
  sourceUrl: string;
}

/**
 * A helper for fetching the 30x redirections.
 * Used to abstract the differences in fetching the redirections
 * between the client and the server.
 *
 * @param link - The URL from which the redirection should be fetched.
 * @param state - The state of Frontity.
 *
 * @returns A promise that resolves in a partial redirection data that can be
 * used to populate an `state.source.data` object or null if there's no
 * redirection.
 */
export const fetchRedirection = async ({
  link,
  state,
}: FetchRedirectionOptions): Promise<Partial<RedirectionData>> => {
  // Remove the trailing slash before concatenating the link
  const redirectionURL = state.source.url.replace(/\/$/, "") + link;

  try {
    if (state.frontity.platform === "server") {
      // On the server we have to fetch with `redirect: manual` so that we can
      // check the status code of the redirection.
      const response = await fetch(redirectionURL, {
        method: "HEAD",
        redirect: "manual",
      });

      // On the server we check the status of the response.
      if (
        response.status === 301 ||
        response.status === 302 ||
        response.status === 307 ||
        response.status === 308
      ) {
        return getRedirectionData({
          status: response.status,
          location: response.headers.get("location"),
          frontityUrl: state.frontity.url,
          sourceUrl: state.source.url,
        });
      }
    } else {
      // On the client it is not possible to get the actual status code of the
      // redirection if you use the `redirect: manual` option because of
      // https://fetch.spec.whatwg.org/#atomic-http-redirect-handling. The
      // `redirect: manual` option on the client returns an "opaque response"
      // object which always has the status of 0 and doesn't contain the final
      // URL.

      // First, try to do a normal fetch. If CORS is setup it will succeed and we
      // will know if it is a redirection or not.
      try {
        const response = await fetch(redirectionURL, {
          method: "HEAD",
        });

        // We check the property `redirected`. We don't know the status because
        // it returns 200, so we always use 301.
        if (response.redirected)
          return getRedirectionData({
            status: 301,
            location: response.url,
            frontityUrl: state.frontity.url,
            sourceUrl: state.source.url,
          });
      } catch (error) {
        // If the fetch fails, we fallback to using `redirect: manual` to see at
        // least if there is a redirect or not. If it is, we don't know the final
        // URL but we will store it as external.
        const response = await fetch(redirectionURL, {
          method: "HEAD",
          redirect: "manual",
        });

        if (response.type === "opaqueredirect") {
          // If there is a redirection, we don't know to which URL, but we can
          // mark is as external, so if the client needs to go to the URL it can
          // do a SSR'ed request and at least it would work.
          const redirectionData = getRedirectionData({
            status: 301,
            location: redirectionURL,
            frontityUrl: state.frontity.url,
            sourceUrl: state.source.url,
          });
          redirectionData.isExternal = true;
          return redirectionData;
        }
      }
    }
  } catch (error) {
    // If the fetch fails we don't do anything, just return true;
  }
  return null;
};

/**
 * Check if it is an eager redirection, which means a redirection that needs
 * to be checked before we fetch the backend for the data.
 *
 * @param redirections - The redirections setting of
 * `state.source.redirections`.
 * @param link - The link to match the redirection with.
 *
 * @returns Whether or not it should try to fetch a redirection.
 */
export const isEagerRedirection = (
  redirections: string | string[],
  link: string
): boolean => {
  if (redirections === "all") {
    // It could simply all, which means that it always has to check for a
    // redirection.
    return true;
  } else if (Array.isArray(redirections)) {
    // It could be an array of RegExps and one of them matches the link.
    const patterns = redirections
      .filter((r) => r.startsWith("RegExp:"))
      .map((r) => r.replace(/^RegExp:/, ""));
    return patterns.some((r) => link.match(r));
  } else if (redirections?.startsWith("RegExp:")) {
    // Or it could be a single RegExp that matches the link.
    if (link.match(redirections.replace(/^RegExp:/, ""))) return true;
  }
};

/**
 * Check if it is a 404 redirection, which means a redirection that needs
 * to be checked after we have catched a 404 error from the backend.
 *
 * @param redirections - The redirections setting of
 * `state.source.redirections`.
 *
 * @returns Whether or not it should try to fetch a redirection.
 */
export const is404Redirection = (redirections: string | string[]): boolean => {
  return (
    redirections === "404" ||
    (Array.isArray(redirections) && redirections.includes("404"))
  );
};

/**
 * Prepare the redirection data to populate a data object that is a redirection.
 *
 * @param location - The final url of the redirection.
 * @param status - The status code of the redirection.
 * @param sourceUrl - The url of the backend, usually defined in
 * `state.source.url`.
 * @param frontityUrl - The url of the backend, usually defined in
 * `state.frontity.url`.
 *
 * @returns A data object to populate the state, defined in {@link
 * RedirectionData}.
 */
export const getRedirectionData = ({
  location,
  status,
  sourceUrl,
  frontityUrl,
}: GetRedirectionDataOptions): Partial<RedirectionData> => ({
  isExternal:
    new URL(location).host !== new URL(sourceUrl).host &&
    new URL(location).host !== new URL(frontityUrl).host,
  location,
  redirectionStatus: status,
  [`is${status}`]: true,
  isRedirection: true,
  isReady: true,
  isFetching: false,
});
