import React, { useEffect } from "react";
import { connect, css, useConnect } from "frontity";
import { Connect } from "frontity/types";
import memoize from "ramda/src/memoizeWith";
import useInfiniteScroll from "./use-infinite-scroll";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

/**
 * The types of the {@link usePostTypeInfiniteScroll} hook.
 */
type UsePostTypeInfiniteScroll = (options?: {
  /**
   * The number of pages that the hook should load automatically before
   * switching to manual fetching.
   */
  limit?: number;

  /**
   * A boolean indicating if this hook should be active or not. It can be
   * useful in situations where users want to share the same component for
   * different types of Archives, but avoid doing infinite scroll in some of
   * them.
   */
  active?: boolean;

  /**
   * The archive that should be used to get the next posts. If none is present,
   * the previous link is used. If the previous link is not an archive, the
   * homepage is used.
   */
  archive?: string;

  /**
   * The archive that should be used if the `archive` option is not present and
   * the previous link is not an archive.
   */
  fallback?: string;
}) => {
  /**
   * An array of the existing posts. Users should iterate over this array in
   * their own layout.
   */
  posts: {
    /**
     * A unique key to be used in the iteration.
     */
    key: string;

    /**
     * The link of this post.
     */
    link: string;

    /**
     * If this post is the last post. Useful to add separators between posts,
     * but avoid adding it for the last one.
     */
    isLast: boolean;

    /**
     * The Wrapper component that should wrap the real `Post` component.
     */
    Wrapper: React.FC<Connect<Source & Router>>;
  }[];
  /**
   * If it has reached the limit of posts and it should switch to manual mode.
   */
  isLimit: boolean;

  /**
   * If it's fetching the next post. Useful to add a loader.
   */
  isFetching: boolean;

  /**
   * A function that fetches the next post. Useful when the limit has been
   * reached (`isLimit === true`) and the user pushes a button to get the next
   * post.
   */
  fetchNext: () => Promise<void>;
};

/**
 * A function that generates Wrapper components.
 *
 * @param link The link for the post that the Wrapper belongs to.
 *
 * @returns A React component that should be used to wrap the post.
 */
export const Wrapper = (link: string): React.FC<Connect<Source & Router>> =>
  connect(({ children, className }) => {
    const { state } = useConnect<Source & Router>();

    // Values from browser state.
    const links: string[] = state.router.state.infiniteScroll?.links || [link];
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
      <div css={container} ref={routeRef} className={className}>
        {children}
        {!hasReachedLimit && <div css={fetcher} ref={fetchRef} />}
      </div>
    );
  });

/**
 * A memoized {@link Wrapper} to generate Wrapper components only once.
 *
 * @param link The link for the post that the Wrapper belongs to.
 *
 * @returns A React component that should be used to wrap the post.
 */
const MemoizedWrapper = memoize((link: string) => link, Wrapper);

/**
 * A hook used to add infinite scroll to any Frontity post type.
 *
 * @param options - Options for the hook, like the number of posts it should
 * load autoamtically or if it's active or not. Defined in {@link
 * UsePostTypeInfiniteScroll}.
 *
 * @returns - An array of posts and other useful booleans. Defined in {@link
 * UsePostTypeInfiniteScroll}.
 */
