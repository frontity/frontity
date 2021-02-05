import { useEffect } from "react";
import { useConnect } from "frontity";
import useInView from "../use-in-view";
import {
  UseInfiniteScrollOptions,
  UseInfiniteScrollOutput,
  InfiniteScrollRouterState,
  Packages,
} from "./types";

/**
 * A hook to build other infinite scroll hooks.
 *
 * It is used by the higher abstracted hooks `useArchiveInfiniteScroll` and
 * `usePostTypeInfiniteScroll`.
 *
 * @param options - The options of the hook. Defined in
 * {@link UseInfiniteScrollOptions}.
 * @returns - An object with refs and booleans to use in your own hook. Defined
 * at {@link UseInfiniteScrollOutput}.
 */
const useInfiniteScroll = ({
  currentLink,
  nextLink,
  fetchInViewOptions = {
    rootMargin: "400px 0px",
    triggerOnce: true,
  },
  routeInViewOptions = {
    rootMargin: "-80% 0% -19.9999% 0%",
  },
}: UseInfiniteScrollOptions): UseInfiniteScrollOutput => {
  // Generate triggers for the `source.fetch` and `router.set` actions.
  const fetch = useInView(fetchInViewOptions);
  const route = useInView(routeInViewOptions);

  // Check if `IntersectionObserver` is supported by the browser.
  const isSupported = fetch.supported && route.supported;

  // Get the store from Frontity. The `state` and `action` props are got later
  // inside the `useEffect` callbacks because those hooks do not depend on any
  // store prop.
  const store = useConnect<Packages>();

  // Request the current route in case it's not ready and it's not fetching. If
  // not supported, it does nothing.
  useEffect(() => {
    if (!isSupported) return;

    // Get the state and actions from Frontity.
    const { state, actions } = store;

    // Get the data object of the current link and fetch it if needed.
    const current = state.source.get(currentLink);
    if (!current.isReady && !current.isFetching)
      actions.source.fetch(currentLink);
  }, [currentLink, isSupported, store]);

  // Once the fetch waypoint is in view, fetch the next route content, if not
  // available yet, and add the new route to the array of elements in the
  // infinite scroll. Do nothing if it is not supported.
  useEffect(() => {
    if (!isSupported) return;

    // Get the state and actions from Frontity.
    const { state, actions } = store;

    if (fetch.inView && nextLink) {
      const { infiniteScroll } = state.router
        .state as InfiniteScrollRouterState;

      // Get data object of the next link.
      const next = state.source.get(nextLink);

      const links = infiniteScroll?.links
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
  }, [isSupported, fetch.inView, nextLink, currentLink, store]);

  // Once the route waypoint is in view, change the route to the
  // current element. This preserves the route state between changes
  // to avoid rerendering. Again, it does nothing if not supported.
  useEffect(() => {
    if (!isSupported) return;

    const { state, actions } = store;

    if (route.inView && state.router.link !== currentLink) {
      actions.router.set(currentLink, {
        method: "replace",
        state: state.router.state,
      });
    }
  }, [isSupported, route.inView, currentLink, store]);

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
