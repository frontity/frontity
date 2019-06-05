import fetch from "cross-fetch";

const wpComBase = "https://public-api.wordpress.com/wp/v2/sites/";

class Api {
  api = "";
  isWPCom = false;

  init(
    this: Api,
    { api, isWPCom = false }: { api: string; isWPCom?: boolean }
  ) {
    this.api = api;
    this.isWPCom = isWPCom;
  }

  get(
    this: Api,
    {
      endpoint,
      params,
      api = this.api,
      isWPCom = this.isWPCom
    }: {
      endpoint: string;
      params?: { [param: string]: any };
      api?: string;
      isWPCom?: boolean;
    }
  ): Promise<Response> {
    // Ensure there is a final slash
    const baseUrl = api.replace(/\/?$/, "/");

    // Add the REST path depending on whether it should start
    // with "/wp/v2" or not
    const requestUrl =
      isWPCom || endpoint.startsWith("/")
        ? `${baseUrl}${endpoint.replace(/^\//, "")}`
        : `${baseUrl}wp/v2/${endpoint}`;

    // Add query parameters
    const query = params
      ? `?${Object.entries(params)
          .filter(([key, value]) => value)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`
      : "";

    // Send request
    return fetch(`${requestUrl}${query}`);
  }

  async getIdBySlug(endpoint: string, slug: string) {
    const response = await this.get({ endpoint, params: { slug } });
    const [entity] = await response.json();

    if (!entity)
      throw new Error(
        `Entity of from endpoint '${endpoint}' with slug '${slug}' not found`
      );

    return entity.id;
  }
}

export default Api;
