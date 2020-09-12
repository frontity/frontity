import { fetch } from "frontity";
import { stringify } from "query-string";
import { ServerError } from "@frontity/source";

/**
 *
 */
class Api {
  api = "";
  isWpCom = false;
  headers = {};

  /**
   * @param this
   * @param root0
   */
  init(
    this: Api,
    {
      api,
      headers,
      isWpCom = false,
    }: {
      /**
       *
       */
      api: string;
      /**
       *
       */
      /**
       *
       */
      isWpCom?: boolean;
      /**
       *
       */
      /**
       *
       */
      headers: { [key: string]: string };
    }
  ) {
    this.api = api;
    this.isWpCom = isWpCom;
    this.headers = headers;
  }

  /**
   * @param this
   * @param root0
   */
  get(
    this: Api,
    {
      endpoint,
      params,
      api = this.api,
      isWpCom = this.isWpCom,
    }: {
      /**
       *
       */
      endpoint: string;
      /**
       *
       */
      params?: Record<string, any>;
      /**
       *
       */
      api?: string;
      /**
       *
       */
      isWpCom?: boolean;
    }
  ): Promise<Response> {
    // Ensure there is a final slash
    const baseUrl = api.replace(/\/?$/, "/");

    // Add the REST path depending on whether it should start
    // with "/wp/v2" or not
    const requestUrl =
      isWpCom || endpoint.startsWith("/")
        ? `${baseUrl}${endpoint.replace(/^\//, "")}`
        : `${baseUrl}wp/v2/${endpoint}`;

    // Add query parameters
    const query = stringify(params, { arrayFormat: "bracket", encode: false });

    // Send request
    return fetch(`${requestUrl}${query && "?"}${query}`, {
      headers: this.headers,
    }).then((response: Response) => {
      if (!response.ok) {
        const { status, statusText } = response;
        throw new ServerError(statusText, status, statusText);
      }
      return response;
    });
  }

  /**
   * @param endpoint
   * @param slug
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
