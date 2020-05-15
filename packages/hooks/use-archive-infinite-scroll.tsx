import React, { useEffect } from "react";
import { connect, useConnect, css } from "frontity";
import useInfiniteScroll from "./use-infinite-scroll";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";

const Wrapper = connect(({ link, children }) => {
  const { state } = useConnect<WpSource & TinyRouter>();
  const current = state.source.get(link);
  const links = state.router.state.links || [link];
  const last = state.source.get(links[links.length - 1]);
  const { limit } = state.router.state;
  const isLimit =
    !!limit && links.length >= limit && !last.isFetching && !!last.next;
  const { supported, fetchRef, routeRef } = useInfiniteScroll({
    link,
  });

  if (!current.isReady) return null;
  if (!supported) return children;

  const container = css`
    position: relative;
  `;

  const fetcher = css`
    position: absolute;
    width: 100%;
    bottom: 0;
  `;

  return (
    <div css={container} ref={routeRef}>
      {children}
      {!isLimit && <div css={fetcher} ref={fetchRef} />}
    </div>
  );
});

export interface Options {
  limit?: number;
  context?: string;
}

export default (options: Options = {}) => {
  const { state, actions } = useConnect<WpSource & TinyRouter>();
  const current = state.source.get(state.router.link);
  const links: string[] = state.router.state.links || [current.link];
  const last = state.source.get(links[links.length - 1]);
  const isLimit =
    !!options.limit &&
    links.length >= options.limit &&
    !last.isFetching &&
    !!last.next;

  // Map every link to its DIY object.
  const pages = links.map((link) => ({
    key: link,
    link: link,
    isLastPage: link === last.link,
    Wrapper,
  }));

  // Initialize browser state.
  useEffect(() => {
    actions.router.set(current.link, {
      method: "replace",
      state: {
        links,
        limit: options.limit,
        context: options.context,
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
