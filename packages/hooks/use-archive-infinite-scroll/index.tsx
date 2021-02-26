import React, { useEffect } from "react";
import { useConnect, connect } from "frontity";
import { isArchive, isError } from "@frontity/source";
import {
  generateMemoizedWrapper,
  InternalWrapper,
} from "../use-infinite-scroll/utils";
import {
  Packages,
  WrapperGenerator,
  WrapperProps,
} from "../use-infinite-scroll/types";
import {
  UseArchiveInfiniteScrollOptions,
  UseArchiveInfiniteScrollOutput,
} from "./types";

/**
 * Generate a Wrapper component.
 *
 * @param options - The link for the page that the Wrapper belongs to
 * and the intersection observer options for fetching and routing.
 *
 * @returns A React component that should be used to wrap the page.
 */
export const wrapperGenerator: WrapperGenerator = ({
  link,
  fetchInViewOptions,
  routeInViewOptions,
}) => {
  /**
   * The wrapper component returned by this hook.
   *
   * @param props - The component props.
   * @returns A react element.
   */
  const ArchiveWrapper: React.FC<WrapperProps> = ({ children, className }) => {
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

    const props = {
      link,
      nextLink: next?.link,
      className,
      children,
      fetchInViewOptions,
      routeInViewOptions,
      hasReachedLimit: !!limit && links.length >= limit,
    };

    return <InternalWrapper {...props} />;
  };

  return connect(ArchiveWrapper, { injectProps: false });
};

/**
 * The memoized <Wrapper> component.
 */
const MemoizedWrapper = generateMemoizedWrapper(wrapperGenerator);

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

  // Values from/for browser state. If we have already added links to the
  // browser state, we use those. If not, we start with the initial link. The
  // same for the limit.
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
      // Don't fetch if this hook is not active anymore.
      !options.active ||
      // Don't fetch if there is no next link and the last one was not an error.
      // This is because we use the same function to refetch the last link if
      // there was an error.
      (!thereIsNext && !isLastError) ||
      // Don't fetch if the next item is already included in the links. This
      // means it has been already fetched or it won't be there.
      (isArchive(last) && links.includes(last.next))
    )
      return;

    if (isLastError) {
      // If the last link returned an error, we use this function to repeat the
      // fetch.
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
      : ({ children }) => <>{children}</>,
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
