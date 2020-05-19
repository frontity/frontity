import React, { useEffect } from "react";
import { useConnect, connect, css } from "frontity";
import useInfiniteScroll from "./use-infinite-scroll";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";

export const Wrapper = connect(({ link, children }) => {
  const { state } = useConnect<WpSource & TinyRouter>();
  const current = state.source.get(link);
  const links = state.router.state.links || [link];
  const next = current.next ? state.source.get(current.next) : null;
  const last = state.source.get(links[links.length - 1]);

  // TODO:
  // Scenarios that need to be supported:
  // - the current element is not in the context array.
  // - the current element is in the context array.
  // - the current element is the last element in the context array.

  const isLimit = false;
  // const isLimit = (() => {
  //   const { limit } = state.router.state;
  //   const hasReachedLimit = !!limit && links.length >= limit;

  //   if (last.isPostType && context && context.isArchive) {
  //     // TODO: add isNotFecthing clause.
  //     const isNotLastItem =
  //       context.items[context.items.length - 1].link !== last.link;
  //     const isThereNext = !!context.next;
  //     return hasReachedLimit && (isNotLastItem || isThereNext);
  //   }

  //   if (last.isArchive) {
  //     const isNotFetching = !last.isFetching;
  //     const isThereNext = !!last.next;
  //     return hasReachedLimit && isNotFetching && isThereNext;
  //   }

  //   return false;
  // })();

  // console.log("Wrapper iLimit:", isLimit);

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
