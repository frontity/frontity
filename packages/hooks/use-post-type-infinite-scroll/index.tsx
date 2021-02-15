import React, { useEffect } from "react";
import { connect, css, useConnect } from "frontity";
import { State } from "frontity/types";
import memoize from "ramda/src/memoizeWith";
import useInfiniteScroll from "../use-infinite-scroll";
import WpSource from "@frontity/wp-source/types";
import Router from "@frontity/router/types";
import { isArchive, isError, isRedirection } from "@frontity/source";
import {
  InfiniteScrollRouterState,
  IntersectionOptions,
  Packages,
} from "../use-infinite-scroll/types";
import {
  UsePostTypeInfiniteScrollOptions,
  UsePostTypeInfiniteScrollOutput,
  WrapperGeneratorParams,
} from "./types";

/**
 * Get links from pages, removing all redirected links.
 *
 * @param pages - List of links pointing to archive pages.
 * @param firstLink - Link that should be removed.
 * @param state - Frontity state.
 * @returns A list of links containing the posts, with redirections resolved.
 */
const getLinksFromPages = (
  pages: string[],
  firstLink: string,
  state: State<Packages>
): string[] => {
  // Get the data object of all pages.
  const pagesData = pages
    .map((link) => state.source.get(link))
    .filter((data) => isArchive(data) && data.isReady);

  // Get all the post links from the pages.
  const rawLinks = pagesData.reduce((allLinks, data, index) => {
    // Add items from this data object if it's an archive.
    if (isArchive(data)) {
      let dataLinks = data.items.map(({ link }) => link);
      if (index > 0) dataLinks = dataLinks.filter((link) => link !== firstLink);
      allLinks = allLinks.concat(dataLinks);
    }
    return allLinks;
  }, [] as string[]);

  // Remove links that point to redirections.
  return rawLinks
    .map((link) => state.source.get(link))
    .filter((data) => !isRedirection(data))
    .map(({ link }) => link);
};

/**
 * A function that generates Wrapper components.
 *
 * @param options - The link for the page that the Wrapper belongs to
 * and the intersection observer options for fetching and routing.
 *
 * @returns A React component that should be used to wrap the post.
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

    const { infiniteScroll } = state.router.state as InfiniteScrollRouterState;

    // Values from browser state.
    const links: string[] = infiniteScroll?.links || [link];
    const limit: number = infiniteScroll?.limit;
    const pages: string[] = infiniteScroll?.pages || [];

    // Aliases to needed state.
    const current = state.source.get(link);
    const firstLink = links[0];

    const sourceLinks = getLinksFromPages(pages, firstLink, state);
    const currentIndex = sourceLinks.indexOf(link);
    const nextLink = sourceLinks[currentIndex + 1];

    // Infinite scroll booleans.
    const hasReachedLimit = !!limit && links.length >= limit;

    const { supported, fetchRef, routeRef } = useInfiniteScroll({
      currentLink: link,
      // nextLink: nextItem?.link,
      nextLink: nextLink,
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
 * @param link - The link for the post that the Wrapper belongs to.
 * @param options - The intersection observer options for fetching and routing.
 *
 * @returns A React component that should be used to wrap the post.
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
 * A hook used to add infinite scroll to any Frontity post type.
 *
 * @param options - Options for the hook, like the number of posts it should
 * load autoamtically or if it's active or not. Defined in {@link
 * UsePostTypeInfiniteScroll}.
 *
 * @returns - An array of posts and other useful booleans. Defined in {@link
 * UsePostTypeInfiniteScroll}.
 */
