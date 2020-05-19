import { useEffect } from "react";
import { useConnect } from "frontity";
import { Wrapper } from "./use-infinite-scroll";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";

export interface Options {
  limit?: number;
  context?: string;
}

export default (options: Options = {}) => {
  const { state, actions } = useConnect<WpSource & TinyRouter>();
  const current = state.source.get(state.router.link);
  const links: string[] = state.router.state.links || [current.link];
  const last = state.source.get(links[links.length - 1]);
  const limit = state.router.state.limit || options.limit;
  const isLimit =
    !!limit && links.length >= limit && !last.isFetching && !!last.next;

  // Map every link to its DIY object.
  const pages = links.map((link) => ({
    key: link,
    link: link,
    isLastPage:
      link === last.link || (link === links[links.length - 2] && !last.isReady),
    Wrapper,
  }));

  // Initialize browser state.
  useEffect(() => {
    actions.router.set(current.link, {
      method: "replace",
      state: {
        links,
        limit: options.limit,
        ...state.router.state,
      },
    });
  }, []);

  // Increases the limit so more pages can be loaded.
  const increaseLimit = () => {
    actions.router.set(current.link, {
      method: "replace",
      state: {
        ...state.router.state,
        limit: state.router.state.limit ? state.router.state.limit + 1 : 1,
      },
    });
  };

  return {
    pages,
    isLimit,
    isFetching: last.isFetching,
    increaseLimit,
  };
};
