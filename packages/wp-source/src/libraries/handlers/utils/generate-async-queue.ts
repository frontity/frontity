/**
 * A helper to generate an async iterator from an array of Promises.
 *
 * The result of calling this function should probably be used in an
 * `await for...of` statement.
 *
 * @example
 * ```
 * for await (const [endpoint, response] of generateAsyncQueue(promises)) {
 *    const populated = await libraries.source.populate({
 *      response,
 *      state,
 *      force,
 *    });
 * }
 *```
 * @param promises - An array of [endpoint, Promise] which corresponds to the
 * endpoint where the data is fetched from and .
 *
 * @returns An async iterator which resolves with a value of [response].
 */
export default async function* generateAsyncQueue<T>(
  promises: [endpoint, Promise<T>][]
): AsyncGenerator<[endpoint, T], void, unknown> {
  // Enhance the original array of Promises & endpoints.
  // Turn it into an array of tuples, where the first element of each tuple is
  // the array index. The second element resolves to the tuple of [index, originalResult]
  const promisesArray: Array<
    [index, Promise<[index, endpoint, T]>]
  > = promises.map((p, i) => [i, p[1].then((res) => [i, p[0], res])]);

  // Create a "pool" of Promises.
  const map = new Map(promisesArray);

  // Race all of the promises and as soon the first one resolves, yield the
  // result, remove the tuple with the corresponding promise from the array and
  // race all of the remaining promises until the "pool" is empty.
  while (map.size) {
    const [key, endpoint, result] = await Promise.race(map.values());
    yield [endpoint, result];
    map.delete(key);
  }
}

/**
 * Type alias for the index of the Promise in the array.
 */
type index = number;

/**
 * Type alias for the name of the endpoint.
 */
type endpoint = string;
