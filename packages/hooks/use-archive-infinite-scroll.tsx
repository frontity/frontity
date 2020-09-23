import React, { useEffect } from "react";
import { useConnect, connect, css } from "frontity";
import memoize from "ramda/src/memoizeWith";
import useInfiniteScroll, { IntersectionOptions } from "./use-infinite-scroll";
import Source from "@frontity/source/types";
import Router from "@frontity/router/types";

/**
 * The types of the {@link useArchiveInfiniteScroll} hook.
 */
type UseArchiveInfiniteScroll = (options?: {
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
   * The intersection observer options for fetching.
   */
  fetchInViewOptions?: IntersectionOptions;

  /**
   * The intersection observer options for routing.
   */
  routeInViewOptions?: IntersectionOptions;
}) => {
  /**
   * An array of the existing pages. Users should iterate over this array in
   * their own layout.
   */
  pages: {
    /**
     * A unique key to be used in the iteration.
     */
    key: string;

    /**
     * The link of this page.
     */
    link: string;

    /**
     * If this page is the last page. Useful to add separators between pages,
     * but avoid adding it for the last one.
     */
    isLast: boolean;

    /**
     * The Wrapper component that should wrap the real `Archive` component.
     */
    Wrapper: React.FC;
  }[];

  /**
   * If it has reached the limit of pages and it should switch to manual mode.
   */
  isLimit: boolean;

  /**
   * If it's fetching the next page. Useful to add a loader.
   */
  isFetching: boolean;

  /**
   * If the next page returned an error. Useful to try again.
   */
  isError: boolean;

  /**
   * A function that fetches the next page. Useful when the limit has been
   * reached (`isLimit === true`) and the user pushes a button to get the next
   * page.
   */
  fetchNext: () => Promise<void>;
};

/**
 * A function that generates Wrapper components.
 *
 * @param options - The link for the page that the Wrapper belongs to
 * and the intersection observer options for fetching and routing.
 *
 * @returns A React component that should be used to wrap the page.
 */
export const Wrapper = ({
  link,
  fetchInViewOptions,
  routeInViewOptions,
}: {
  /**
   * Link of the post that will be rendered inside this wrapper.
   */
  link: string;
  /**
   * The intersection observer options for fetching.
   */
  fetchInViewOptions?: IntersectionOptions;
  /**
   * The intersection observer options for routing.
   */
  routeInViewOptions?: IntersectionOptions;
}): React.FC =>
  connect(
    ({ children, className }) => {
      const { state } = useConnect<Source & Router>();

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
        fetchInViewOptions,
        routeInViewOptions,
      });

      if (!current.isReady || current.isError) return null;
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
    },
    { injectProps: false }
  );

/**
 * A memoized {@link Wrapper} to generate Wrapper components only once.
 *
 * @param link - The link for the page that the Wrapper belongs to.
 * @param options - The intersection observer options for fetching and routing.
 *
 * @returns A React component that should be used to wrap the page.
 */
const MemoizedWrapper = memoize(
  (link) => link,
  (
    link: string,
    options: {
      /**
       * The intersection observer options for fetching.
       */
      fetchInViewOptions: IntersectionOptions;
      /**
       * The intersection observer options for routing.
       */
      routeInViewOptions: IntersectionOptions;
    }
  ) =>
    Wrapper({
      link,
      fetchInViewOptions: options.fetchInViewOptions,
      routeInViewOptions: options.routeInViewOptions,
    })
);

/**
 * A hook used to add infinite scroll to any Frontity archive.
 *
 * @param options - Options for the hook, like the number of pages it should
 * load autoamtically or if it's active or not. Defined in {@link
 * UseArchiveInfiniteScroll}.
 *
 * @returns - An array of pages and other useful booleans. Defined in {@link
 * UseArchiveInfiniteScroll}.
 */
const useArchiveInfiniteScroll: UseArchiveInfiniteScroll = (options = {}) => {
  const defaultOptions = { active: true };
  options = { ...defaultOptions, ...options };

  const { state, actions } = useConnect<Source & Router>();

  // Values from/for browser state.
  const links: string[] = state.router.state.infiniteScroll?.links
    ? [...state.router.state.infiniteScroll?.links]
    : [state.router.link];
  const limit: number =
    state.router.state.infiniteScroll?.limit || options.limit;

  // Initialize/update browser state.
  useEffect(() => {
    if (!options.active) return;

    actions.router.updateState({
      ...state.router.state,
      infiniteScroll: {
        links,
        limit,
        ...state.router.state.infiniteScroll,
      },
    });
  }, [options.active]);

  // Aliases to needed state.
  const last = state.source.get(links[links.length - 1]);

  // Infinite scroll booleans.
  const hasReachedLimit = !!limit && links.length >= limit;
  const thereIsNext = !!last.next;
  const isFetching = last.isFetching;
  const isError = !!last.isError;
  const isLimit = hasReachedLimit && thereIsNext && !isFetching;

  /**
   * Function to fetch the next item disregarding the limit.
   */
  const fetchNext = async () => {
    if (
      !options.active ||
      (!thereIsNext && !isError) ||
      links.includes(last.next)
    )
      return;

    if (isError) {
      await actions.source.fetch(links[links.length - 1], { force: true });
    } else {
      links.push(last.next);

      actions.router.updateState({
        ...state.router.state,
        infiniteScroll: {
          ...state.router.state.infiniteScroll,
          links,
        },
      });

      const next = state.source.get(last.next);

      if (!next.isReady && !next.isFetching) {
        await actions.source.fetch(last.next);
      }
    }
  };

  // Map every link to its DIY object.
  const pages = links.map((link) => ({
    key: link,
    link: link,
    isLast:
      (link === last.link && !!last.isReady && !last.isError) ||
      (link === links[links.length - 2] && !last.isReady) ||
      (link === links[links.length - 2] && !!last.isReady && !!last.isError),
    Wrapper: MemoizedWrapper(link, {
      fetchInViewOptions: options.fetchInViewOptions,
      routeInViewOptions: options.routeInViewOptions,
    }),
  }));

  return {
    pages,
    isLimit,
    isFetching,
    isError,
    fetchNext,
  };
};

export default useArchiveInfiniteScroll;
