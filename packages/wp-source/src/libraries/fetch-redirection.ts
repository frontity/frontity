import { fetch } from "frontity";

/**
 * A helper for fetching the 30x redirections.
 * Used to abstract the in fetching the redirections between client and server.
 *
 * @param link - The URL from which the redirection should be fetched.
 * @param platform - Should be either "client" or "server".
 *
 * @returns An object containing:
 * - the Fetch API Response,
 * - HTTP status
 * - `isRedirection` boolean flag.
 */
export const fetchRedirection = async (
  link: string,
  platform: "client" | "server"
) => {
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
    // redirection because of https://fetch.spec.whatwg.org/#atomic-http-redirect-handling
    // The `redirect: manual` option on the client returns an "opaque response"
    // object which always has the status of 0.
    response = await fetch(link, {
      method: "HEAD",
    });
    isRedirection = response.redirected || false;
    status = 301; // Default value.
    location = response.url;
  }

  return { response, status, location, isRedirection };
};
