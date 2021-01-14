import { RedirectionData } from "@frontity/source/types";
import { fetch } from "frontity";

/**
 * Return object of the {@link fetchRedirection} function.
 */
export interface FetchDirectionReturn {
  /**
   * The HTTP status.
   */
  status: 301 | 302 | 307 | 308;

  /**
   * The new link.
   */
  location: string;

  /**
   * Wheter this is a redirection or not.
   */
  isRedirection: boolean;
}

/**
 * A helper for fetching the 30x redirections.
 * Used to abstract the differences in fetching the redirections
 * between the client and the server.
 *
 * @param link - The URL from which the redirection should be fetched.
 * @param platform - Should be either "client" or "server".
 *
 * @returns An object that contains information about the redirection, defined
 * in {@link FetchDirectionReturn}, or nothing if there is no redirection.
 */
export const fetchRedirection = async (
  link: string,
  platform: "client" | "server"
): Promise<FetchDirectionReturn> => {
  if (platform === "server") {
    // On the server we have to fetch with `redirect: manual` so that we can
    // check the status code of the redirection.
    const response = await fetch(link, {
      method: "HEAD",
      redirect: "manual",
    });

    // On the server we check the status of the response.
    if (
      response.status === 301 ||
      response.status === 302 ||
      response.status === 307 ||
      response.status === 308
    )
      return {
        status: response.status,
        location: response.headers.get("location"),
        isRedirection: true,
      };
  } else {
    // On the client it's not possible to get the actual status code of the
    // redirection if you use the `redirect: manual` option because of
    // https://fetch.spec.whatwg.org/#atomic-http-redirect-handling The
    // `redirect: manual` option on the client returns an "opaque response"
    // object which always has the status of 0.
    const response = await fetch(link, {
      method: "HEAD",
    });

    // On the client we check the property `redirected`.
    if (response.redirected)
      return {
        status: 301, // Default value on the client.
        location: response.url,
        isRedirection: true,
      };
  }
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
export const getRedirectionData = (
  location: string,
  status: 301 | 302 | 307 | 308,
  sourceUrl: string,
  frontityUrl: string
): Partial<RedirectionData> => {
  const { pathname, search, hash, host } = new URL(location);
  const sourceUrlHost = new URL(sourceUrl).host;
  const frontityUrlHost = new URL(frontityUrl).host;
  const isExternal = !(host === sourceUrlHost || host === frontityUrlHost);

  return {
    isExternal,
    location: isExternal ? location : pathname + hash + search,
    redirectionStatus: status,
    [`is${status}`]: true,
    isRedirection: true,
    isReady: true,
    isFetching: false,
  };
};
