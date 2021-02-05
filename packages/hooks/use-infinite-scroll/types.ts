import useInView from "../use-in-view";
import { MergePackages } from "frontity/types";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

/**
 * The intersection options passed down to `useInView`.
 *
 * They come originally from the
 * [`react-intersection-observer`](https://github.com/thebuilder/react-intersection-observer)
 * package.
 */
export type IntersectionOptions = Parameters<typeof useInView>[0];

/**
 * Options of the {@link useInfiniteScroll} hook.
 */
export type UseInfiniteScrollOptions = {
  /**
   * The current link that should be used to start the infinite scroll.
   */
  currentLink: string;

  /**
   * The next link that should be fetched and loaded once the user scrolls
   * down.
   */
  nextLink?: string;

  /**
   * The options for the internal {@link useInView} hook used for the
   * `actions.source.fetch`.
   */
  fetchInViewOptions?: IntersectionOptions;

  /**
   * The options for the internal {@link useInView} hook used for the
   * `actions.router.set`.
   */
  routeInViewOptions?: IntersectionOptions;
};

/**
 * Options of the {@link useInfiniteScroll} hook.
 */
export type UseInfiniteScrollOutput =
  | {
      /**
       * Boolean indicating if the Intersection Observer is supported or not by
       * the browser.
       */
      supported: false;

      /**
       * The ref that should be attached to the element used to trigger
       * `actions.router.set`.
       */
      routeRef?: undefined;

      /**
       * The ref that should be attached to the element used to trigger
       * `actions.source.fetch`.
       */
      fetchRef?: undefined;

      /**
       * Boolean that indicates when the element used to trigger
       * `actions.router.set` is in the screen.
       */
      routeInView?: undefined;

      /**
       * Boolean that indicates when the element used to trigger
       * `actions.source.fetch` is in the screen.
       */
      fetchInView?: undefined;
    }
  | {
      /**
       * Boolean indicating if the Intersection Observer is supported or not by
       * the browser.
       */
      supported: true;

      /**
       * The ref that should be attached to the element used to trigger
       * `actions.router.set`.
       */
      routeRef: (node?: Element) => void;

      /**
       * The ref that should be attached to the element used to trigger
       * `actions.source.fetch`.
       */
      fetchRef: (node?: Element) => void;

      /**
       * Boolean that indicates when the element used to trigger
       * `actions.router.set` is in the screen.
       */
      routeInView: boolean;

      /**
       * Boolean that indicates when the element used to trigger
       * `actions.source.fetch` is in the screen.
       */
      fetchInView: boolean;
    };

/**
 * Properties added by the {@link useInfiniteScroll} to the Router
 * state property.
 */
export type InfiniteScrollRouterState = {
  /**
   * The infinite scroll map of props.
   */
  infiniteScroll: {
    /**
     * Array of visited links.
     */
    links: string[];

    /**
     * Number of elements that will be automatically fetched.
     */
    limit: number;

    /**
     * List of pages by link. TODO: check this type.
     */
    pages: string[];

    /**
     * Archive (used by `usePostTypeInfiniteScroll`).
     */
    archive?: string;
  };

  /**
   * Any other prop.
   */
  [key: string]: unknown;
};

/**
 * The type of those packages the {@link useInfiniteScroll} hook depends on,
 * merged together.
 */
export type Packages = MergePackages<Source, Router>;
