import { useEffect } from "react";
import { useConnect } from "frontity";
import useInView from "./use-in-view";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";
import { IntersectionOptions } from "react-intersection-observer";

export interface Options {
  link: string;
  fetchInViewOptions?: IntersectionOptions;
  routeInViewOptions?: IntersectionOptions;
}

export default ({
  link,
  fetchInViewOptions = {
    rootMargin: "400px 0px",
    triggerOnce: true,
  },
  routeInViewOptions = {
    rootMargin: "-70% 0% -29.9999% 0%",
  },
}: Options) => {
  const fetch = useInView(fetchInViewOptions);
  const route = useInView(routeInViewOptions);

  if (!fetch.supported || !route.supported) return { supported: false };

  const { state, actions } = useConnect<WpSource & TinyRouter>();

  const current = state.source.get(link);
  const next = current.next ? state.source.get(current.next) : null;

  const fetchNext = () => {
    if (!next.isReady) actions.source.fetch(next.link);

    const links = state.router.state.links || [current.link];

    if (!links.includes(next.link)) {
      links.push(next.link);

      actions.router.set(current.link, {
        method: "replace",
        state: {
          ...state.router.state,
          links,
        },
      });
    }
  };

  // Request the current route in case it's not ready
  // and it's not fetching.
  useEffect(() => {
    if (!current.isReady && !current.isFetching)
      actions.source.fetch(current.link);
  }, []);

  // Once the fetch waypoint is in view, fetch the next
  // route content, if not available yet, and add the new route
  // to the array of elements in the infinite scroll.
  useEffect(() => {
    if (fetch.inView && next) {
      fetchNext();
    }
  }, [fetch.inView]);

  // Once the route waypoint is in view, change the route to the
  // current element. This preserves the route state between changes
  // to avoid rerendering.
  useEffect(() => {
    if (route.inView && state.router.link !== current.link) {
      actions.router.set(current.link, {
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