const usePostTypeInfiniteScroll = (
  options: UsePostTypeInfiniteScrollOptions = {}
): UsePostTypeInfiniteScrollOutput => {
  const defaultOptions = { active: true };
  options = { ...defaultOptions, ...options };

  const { state, actions } = useConnect<WpSource & Router>();
  const { infiniteScroll } = state.router.state as InfiniteScrollRouterState;

  // Values for browser state.
  const archive: string = (() => {
    // If `archive` is set in options, use it.
    if (options.archive) {
      return options.archive;
    }

    // If `archive` is already in the state, use it.
    if (infiniteScroll?.archive) {
      return infiniteScroll.archive;
    }

    // If `state.router.previous` is an archive, use it.
    const previous = state.router.previous
      ? state.source.get(state.router.previous)
      : null;

    if (previous && isArchive(previous)) {
      return previous.link;
    }

    // If `fallback` is set in options, use it.
    if (options.fallback) {
      return options.fallback;
    }

    // If subdirectory (and postsPage) exist, return them.
    if (state.source.subdirectory) {
      const subdirectory = state.source.subdirectory
        .replace(/^\/?/, "/")
        .replace(/\/?$/, "/");

      if (state.source.postsPage)
        return (
          subdirectory.replace(/\/?$/, "") +
          state.source.postsPage.replace(/^\/?/, "/").replace(/\/?$/, "/")
        );

      return subdirectory;
    }

    // If postsPage exists, return it.
    if (state.source.postsPage)
      return state.source.postsPage.replace(/^\/?/, "/").replace(/\/?$/, "/");

    // Return home as default.
    return "/";
  })();

  // List of links for the different archive pages.
  const pages: string[] = infiniteScroll?.pages
    ? [...infiniteScroll.pages]
    : [archive];

  // List of links for the posts contained in the archive pages.
  const links: string[] = infiniteScroll?.links
    ? [...infiniteScroll.links]
    : [state.router.link];

  const limit = infiniteScroll?.limit || options.limit;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.active]);

  // Aliases to needed state.
  const firstLink = links[0];
  const last = state.source.get(links[links.length - 1]);
  const lastPage = state.source.get(pages[pages.length - 1]);
  const nextPage =
    isArchive(lastPage) && lastPage.next
      ? state.source.get(lastPage.next)
      : null;

  const sourceLinks = getLinksFromPages(pages, firstLink, state);

  const lastIndex = sourceLinks.indexOf(last.link);
  const [lastLink] = sourceLinks.slice(-1);

  const currentIndex = sourceLinks.indexOf(last.link);
  const nextLink = sourceLinks[currentIndex + 1];
  const next = nextLink ? state.source.get(nextLink) : null;

  // Infinite scroll booleans.
  const isLastItem = lastLink === state.router.link;
  const hasReachedLimit = !!limit && links.length >= limit;
  const thereIsNext =
    lastIndex < sourceLinks.length - 1 ||
    (isArchive(lastPage) && !!lastPage.next);
  const isFetching =
    last.isFetching ||
    !!next?.isFetching ||
    (pages.length > 1 && lastPage.isFetching);
  const isLastError = isError(last) || isError(lastPage);
  const isLimit = hasReachedLimit && thereIsNext && !isFetching;

  // Request archive if not present.
  useEffect(() => {
    if (!options.active) return;

    const data = archive ? state.source.get(archive) : null;

    if (!data.isReady && !data.isFetching) {
      actions.source.fetch(data.link);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.active, state.router.link, sourceLinks.length, hasReachedLimit]);

  /**
   * Function to fetch the next item disregarding the limit.
   */
  const fetchNext = async () => {
    if (!options.active || (!thereIsNext && !isLastError)) return;

    const links = infiniteScroll?.links
      ? [...infiniteScroll.links]
      : [state.router.link];

    // We need `nextItem` to be declared in local scope.
    let nextLink = sourceLinks[lastIndex + 1];

    if (isLastError) {
      if (isError(lastPage))
        await actions.source.fetch(pages[pages.length - 1], { force: true });
    } else if (!nextLink) {
      if (!nextPage) return;

      pages.push(nextPage.link);

      actions.router.updateState({
        ...state.router.state,
        infiniteScroll: {
          ...infiniteScroll,
          links,
          pages,
        },
      });

      if (!nextPage.isReady && !nextPage.isFetching) {
        await actions.source.fetch(nextPage.link);
      }

      const sourceLinks = getLinksFromPages(pages, firstLink, state);

      nextLink = sourceLinks[lastIndex + 1];
    }

    if (isLastError) {
      if (isError(last))
        await actions.source.fetch(links[links.length - 1], { force: true });
    } else {
      if (links.includes(nextLink)) return;

      links.push(nextLink);

      actions.router.updateState({
        ...state.router.state,
        infiniteScroll: {
          ...state.router.state.infiniteScroll,
          links,
          pages,
        },
      });

      const next = state.source.get(nextLink);

      if (!next.isReady && !next.isFetching) {
        await actions.source.fetch(nextLink);
      }
    }
  };

  // Map every link to its DIY object.
  const posts = links.map((link) => ({
    key: link,
    link: link,
    isLast:
      (link === last.link && !!last.isReady && !isError(last)) ||
      (link === links[links.length - 2] && !last.isReady) ||
      (link === links[links.length - 2] && !!last.isReady && !!isError(last)),
    Wrapper: MemoizedWrapper(link, {
      fetchInViewOptions: options.fetchInViewOptions,
      routeInViewOptions: options.routeInViewOptions,
    }),
  }));

  return {
    posts,
    isLimit,
    isFetching,
    isError: isLastError,
    fetchNext,
  };
};

export default usePostTypeInfiniteScroll;
