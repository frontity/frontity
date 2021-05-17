/**
 * Turn prop names from camelCase into kebab-case, prefixing `data-`. Also,
 * filter out those props with value `undefined`.
 *
 * @param props - Component props.
 * @returns Filtered props.
 */
export const getDataProps = <Input>(props: Input): any =>
  Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => [toKebabCase(key, { prefix: "data-" }), value])
    .reduce((output, [key, value]) => ((output[key] = value), output), {});

/**
 * Convert string from camelCase to kebab-case.
 *
 * @param camelCase - String in camelCase format.
 * @param options - Options object.
 * @returns String in kebab-case, with the specified prefix.
 */
export const toKebabCase = (camelCase: string, { prefix = "" } = {}) =>
  prefix + camelCase.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
