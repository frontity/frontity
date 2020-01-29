import { fetch } from "frontity";
import { stringify } from "query-string";

class Api {
  api = "";
  isWpCom = false;

  init(
    this: Api,
    { api, isWpCom = false }: { api: string; isWpCom?: boolean }
  ) {
    this.api = api;
    this.isWpCom = isWpCom;
  }

  get(
    this: Api,
    {
      endpoint,
      params,
      api = this.api,
      isWpCom = this.isWpCom
    }: {
      endpoint: string;
      params?: Record<string, any>;
      api?: string;
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
    return fetch(`${requestUrl}${query && "?"}${query}`).then(
      (response: Response) => {
        if (!response.ok) {
          const { status, statusText } = response;
          throw { status, statusText, isServerError: true };
        }
        return response;
      }
    );
  }

  async getIdBySlug(endpoint: string, slug: string) {
    const response = await this.get({ endpoint, params: { slug } });
    const [entity] = await response.clone().json();

    if (!entity)
      throw new Error(
        `entity from endpoint '${endpoint}' with slug '${slug}' not found`
      );

    return entity.id;
  }
}

export default Api;
