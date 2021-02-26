/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useConnect } from "frontity";
import useInView from "../use-in-view";
import {
  UseInfiniteScrollOptions,
  UseInfiniteScrollOutput,
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

  const { state, actions } = useConnect<Packages>();

  // Declare the data objects needed, all of them initialized as `null`.
  let current: Data = null;
  let next: Data = null;
  let isNextReady = false;

  // Get the data objects from the Frontity store. If `intersectionObserver` is
  // not supported, all of them will remain as `null`.
  if (isSupported) {
    current = state.source.get(currentLink);

    if (nextLink) {
      next = state.source.get(nextLink);
      isNextReady = next.isReady;
    }
  }

  // Fetch the current link in case it's not ready and it's not fetching. If
  // not supported, it does nothing.
  useEffect(() => {
    if (!isSupported) return;

    // Get the data object of the current link and fetch it if needed.
    if (!current.isReady && !current.isFetching)
      actions.source.fetch(currentLink);
  }, [currentLink, current]);

  // Once the fetch waypoint is in view, fetch the next route content, if not
  // available yet, and add the new link to the array of elements in the
  // infinite scroll. Do nothing if it is not supported.
  useEffect(() => {
    if (!isSupported) return;

    if (fetch.inView && nextLink) {
      // Get the `infiniteScroll` props from the history state.
      const { infiniteScroll } = state.router.state;

      // Get the list of links from the history state or initializes it.
      const links = infiniteScroll?.links
        ? [...infiniteScroll.links]
        : [currentLink];

      // Do nothing if the link is already in the list. That means it was
      // handled before.
      if (links.includes(next.link)) return;

      // Fetch the link if it wasn't fetched before.
      if (!next.isReady && !next.isFetching) {
        actions.source.fetch(next.link);
      }

      // Add the link to the list once it's ready.
      if (isNextReady) links.push(next.link);

      // Update the browser's history state.
      actions.router.updateState({
        ...state.router.state,
        infiniteScroll: { ...infiniteScroll, links },
      });
    }
  }, [fetch.inView, currentLink, nextLink, next, isNextReady]);

  // Once the route waypoint is in view, change the route to the
  // current element. This preserves the route state between changes
  // to avoid rerendering. Again, it does nothing if not supported.
  useEffect(() => {
    if (!isSupported) return;

    if (route.inView && state.router.link !== currentLink) {
      actions.router.set(currentLink, {
        method: "replace",
        state: state.router.state,
      });
    }
  }, [route.inView, currentLink]);

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
