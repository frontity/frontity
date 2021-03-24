/**
 * A helper to generate an async iterator from an array of Promises.
 *
 * The result of calling this function should probably be used in an
 * `await for...of` statement.
 *
 * @example
 * ```
 * for await (const response of generateAsyncQueue(promises)) {
 *    const populated = await libraries.source.populate({
 *      response,
 *      state,
 *      force,
 *    });
 * }
 *```
 * @param promises - An array of promises.
 *
 * @returns An async iterator.
 */
export default async function* generateAsyncQueue<T>(
  promises: Promise<T>[]
): AsyncGenerator<T, void, T> {
  // Enhance the original array of Promises.
  // Turn it into an array of tuples, where the first element of each tuple is
  // the array index. The second element resolves to the tuple of [index, originalResult]
  const promisesArray: Array<
    [number, Promise<[number, T]>]
  > = promises.map((p, i) => [i, p.then((res) => [i, res])]);

  // Create a "pool" of Promises.
  const map = new Map(promisesArray);

  // Race all of the promises and as soon the first one resolves, yield the
  // result, remove the tuple with the corresponding promise from the array and
  // race all of the remaining promises until the "pool" is empty.
  while (map.size) {
    const [key, result] = await Promise.race(map.values());
    yield result;
    map.delete(key);
  }
}
