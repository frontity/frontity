import { useEffect } from "react";
import { useConnect } from "frontity";
import useInView from "./use-in-view";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";
import { IntersectionOptions } from "react-intersection-observer";

export interface Options {
  currentLink: string;
  nextLink: string;
  fetchInViewOptions?: IntersectionOptions;
  routeInViewOptions?: IntersectionOptions;
}

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
}: Options) => {
  const fetch = useInView(fetchInViewOptions);
  const route = useInView(routeInViewOptions);

  if (!fetch.supported || !route.supported) return { supported: false };

  const { state, actions } = useConnect<WpSource & TinyRouter>();

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
      console.log("fetching", nextLink);

      if (!next.isReady && !next.isFetching) {
        actions.source.fetch(nextLink);
      }

      const links = state.router.state.links || [currentLink];

      if (links.includes(nextLink)) return;

      links.push(nextLink);

      actions.router.set(currentLink, {
        method: "replace",
        state: {
          ...state.router.state,
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
      console.log("routing to", currentLink);
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
