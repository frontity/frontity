import memoize from "ramda/src/memoizeWith";
import { IntersectionOptions, WrapperGenerator } from "./types";

/**
 * Generate a memoize Wrapper.
 *
 * @param wrapperGenerator - The function that generates the wrapper and needs
 * to be memoized.
 *
 * @returns A memoized Wrapper.
 */
export const generateMemoizedWrapper = (wrapperGenerator: WrapperGenerator) =>
  memoize(
    (link) => link,
    (
      link: string,
      options: {
        /**
         * The intersection observer options for fetching.
         */
        fetchInViewOptions: IntersectionOptions;

        /**
         * The intersection observer options for routing.
         */
        routeInViewOptions: IntersectionOptions;
      }
    ) =>
      wrapperGenerator({
        link,
        fetchInViewOptions: options.fetchInViewOptions,
        routeInViewOptions: options.routeInViewOptions,
      })
  );
