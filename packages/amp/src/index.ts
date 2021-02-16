import AMP from "../types";

/**
 * Remove a final `/amp` from a link.
 *
 * @param link - The link to be processed.
 *
 * @returns The same link but without the final `/amp`.
 */
export const removeAmp = (link: string): string =>
  link.replace(/\/amp\/?($|\?|#)/, "/");

const Amp: AMP = {
  name: "@frontity/amp",
  actions: {
    amp: {
      init: ({ libraries }) => {
        const { parse, stringify } = libraries.source;

        // Wrap libraries.source.parse.
        libraries.source.parse = (link) => {
          const { route, path, ...rest } = parse(link);
          return {
            route: removeAmp(route),
            path: removeAmp(path),
            ...rest,
          };
        };

        // Wrap libraries.source.stringify.
        libraries.source.stringify = ({ route, path, ...rest }) => {
          const routeOrPath = route || path || "/";
          return stringify({
            route: removeAmp(routeOrPath),
            path: removeAmp(routeOrPath),
            ...rest,
          });
        };

        // Wrap libraries.source.normalize.
        libraries.source.normalize = (link) =>
          libraries.source.stringify(libraries.source.parse(link));
      },
    },
  },
};

export default Amp;
