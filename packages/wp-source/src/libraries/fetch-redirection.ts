import { fetch } from "frontity";

/**
 * Return object of the {@link fetchRedirection} function.
 */
interface FetchDirectionReturn {
  /**
   * The Fetch API response.
   */
  response: Response;

  /**
   * The HTTP status.
   */
  status: number;

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
 * @returns An object defined in {@link FetchDirectionReturn}.
 */
export const fetchRedirection = async (
  link: string,
  platform: "client" | "server"
): Promise<FetchDirectionReturn> => {
  let response: Response;
  let isRedirection: boolean;
  let status: number;
  let location: string;

  // On the server we have to fetch with `redirect: manual` so that we can get
  // the 30x status code of the redirection.
  if (platform === "server") {
    response = await fetch(link, {
      method: "HEAD",
      redirect: "manual",
    });
    isRedirection = /30[1278]/.test(response.status.toString());
    status = response.status;
    location = response.headers.get("location");
  } else {
    // On the client it's not possible to get the actual status code of the
    // redirection if you use the `redirect: manual` option because of
    // https://fetch.spec.whatwg.org/#atomic-http-redirect-handling
    // The `redirect: manual` option on the client returns an "opaque response"
    // object which always has the status of 0.
    response = await fetch(link, {
      method: "HEAD",
    });
    isRedirection = response.redirected || false;
    status = 301; // Default value on the client.
    location = response.url;
  }

  return { response, status, location, isRedirection };
};
