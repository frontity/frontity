import { useEffect } from "react";
import { useConnect } from "frontity";
import useInView from "./use-in-view";
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
 * A hook to build other infinite scroll hooks.
 *
 * It is used by the higher abstracted hooks `useArchiveInfiniteScroll` and
 * `usePostTypeInfiniteScroll`.
 *
 * @param options - The options of the hook. Defined in {@link UseInfiniteScroll}.
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
  const fetch = useInView(fetchInViewOptions);
  const route = useInView(routeInViewOptions);

  if (!fetch.supported || !route.supported) return { supported: false };

  const { state, actions } = useConnect<Source & Router>();

  const current = state.source.get(currentLink);
  const next = nextLink ? state.source.get(nextLink) : null;

  // Request the current route in case it's not ready
  // and it's not fetching.
  useEffect(() => {
    if (!current.isReady && !current.isFetching)
      actions.source.fetch(currentLink);
  }, []);

  // Once the fetch waypoint is in view, fetch the next
  // route content, if not available yet, and add the new route
  // to the array of elements in the infinite scroll.
  useEffect(() => {
    if (fetch.inView && nextLink) {
      const links = state.router.state.infiniteScroll?.links
        ? [...state.router.state.infiniteScroll.links]
        : [currentLink];

      if (links.includes(nextLink)) return;

      if (!next.isReady && !next.isFetching) {
        actions.source.fetch(nextLink);
      }

      links.push(nextLink);

      actions.router.updateState({
        ...state.router.state,
        infiniteScroll: {
          ...state.router.state.infiniteScroll,
          links,
        },
      });
    }
  }, [fetch.inView, nextLink]);

  // Once the route waypoint is in view, change the route to the
  // current element. This preserves the route state between changes
  // to avoid rerendering.
  useEffect(() => {
    if (route.inView && state.router.link !== currentLink) {
      actions.router.set(currentLink, {
        method: "replace",
        state: state.router.state,
      });
    }
  }, [route.inView]);

  return {
    supported: true,
    routeRef: route.ref,
    fetchRef: fetch.ref,
    routeInView: route.inView,
    fetchInView: fetch.inView,
  };
};

export default useInfiniteScroll;
