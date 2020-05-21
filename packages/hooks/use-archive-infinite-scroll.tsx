import React, { useEffect } from "react";
import { useConnect, connect, css } from "frontity";
import useInfiniteScroll from "./use-infinite-scroll";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";

export const Wrapper = connect(({ link, children }) => {
  const { state } = useConnect<WpSource & TinyRouter>();

  // Values from browser state.
  const links: string[] = state.router.state.links || [link];
  const limit: number = state.router.state.limit;

  // Shorcuts to needed state.
  const current = state.source.get(link);
  const next = current.next ? state.source.get(current.next) : null;
  const last = state.source.get(links[links.length - 1]);

  // Infinite scroll booleans.
  const hasReachedLimit = !!limit && links.length >= limit;
  const isLast = last.link === current.link;
  const isThereNext = !!next;
  const shouldRenderFetch = !hasReachedLimit || !isLast || !isThereNext;

  const { supported, fetchRef, routeRef } = useInfiniteScroll({
    currentLink: link,
    nextLink: next?.link,
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
      {shouldRenderFetch && <div css={fetcher} ref={fetchRef} />}
    </div>
  );
});

export interface Options {
  limit?: number;
  context?: string;
}

export default (options: Options = {}) => {
  const { state, actions } = useConnect<WpSource & TinyRouter>();

  // Values from/for browser state.
  const links: string[] = state.router.state.links || [state.router.link];
  const limit: number = state.router.state.limit || options.limit;

  // Shorcuts to needed state.
  const current = state.source.get(state.router.link);
  const last = state.source.get(links[links.length - 1]);

  // Initialize/update browser state.
  useEffect(() => {
    actions.router.set(current.link, {
      method: "replace",
      state: {
        links,
        limit,
        ...state.router.state,
      },
    });
  }, []);

  // Requests the next page disregarding the limit.
  const fetchNext = () => {
    if (!last.next) return;

    const links = state.router.state.links || [current.link];

    if (links.includes(last.next)) return;

    console.log("fetching", last.next);

    const next = state.source.get(last.next);

    if (!next.isReady && !next.isFetching) {
      actions.source.fetch(last.next);
    }

    links.push(last.next);

    actions.router.set(current.link, {
      method: "replace",
      state: {
        ...state.router.state,
        links,
      },
    });
  };

  // Map every link to its DIY object.
  const pages = links.map((link) => ({
    key: link,
    link: link,
    isLastPage:
      link === last.link || (link === links[links.length - 2] && !last.isReady),
    Wrapper,
  }));

  // Infinite scroll booleans.
  const isFetching = last.isFetching;
  const hasReachedLimit = !!limit && links.length >= limit;
  const thereIsNext = !!last.next;
  const isLimit = hasReachedLimit && thereIsNext && !isFetching;

  return {
    pages,
    isLimit,
    isFetching,
    fetchNext,
  };
};