const usePostTypeInfiniteScroll: UsePostTypeInfiniteScroll = (options = {}) => {
  const defaultOptions = { active: true };
  options = { ...defaultOptions, ...options };

  const { state, actions } = useConnect<Source & Router>();

  // Values for browser state.
  const archive: string = (() => {
    // If `archive` is set in options, use it.
    if (options.archive) {
      return options.archive;
    }

    // If `archive` is already in the state, use it.
    if (state.router.state.infiniteScroll?.archive) {
      return state.router.state.infiniteScroll.archive;
    }

    // If `state.router.previous` is an archive, use it.
    const previous = state.router.previous
      ? state.source.get(state.router.previous)
      : null;
    if (previous?.isArchive) {
      return previous.link;
    }

    // If `fallback` is set in options, use it.
    if (options.fallback) {
      return options.fallback;
    }

    // Return home as default.
    return "/";
  })();
  const pages: string[] = state.router.state.infiniteScroll?.pages
    ? [...state.router.state.infiniteScroll.pages]
    : [archive];
  const links: string[] = state.router.state.infiniteScroll?.links
    ? [...state.router.state.infiniteScroll.links]
    : [state.router.link];
  const limit = state.router.state.infiniteScroll?.limit || options.limit;

  // Initialize/update browser state.
  useEffect(() => {
    if (!options.active) return;

    actions.router.updateState({
      ...state.router.state,
      infiniteScroll: {
        ...state.router.state.infiniteScroll,
        archive,
        pages,
        links,
        limit,
      },
    });
  }, [options.active]);

  // Aliases to needed state.
  const firstLink = links[0];
  const last = state.source.get(links[links.length - 1]);
  const lastPage = state.source.get(pages[pages.length - 1]);
  const nextPage = lastPage.next ? state.source.get(lastPage.next) : null;
  const items = pages.reduce((final, current, index) => {
    const data = state.source.get(current);
    if (data.isArchive && data.isReady) {
      const items =
        index !== 0
          ? data.items.filter(({ link }) => link !== firstLink)
          : data.items;
      final = final.concat(items);
    }
    return final;
  }, []);
  const lastIndex = items.findIndex(({ link }) => link === last.link);

  // Infinite scroll booleans.
  const isLastItem = items[items.length - 1]?.link === state.router.link;
  const hasReachedLimit = !!limit && links.length >= limit;
  const thereIsNext = lastIndex < items.length - 1 || !!lastPage.next;
  const isFetching =
    last.isFetching || (pages.length > 1 && lastPage.isFetching);
  const isLimit = hasReachedLimit && thereIsNext && !isFetching;

  // Request archive if not present.
  useEffect(() => {
    if (!options.active) return;

    const data = archive ? state.source.get(archive) : null;

    if (data?.isArchive && !data.isReady && !data.isFetching) {
      actions.source.fetch(data.link);
    }
  }, [options.active]);

  // Request next page on last item.
  useEffect(() => {
    if (!options.active || !nextPage || hasReachedLimit || !isLastItem) return;

    pages.push(nextPage.link);

    actions.router.updateState({
      ...state.router.state,
      infiniteScroll: {
        ...state.router.state.infiniteScroll,
        pages,
      },
    });

    if (!nextPage.isReady && !nextPage.isFetching) {
      actions.source.fetch(nextPage.link);
    }
  }, [options.active, state.router.link, items.length, hasReachedLimit]);

  // Fetches the next item disregarding the limit.
  const fetchNext = async () => {
    if (!options.active || !thereIsNext) return;

    const links = state.router.state.infiniteScroll?.links
      ? [...state.router.state.infiniteScroll.links]
      : [state.router.link];

    // We need `nextItem` to be declared in local scope.
    let nextItem = items[lastIndex + 1];

    if (!nextItem) {
      if (!nextPage) return;

      pages.push(nextPage.link);

      actions.router.updateState({
        ...state.router.state,
        infiniteScroll: {
          ...state.router.state.infiniteScroll,
          links,
          pages,
        },
      });

      if (!nextPage.isReady && !nextPage.isFetching) {
        await actions.source.fetch(nextPage.link);
      }

      const items = pages.reduce((final, current, index) => {
        const data = state.source.get(current);
        if (data.isArchive && data.isReady) {
          const items =
            index !== 0
              ? data.items.filter(({ link }) => link !== firstLink)
              : data.items;
          final = final.concat(items);
        }
        return final;
      }, []);

      nextItem = items[lastIndex + 1];
    }

    if (links.includes(nextItem.link)) return;

    links.push(nextItem.link);

    actions.router.updateState({
      ...state.router.state,
      infiniteScroll: {
        ...state.router.state.infiniteScroll,
        links,
        pages,
      },
    });

    const next = state.source.get(nextItem.link);

    if (!next.isReady && !next.isFetching) {
      await actions.source.fetch(nextItem.link);
    }
  };

  // Map every link to its DIY object.
  const posts = links.map((link) => ({
    key: link,
    link: link,
    isLast:
      (link === last.link && last.isReady) ||
      (link === links[links.length - 2] && !last.isReady),
    Wrapper: MemoizedWrapper(link),
  }));

  return {
    posts,
    isLimit,
    isFetching,
    fetchNext,
  };
};

export default usePostTypeInfiniteScroll;
