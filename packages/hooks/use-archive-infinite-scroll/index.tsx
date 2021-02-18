import React, { useEffect } from "react";
import { useConnect, connect, css } from "frontity";
import memoize from "ramda/src/memoizeWith";
import useInfiniteScroll from "../use-infinite-scroll";
import { isArchive, isError } from "@frontity/source";
import { IntersectionOptions, Packages } from "../use-infinite-scroll/types";
import {
  UseArchiveInfiniteScrollOptions,
  UseArchiveInfiniteScrollOutput,
  WrapperGeneratorParams,
} from "./types";

/**
 * A function that generates Wrapper components.
 *
 * @param options - The link for the page that the Wrapper belongs to
 * and the intersection observer options for fetching and routing.
 *
 * @returns A React component that should be used to wrap the page.
 */
export const wrapperGenerator = ({
  link,
  fetchInViewOptions,
  routeInViewOptions,
}: WrapperGeneratorParams): React.FC => {
  /**
   * The wrapper component returned by this hook.
   *
   * @param props - The component props.
   * @returns A react element.
   */
  const Wrapper: React.FC<{
    /** React element passed as prop. */
    children: React.ReactElement;
    /** HTML class attribute. */
    className: string;
  }> = ({ children, className }) => {
    const { state } = useConnect<Packages>();
    const { infiniteScroll } = state.router.state;

    // Values from browser state.
    const links: string[] = infiniteScroll?.links || [link];
    const limit: number = infiniteScroll?.limit;

    // Shorcuts to needed state.
    const current = state.source.get(link);
    const next =
      isArchive(current) && current.next
        ? state.source.get(current.next)
        : null;

    // Infinite scroll booleans.
    const hasReachedLimit = !!limit && links.length >= limit;

    const { supported, fetchRef, routeRef } = useInfiniteScroll({
      currentLink: link,
      nextLink: next?.link,
      fetchInViewOptions,
      routeInViewOptions,
    });

    if (!current.isReady || isError(current)) return null;
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
  };

  return connect(Wrapper, { injectProps: false });
};

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
    wrapperGenerator({
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
 * UseArchiveInfiniteScrollOptions}.
 *
 * @returns - An array of pages and other useful booleans. Defined in {@link
 * UseArchiveInfiniteScrollOutput}.
 */
const useArchiveInfiniteScroll = (
  options: UseArchiveInfiniteScrollOptions = {}
): UseArchiveInfiniteScrollOutput => {
  const defaultOptions = { active: true };
  options = { ...defaultOptions, ...options };

  const { state, actions } = useConnect<Packages>();
  const { infiniteScroll } = state.router.state;

  // Values from/for browser state.
  const links: string[] = infiniteScroll?.links
    ? [...infiniteScroll?.links]
    : [state.router.link];
  const limit: number = infiniteScroll?.limit || options.limit;

  // Initialize/update browser state.
  useEffect(() => {
    if (!options.active) return;

    actions.router.updateState({
      ...state.router.state,
      infiniteScroll: {
        links,
        limit,
        ...infiniteScroll,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.active]);

  // Aliases to needed state.
  const last = state.source.get(links[links.length - 1]);
  const next =
    isArchive(last) && last.next ? state.source.get(last.next) : null;

  // Infinite scroll booleans.
  const hasReachedLimit = !!limit && links.length >= limit;
  const thereIsNext = isArchive(last) && last.next;
  const isFetching = last.isFetching || !!next?.isFetching;
  const isLastError = isError(last);
  const isLimit = hasReachedLimit && thereIsNext && !isFetching;

  /**
   * Function to fetch the next item disregarding the limit.
   */
  const fetchNext = async () => {
    if (
      !options.active ||
      (!thereIsNext && !isLastError) ||
      (isArchive(last) && links.includes(last.next))
    )
      return;

    if (isLastError) {
      await actions.source.fetch(links[links.length - 1], { force: true });
    } else if (isArchive(last)) {
      links.push(last.next);

      actions.router.updateState({
        ...state.router.state,
        infiniteScroll: {
          ...infiniteScroll,
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
      (link === last.link && !!last.isReady && !isError(last)) ||
      (link === links[links.length - 2] && !last.isReady) ||
      (link === links[links.length - 2] && !!last.isReady && !!isError(last)),
    Wrapper: options.active
      ? MemoizedWrapper(link, {
          fetchInViewOptions: options.fetchInViewOptions,
          routeInViewOptions: options.routeInViewOptions,
        })
      : ({ children }) => <div>{children}</div>,
  }));

  return {
    pages,
    isLimit,
    isFetching,
    isError: isLastError,
    fetchNext,
  };
};

export default useArchiveInfiniteScroll;
