import { ResponseInit, Response as NodeResponse } from "node-fetch";

/**
 * Utility to mock responses from WP REST API.
 *
 * It instantiates a `node-fetch` response object using the passed information
 * with the standard `Response` type.
 *
 * @param body - Body of the `Response` object.
 * @param init - Other `Response` properties.
 *
 * @returns `Response` object.
 */
export const mockResponse = (body, init?: ResponseInit): Response =>
  (new NodeResponse(JSON.stringify(body), init) as any) as Response;

/**
 * Function that returns an object from given entries.
 *
 * @param entries - Array of key-value pairs.
 *
 * @returns Object with entries transformed to keys and values.
 */
export const fromEntries = (
  entries: IterableIterator<[string, any]>
): object => {
  const result = {};
  for (const [key, value] of entries) result[key] = value;
  return result;
};
