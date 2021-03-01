/**
 * Helper that creates a Frontity link joining all the passed subpaths.
 *
 * @param args - List of subpaths.
 * @returns All subpaths joined in order.
 */
export const buildLink = (...args: string[]): string =>
  `/${args.filter((s) => s).join("/")}/`.replace(/\/{2,}/g, "/");
