import { fetch } from "frontity";
import { ServerError } from "@frontity/source";

/**
 * The initialization method of the Api.
 */
interface Init {
  /**
   * The URL of the WordPress REST API.
   */
  url: string;

  /**
   * Whether the REST API belongs to a site hosted on wordpress.com.
   */
  isWpCom?: boolean;
}

/**
 * Parameters of the `Api.get()` method.
 */
interface Get {
  /**
   * Used to specify the kind of the WordPress REST API endpoint. Used to
   * construct the final URL from which data will be fetched.
   *
   * It should be the name of the endpoint if is a `/wp/v2 endpoint` (e.g.
   * `posts`), or the full path of other REST endpoints (e.g. `/acf/v3/posts`).
   *
   * @example "posts", "pages"
   */
  endpoint: string;

  /**
   * The URL params used to create the query string in the final `fetch()`
   * request.
   *
   * @example
   * ```
   * { _embed: true }
   * ```
   */
  params?: Record<string, any>;

  /**
   * Optionally override the value of Api.api.
   */
  url?: string;

  /**
   * Optionally override the value of Api.isWpCom.
   */
  isWpCom?: boolean;

  /**
   * The optional authentication information.
   *
   * This can be e.g. A Basic Authentication string or a Bearer token.
   */
  auth?: string;

  /**
   * The link of the related URL of this fetch.
   */
  link?: string;
}

/**
 * A container class which handles fetching the data from the WordPress REST
 * API.
 */
class Api {
  url = "";
  isWpCom = false;

  /**
   * The initialization method of the class.
   *
   * @param this - The instance of the {@link Api}.
   * @param params - Defined in {@link Init}.
   */
  init(this: Api, { url, isWpCom = false }: Init) {
    this.url = url;
    this.isWpCom = isWpCom;
  }

  /**
   * Request entity from the WordPress REST API.
   *
   * @param this - The instance of the {@link Api}.
   * @param params - Defined in {@link Get}.
   *
   * @returns A Promise that resolves to the `Response` object retuned from
   * `fetch()`.
   */
  get(
    this: Api,
    {
      endpoint,
      params,
      url = this.url,
      isWpCom = this.isWpCom,
      auth,
      link,
    }: Get
  ): Promise<Response> {
    // Ensure there is a final slash
    const { pathname } = new URL(link, "http://domain.com");

    // Add the REST path depending on whether it should start with "/wp/v2" or
    // not
    const requestUrl =
      isWpCom || endpoint.startsWith("/")
        ? new URL(`${url}${endpoint.replace(/^\//, "")}`)
        : new URL(`${url}${pathname}?rest_route=/wp/v2/${endpoint}`);

    Object.keys(params).forEach((key) => {
      if (params[key]) requestUrl.searchParams.set(key, params[key]);
    });

    // If `auth` was passed, add it to the headers
    const headers = auth ? { Authorization: auth } : {};

    // Send request
    return fetch(requestUrl.href, { headers }).then((response: Response) => {
      if (!response.ok) {
        const { status, statusText } = response;
        throw new ServerError(statusText, status, statusText);
      }
      return response;
    });
  }

  /**
   * A helper method for getting the ID of a particular entity based on it's
   * slug.
   *
   * @param endpoint - The endpoint from which to fetch the entity.
   * @param slug - The slug of the entity.
   *
   * @returns The ID of the particular entity.
   */
  async getIdBySlug(endpoint: string, slug: string) {
    const response = await this.get({ endpoint, params: { slug } });
    const [entity] = await response.clone().json();

    if (!entity)
      throw new ServerError(
        `entity from endpoint '${endpoint}' with slug '${slug}' not found`,
        404
      );

    return entity.id;
  }
}

export default Api;
