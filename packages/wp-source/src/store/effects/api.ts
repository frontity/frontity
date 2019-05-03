import fetch from "cross-fetch";

const wpComBase = "https://public-api.wordpress.com/wp/v2/sites/";

class Api {
  apiUrl = "";
  isCom = false;

  init(
    this: Api,
    { apiUrl, isCom = false }: { apiUrl: string; isCom?: boolean }
  ) {
    this.apiUrl = apiUrl;
    this.isCom = isCom;
  }

  get(
    this: Api,
    {
      endpoint,
      params,
      apiUrl = this.apiUrl,
      isCom = this.isCom
    }: {
      endpoint: string;
      params?: { [param: string]: any };
      apiUrl?: string;
      isCom?: boolean;
    }
  ): Promise<Response> {
    // Build the base URL depending on whether it is WP.com or WP.org
    const baseUrl = isCom
      ? `${wpComBase}${apiUrl.replace(/^https?:\/\//, "")}/`
      : `${apiUrl}/wp-json`;

    // Add the REST path depending on whether it should start
    // with "/wp/v2" or not
    const requestUrl =
      isCom || endpoint.startsWith("/")
        ? `${baseUrl}${endpoint}`
        : `${baseUrl}/wp/v2/${endpoint}`;

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

export const api = new Api();
