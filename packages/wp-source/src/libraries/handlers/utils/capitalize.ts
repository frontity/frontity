/**
 * Receive a string in snake or kebab case and return it capitalized in upper
 * camel case.
 *
 * @param str - Input string.
 * @returns - Capitalized string.
 */
export default (str: string) =>
  str
    .split(/[\s-_]+/)
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join("");
