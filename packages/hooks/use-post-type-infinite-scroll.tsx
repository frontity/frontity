import React, { useEffect } from "react";
import { connect, css, useConnect } from "frontity";
import { Connect } from "frontity/types";
import memoize from "ramda/src/memoizeWith";
import useInfiniteScroll from "./use-infinite-scroll";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

type Wrapper = (link: string) => React.FC<Connect<Source & Router>>;

type UsePostTypeInfiniteScroll = (options: {
  limit?: number;
  archive?: string;
}) => {
  posts: {
    key: string;
    link: string;
    isLastPost: boolean;
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
      const pages: string[] = state.router.state.infiniteScroll?.pages || [];

      // Aliases to needed state.
      const current = state.source.get(link);
      const first = links[0];
      const items = pages.reduce((final, current, index) => {
        const data = state.source.get(current);
        if (data.isArchive && data.isReady) {
          const items =
            index !== 0
              ? data.items.filter(({ link }) => link !== first)
              : data.items;
          final = final.concat(items);
        }
        return final;
      }, []);
      const currentIndex = items.findIndex(({ link }) => link === current.link);
      const nextItem = items[currentIndex + 1];

      // Infinite scroll booleans.
      const hasReachedLimit = !!limit && links.length >= limit;

      const { supported, fetchRef, routeRef } = useInfiniteScroll({
        currentLink: link,
        nextLink: nextItem?.link,
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

const usePostTypeInfiniteScroll: UsePostTypeInfiniteScroll = (options) => {
  const { state, actions } = useConnect<Source & Router>();

  // Values from/for browser state.
  const links: string[] = state.router.state.infiniteScroll?.links || [
    state.router.link,
  ];
  const archive: string =
    state.router.state.infiniteScroll?.archive || options.archive;
  const pages: string[] = state.router.state.infiniteScroll?.pages || [archive];
  const limit = state.router.state.infiniteScroll?.limit || options.limit;

  // Aliases to needed state.
  const current = state.source.get(state.router.link);
  const first = links[0];
  const last = state.source.get(links[links.length - 1]);
  const lastPage = state.source.get(pages[pages.length - 1]);
  const nextPage = lastPage.next && state.source.get(lastPage.next);
  const items = pages.reduce((final, current, index) => {
    const data = state.source.get(current);
    if (data.isArchive && data.isReady) {
      const items =
        index !== 0
          ? data.items.filter(({ link }) => link !== first)
          : data.items;
      final = final.concat(items);
    }
    return final;
  }, []);
  const lastIndex = items.findIndex(({ link }) => link === last.link);

  // Infinite scroll booleans.
  const hasReachedLimit = !!limit && links.length >= limit;
  const thereIsNext = lastIndex < items.length - 1 || !!lastPage.next;
  const isFetching =
    last.isFetching || (pages.length > 1 && lastPage.isFetching);
  const isLimit = hasReachedLimit && thereIsNext && !isFetching;

  // Initialize/update browser state.
  useEffect(() => {
    actions.router.updateState({
      ...state.router.state,
      infiniteScroll: {
        links,
        archive,
        pages,
        limit,
        ...state.router.state.infiniteScroll,
      },
    });
  }, []);

  // Request archive if not present.
  useEffect(() => {
    const data = archive ? state.source.get(archive) : null;
    if (data && !data.isReady && !data.isFetching) {
      console.info("fetching archive", archive.link);
      actions.source.fetch(data.link);
    }
  }, []);

  // Request next page on last item.
  useEffect(() => {
    if (
      nextPage &&
      !hasReachedLimit &&
      items[items.length - 1]?.link === current.link
    ) {
      console.info("fetching page", nextPage.link);

      if (!nextPage?.isReady && !nextPage?.isFetching)
        actions.source.fetch(nextPage.link);

      if (pages.includes(nextPage.link)) return;

      pages.push(nextPage.link);

      actions.router.updateState({
        ...state.router.state,
        infiniteScroll: {
          ...state.router.state.infiniteScroll,
          pages,
        },
      });
    }
  }, [current.link, items.length, hasReachedLimit]);

  // Fetches the next item disregarding the limit.
  const fetchNext = async () => {
    if (!thereIsNext) return;

    const links = state.router.state.infiniteScroll?.links || [current.link];

    let nextItem = items[lastIndex + 1];
    let nextPage = state.source.get(lastPage.next);

    if (!nextItem) {
      if (!pages.includes(nextPage.link)) {
        console.info("fetching page", nextPage.link);

        // TODO:
        // Needs fix.
        // It's pushing inside `state.router.state.pages`.
        pages.push(nextPage.link);

        if (!nextPage?.isReady && !nextPage?.isFetching) {
          await actions.source.fetch(nextPage.link);
          nextPage = state.source.get(nextPage.link);
        }

        const items = pages.reduce((final, current, index) => {
          const data = state.source.get(current);
          if (data.isArchive && data.isReady) {
            const items =
              index !== 0
                ? data.items.filter(({ link }) => link !== first)
                : data.items;
            final = final.concat(items);
          }
          return final;
        }, []);

        nextItem = items[lastIndex + 1];
      }
    }

    if (links.includes(nextItem.link)) return;

    console.info("fetching", nextItem.link);

    const next = state.source.get(nextItem.link);

    if (!next.isReady && !next.isFetching) {
      actions.source.fetch(nextItem.link);
    }

    // TODO:
    // Needs fix.
    // It's pushing inside `state.router.state.links`.
    links.push(nextItem.link);

    actions.router.updateState({
      ...state.router.state,
      infiniteScroll: {
        ...state.router.state.infiniteScroll,
        links,
        pages,
      },
    });
  };

  // Map every link to its DIY object.
  const posts = links.map((link) => ({
    key: link,
    link: link,
    isLastPost:
      link === last.link || (link === links[links.length - 2] && !last.isReady),
    Wrapper: Wrapper(link),
  }));

  return {
    posts,
    isLimit,
    isFetching,
    fetchNext,
  };
};

export default usePostTypeInfiniteScroll;
