import { useEffect } from "react";
import { useConnect } from "frontity";
import useInView from "./use-in-view";
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
 * The types of the {@link useInfiniteScroll} hook.
 */
type UseInfiniteScroll = (options: {
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
}) =>
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

/**
 * A hook to build other infinite scroll hooks.
 *
 * It is used by the higher abstracted hooks `useArchiveInfiniteScroll` and
 * `usePostTypeInfiniteScroll`.
 *
 * @param options - The options of the hook. Defined in
 * {@link UseInfiniteScroll}.
 * @returns - An object with refs and booleans to use in your own hook. Defined
 * at {@link useArchiveInfiniteScroll}.
 */
const useInfiniteScroll: UseInfiniteScroll = ({
  currentLink,
  nextLink,
  fetchInViewOptions = {
    rootMargin: "400px 0px",
    triggerOnce: true,
  },
  routeInViewOptions = {
    rootMargin: "-80% 0% -19.9999% 0%",
  },
}) => {
  // Generate triggers for the `source.fetch` and `router.set` actions.
  const fetch = useInView(fetchInViewOptions);
  const route = useInView(routeInViewOptions);

  // Check if `IntersectionObserver` is supported by the browser.
  const isSupported = fetch.supported && route.supported;

  // Get state and actions from Frontity.
  const { state, actions } = useConnect<Packages>();

  // Get data objects for the current link and the next one.
  const current = state.source.get(currentLink);
  const next = nextLink ? state.source.get(nextLink) : null;

  // Request the current route in case it's not ready and it's not fetching. If
  // not supported, it does nothing.
  useEffect(() => {
    if (isSupported && !current.isReady && !current.isFetching)
      actions.source.fetch(currentLink);
  }, [
    isSupported,
    current.isReady,
    current.isFetching,
    actions.source,
    currentLink,
  ]);

  // Once the fetch waypoint is in view, fetch the next route content, if not
  // available yet, and add the new route to the array of elements in the
  // infinite scroll. Do nothing if it is not supported.
  useEffect(() => {
    if (isSupported && fetch.inView && nextLink) {
      const { infiniteScroll } = state.router
        .state as InfiniteScrollRouterState;

      const links = infiniteScroll.links
        ? [...infiniteScroll.links]
        : [currentLink];

      if (links.includes(nextLink)) return;

      if (!next.isReady && !next.isFetching) {
        actions.source.fetch(nextLink);
      }

      links.push(nextLink);

      actions.router.updateState({
        ...state.router.state,
        infiniteScroll: { ...infiniteScroll, links },
      });
    }
  }, [
    isSupported,
    fetch.inView,
    nextLink,
    state.router.state,
    currentLink,
    next.isReady,
    next.isFetching,
    actions.router,
    actions.source,
  ]);

  // Once the route waypoint is in view, change the route to the
  // current element. This preserves the route state between changes
  // to avoid rerendering. Again, it does nothing if not supported.
  useEffect(() => {
    if (isSupported && route.inView && state.router.link !== currentLink) {
      actions.router.set(currentLink, {
        method: "replace",
        state: state.router.state,
      });
    }
  }, [isSupported, route.inView, state.router, actions.router, currentLink]);

  return isSupported
    ? {
        supported: true,
        routeRef: route.ref,
        fetchRef: fetch.ref,
        routeInView: route.inView,
        fetchInView: fetch.inView,
      }
    : { supported: false };
};

export default useInfiniteScroll;
