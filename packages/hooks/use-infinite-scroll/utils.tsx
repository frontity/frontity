import { isError } from "@frontity/source";
import { connect, css, useConnect } from "frontity";
import memoize from "ramda/src/memoizeWith";
import useInfiniteScroll from ".";
import {
  IntersectionOptions,
  Packages,
  WrapperGenerator,
  InternalWrapperProps,
} from "./types";

/**
 * Generate a memoize Wrapper.
 *
 * @param wrapperGenerator - The function that generates the wrapper and needs
 * to be memoized.
 *
 * @returns A memoized Wrapper.
 */
export const generateMemoizedWrapper = (wrapperGenerator: WrapperGenerator) =>
  memoize(
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
 * Component used inside `<Wrapper>` components to reuse some shared logic. It's
 * the one that uses the `useInfiniteScroll` hook.
 */
export const InternalWrapper: React.FC<InternalWrapperProps> = connect(
  ({
    children,
    className,
    link,
    nextLink,
    fetchInViewOptions,
    routeInViewOptions,
    hasReachedLimit,
  }) => {
    const { state } = useConnect<Packages>();
    const current = state.source.get(link);

    const { supported, fetchRef, routeRef } = useInfiniteScroll({
      currentLink: link,
      nextLink,
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
  },
  { injectProps: false }
);
