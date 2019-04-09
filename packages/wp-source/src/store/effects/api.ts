import { Api } from "../types";
import fetch from "node-fetch";

const wpComBase = "https://public-api.wordpress.com/wp/v2/sites/";

const api: Api = {
  get: ({ endpoint, params, siteUrl, isWpCom }) => {
    // Build the base URL depending on whether it is WP.com or WP.org
    const baseUrl = isWpCom
      ? `${wpComBase}${siteUrl.replace(/^https?:\/\//, "")}/`
      : `${siteUrl}/wp-json`;

    // Add the REST path depending on whether it should start
    // with "/wp/v2" or not
    const requestUrl = isWpCom || endpoint.startsWith("/")
      ? `${baseUrl}${endpoint}`
      : `${baseUrl}/wp/v2/${endpoint}`;

    // Add query parameters
    const query = params
      ? `?${Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`
      : "";

    // Send request and return promise
    return fetch(`${requestUrl}${query}`);
  }
};

export default api;
