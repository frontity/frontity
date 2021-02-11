import { useEffect } from "react";
import { useConnect } from "frontity";
import useInView from "../use-in-view";
import { isRedirection } from "@frontity/source";
import {
  UseInfiniteScrollOptions,
  UseInfiniteScrollOutput,
  InfiniteScrollRouterState,
  Packages,
} from "./types";
import { Data } from "@frontity/source/types";

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

  // Declare the data objects needed, all of them initialized as `null`.
  let current: Data = null;
  let next: Data = null;
  let nextRedirected: Data = null;

  // Get the data objects from the Frontity store. If `intersectionObserver` is
  // not supported, all of them will remain as `null`.
  if (isSupported) {
    current = store.state.source.get(currentLink);

    if (nextLink) {
      next = store.state.source.get(nextLink);

      if (isRedirection(next) && !next.isExternal)
        nextRedirected = store.state.source.get(next.location);
    }
  }

  // Request the current route in case it's not ready and it's not fetching. If
  // not supported, it does nothing.
  useEffect(() => {
    if (!isSupported) return;

    // Get the state and actions from Frontity.
    const { actions } = store;

    // Get the data object of the current link and fetch it if needed.
    if (!current.isReady && !current.isFetching)
      actions.source.fetch(currentLink);
  }, [currentLink, isSupported, current, store]);

  // Once the fetch waypoint is in view, fetch the next route content, if not
  // available yet, and add the new route to the array of elements in the
  // infinite scroll. Do nothing if it is not supported.
  useEffect(() => {
    if (!isSupported) return;

    // Get the state and actions from Frontity.
    const { state, actions } = store;

    if (fetch.inView && nextLink) {
      // Get the `infiniteScroll` props from the history state.
      const { infiniteScroll } = state.router
        .state as InfiniteScrollRouterState;

      // Get the list of links from the history state or initializes it.
      let links = infiniteScroll?.links
        ? [...infiniteScroll.links]
        : [currentLink];

      // If there is a redirection, remove the old link from `links`.
      if (nextRedirected) {
        links = links.filter((link) => link !== next.link);
      }

      // Get the data object that should be handled.
      const nextData = nextRedirected || next;

      // Do nothing if the link is already in the list. That means it was
      // handled before.
      if (links.includes(nextData.link)) return;

      // Fetch the link if it wasn't fetched before.
      if (!nextData.isReady && !nextData.isFetching) {
        actions.source.fetch(nextData.link);
      }

      // Add the link to the list.
      links.push(nextData.link);

      // Update the browser's history state with the new link.
      actions.router.updateState({
        ...state.router.state,
        infiniteScroll: { ...infiniteScroll, links },
      });
    }
  }, [
    isSupported,
    fetch.inView,
    currentLink,
    nextLink,
    next,
    nextRedirected,
    store,
  ]);

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
