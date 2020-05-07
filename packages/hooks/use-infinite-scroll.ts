import { useEffect } from "react";
import { useConnect } from "frontity";
import useInView from "./use-in-view";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";

export interface Options {
  link: string;
}

export default ({ link }: Options) => {
  const fetch = useInView({
    rootMargin: "400px 0px",
    triggerOnce: true,
  });

  const route = useInView({
    rootMargin: "-70% 0% -29.9999% 0%",
  });

  if (!route.supported || !fetch.supported) return;

  const { state, actions } = useConnect<WpSource & TinyRouter>();

  const data = state.source.get(link);
  const next = state.source.get(data.next);

  if (!state.router.state.links) state.router.state.links = [link];

  useEffect(() => {
    if (fetch.inView && !next.isReady) {
      console.log("fetching");
      (async () => {
        await actions.source.fetch(next.link);
        actions.router.set(link, {
          method: "replace",
          state: {
            ...state.router.state,
            links: state.router.state.links.push(next.link),
          },
        });
      })();
    }
  }, [fetch.inView]);

  useEffect(() => {
    if (route.inView && state.router.link !== link) {
      console.log("routing");
      actions.router.set(link, {
        method: "replace",
        state: state.router.state,
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
