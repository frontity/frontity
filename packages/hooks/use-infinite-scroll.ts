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

export default ({ currentLink, nextLink }) => {
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

  useEffect(() => {
    if (fetch.inView && next) {
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
