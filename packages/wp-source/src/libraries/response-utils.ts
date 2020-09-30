import WpSource from "../../types";

/**
 * Get the total number of items in an archive or taxonomy response from the
 * REST API. The number is extracted from the "X-WP-Total" header.
 *
 * Official WordPress docs:
 * https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/.
 *
 * @param response - The response object obtained by using `fetch()` on a REST
 * API URL.
 * @param valueIfHeaderMissing - The default value if the header is missing.
 * Defaults to 0.
 *
 * @returns The number of items in that archive/taxonomy.
 */
export const getTotal: WpSource["libraries"]["source"]["getTotal"] = (
  response,
  valueIfHeaderMissing
) => parseInt(response.headers.get("X-WP-Total")) || valueIfHeaderMissing || 0;

/**
 * Get the total number of pages in an archive or taxonomy response from the
 * REST API. The number is extracted from the "X-WP-TotalPages" header.
 *
 * Official WordPress docs:
 * https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/.
 *
 * @param response - The response object obtained by using `fetch()` on a REST
 * API URL.
 * @param valueIfHeaderMissing - The default value if the header is missing.
 * Defaults to 0.
 *
 * @returns The number of pages in that archive/taxonomy.
 */
export const getTotalPages: WpSource["libraries"]["source"]["getTotal"] = (
  response,
  valueIfHeaderMissing
) =>
  parseInt(response.headers.get("X-WP-TotalPages")) ||
  valueIfHeaderMissing ||
  0;
