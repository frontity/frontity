import { useEffect } from "react";
import { useConnect } from "frontity";
import useInView from "./use-in-view";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";

export interface Options {
  currentLink: string;
  nextLink?: string;
  limit?: number;
}

export default ({ currentLink, nextLink, limit }) => {
  const fetch = useInView({
    rootMargin: "400px 0px",
    triggerOnce: true,
  });

  const route = useInView({
    rootMargin: "-70% 0% -29.9999% 0%",
  });

  if (!route.supported || !fetch.supported) return;

  const { state, actions } = useConnect<WpSource & TinyRouter>();

  const current = state.source.get(currentLink);
  const next = nextLink ? state.source.get(nextLink) : null;

  // Check if the current scroll has reached the limit.
  const isLimit =
    limit &&
    state.router.state.links &&
    state.router.state.links.length >= limit;

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
    if (fetch.inView && next && !isLimit) {
      if (!next.isReady) actions.source.fetch(next.link);

      const links = state.router.state.links || [current.link];
      if (!links.includes(next.link)) links.push(next.link);

      actions.router.set(current.link, {
        method: "replace",
        state: JSON.parse(
          JSON.stringify({
            ...state.router.state,
            links,
          })
        ),
      });
    }
  }, [fetch.inView]);

  // Once the route waypoint is in view, change the route to the
  // current element. This preserves the route state between changes
  // to avoid rerendering.
  useEffect(() => {
    if (route.inView && state.router.link !== current.link) {
      actions.router.set(current.link, {
        method: "replace",
        state: JSON.parse(JSON.stringify(state.router.state)),
      });
    }
  }, [route.inView]);

  return {
    routeRef: route.ref,
    fetchRef: fetch.ref,
    routeInView: route.inView,
    fetchInView: fetch.inView,
  };
};
