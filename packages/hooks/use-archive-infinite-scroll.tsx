import React, { useEffect } from "react";
import { useConnect, connect, css } from "frontity";
import { Connect } from "frontity/types";
import memoize from "ramda/src/memoizeWith";
import useInfiniteScroll from "./use-infinite-scroll";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

type Wrapper = (link: string) => React.FC<Connect<Source & Router>>;

type UseArchiveInfiniteScroll = (options: {
  limit?: number;
}) => {
  pages: {
    key: string;
    link: string;
    isLastPage: boolean;
    Wrapper: React.FC<Connect<Source & Router>>;
  }[];
  isLimit: boolean;
  isFetching: boolean;
  fetchNext: () => Promise<void>;
};

const Wrapper: Wrapper = memoize(
  (key) => key,
  (link) =>
    connect(({ state, children }) => {
      // Values from browser state.
      const links: string[] = state.router.state.infiniteScroll?.links || [
        link,
      ];
      const limit: number = state.router.state.infiniteScroll?.limit;

      // Shorcuts to needed state.
      const current = state.source.get(link);
      const next = current.next ? state.source.get(current.next) : null;

      // Infinite scroll booleans.
      const hasReachedLimit = !!limit && links.length >= limit;

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
          {!hasReachedLimit && <div css={fetcher} ref={fetchRef} />}
        </div>
      );
    })
);

const useArchiveInfiniteScroll: UseArchiveInfiniteScroll = (options) => {
  const { state, actions } = useConnect<Source & Router>();

  // Values from/for browser state.
  const links: string[] = state.router.state.infiniteScroll?.links || [
    state.router.link,
  ];
  const limit: number =
    state.router.state.infiniteScroll?.limit || options.limit;

  // Aliases to needed state.
  const current = state.source.get(state.router.link);
  const last = state.source.get(links[links.length - 1]);

  // Infinite scroll booleans.
  const hasReachedLimit = !!limit && links.length >= limit;
  const thereIsNext = !!last.next;
  const isFetching = last.isFetching;
  const isLimit = hasReachedLimit && thereIsNext && !isFetching;

  // Initialize/update browser state.
  useEffect(() => {
    actions.router.updateState({
      ...state.router.state,
      infiniteScroll: {
        links,
        limit,
        ...state.router.state.infiniteScroll,
      },
    });
  }, []);

  // Requests the next page disregarding the limit.
  const fetchNext = async () => {
    if (!thereIsNext) return;

    const links = state.router.state.infiniteScroll?.links
      ? [...state.router.state.infiniteScroll.links]
      : [current.link];

    if (links.includes(last.next)) return;

    console.info("fetching", last.next);

    links.push(last.next);

    const next = state.source.get(last.next);

    if (!next.isReady && !next.isFetching) {
      await actions.source.fetch(last.next);
    }

    actions.router.updateState({
      ...state.router.state,
      infiniteScroll: {
        ...state.router.state.infiniteScroll,
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
    Wrapper: Wrapper(link),
  }));

  return {
    pages,
    isLimit,
    isFetching,
    fetchNext,
  };
};

export default useArchiveInfiniteScroll;
