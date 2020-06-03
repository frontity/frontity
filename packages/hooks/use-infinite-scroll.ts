import { useEffect } from "react";
import { useConnect } from "frontity";
import useInView from "./use-in-view";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

type IntersectionOptions = Parameters<typeof useInView>[0];

type UseInfiniteScroll = (options: {
  currentLink: string;
  nextLink?: string;
  fetchInViewOptions?: IntersectionOptions;
  routeInViewOptions?: IntersectionOptions;
}) =>
  | {
      supported: false;
      routeRef?: undefined;
      fetchRef?: undefined;
      routeInView?: undefined;
      fetchInView?: undefined;
    }
  | {
      supported: true;
      routeRef: (node?: Element) => void;
      fetchRef: (node?: Element) => void;
      routeInView: boolean;
      fetchInView: boolean;
    };

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
