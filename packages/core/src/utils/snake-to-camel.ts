/**
 * Convert the string from snake_case to camelCase.
 *
 * @param str - The string to be converted.
 *
 * @returns A new (converted) string.
 */
const snakeToCamel = (str: string) =>
  str.replace(/([-_][A-Za-z0-9.~])/gi, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );

export default snakeToCamel;
