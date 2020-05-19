import React, { useEffect } from "react";
import { useConnect, connect, css } from "frontity";
import useInView from "./use-in-view";
import useAllPagesItems from "./use-all-pages-items";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";
import { IntersectionOptions } from "react-intersection-observer";

export interface Options {
  currentLink: string;
  nextLink: string;
  fetchInViewOptions?: IntersectionOptions;
  routeInViewOptions?: IntersectionOptions;
}

const useInfiniteScroll = ({
  currentLink,
  nextLink,
  fetchInViewOptions = {
    rootMargin: "400px 0px",
    triggerOnce: true,
  },
  routeInViewOptions = {
    rootMargin: "-70% 0% -29.9999% 0%",
  },
}: Options) => {
  const fetch = useInView(fetchInViewOptions);
  const route = useInView(routeInViewOptions);

  if (!fetch.supported || !route.supported) return { supported: false };

  const { state, actions } = useConnect<WpSource & TinyRouter>();

  const current = state.source.get(currentLink);
  const next = nextLink ? state.source.get(nextLink) : null;

  // Request the current route in case it's not ready
  // and it's not fetching.
  useEffect(() => {
    if (!current.isReady && !current.isFetching)
      actions.source.fetch(currentLink);
  }, []);

  // Once the fetch waypoint is in view, fetch the next
  // route content, if not available yet, and add the new route
  // to the array of elements in the infinite scroll.
  useEffect(() => {
    if (fetch.inView && nextLink) {
      console.log("fetching", nextLink);

      if (!next.isReady && !next.isFetching) {
        actions.source.fetch(nextLink);
      }

      const links = state.router.state.links || [currentLink];

      if (links.includes(nextLink)) return;

      links.push(nextLink);

      actions.router.set(currentLink, {
        method: "replace",
        state: {
          ...state.router.state,
          links,
        },
      });
    }
  }, [fetch.inView]);

  // Once the route waypoint is in view, change the route to the
  // current element. This preserves the route state between changes
  // to avoid rerendering.
  useEffect(() => {
    if (route.inView && state.router.link !== currentLink) {
      console.log("routing to", currentLink);
      actions.router.set(currentLink, {
        method: "replace",
        state: state.router.state,
      });
    }
  }, [route.inView]);

  return {
    supported: true,
    routeRef: route.ref,
    fetchRef: fetch.ref,
    routeInView: route.inView,
    fetchInView: fetch.inView,
  };
};

export default useInfiniteScroll;

export const Wrapper = connect(({ link, children }) => {
  const { state } = useConnect<WpSource & TinyRouter>();
  const current = state.source.get(link);
  const contextLink = state.router.state.context;
  const context = contextLink ? state.source.get(contextLink) : null;
  const links = state.router.state.links || [link];
  const last = state.source.get(links[links.length - 1]);

  // TODO:
  // Scenarios that need to be supported:
  // - the current element is not in the context array.
  // - the current element is in the context array.
  // - the current element is the last element in the context array.
  const nextLink = (() => {
    if (current.isPostType && contextLink) {
      const context = state.source.get(contextLink);
      // console.log("items:", items);
      const currentItem = items.findIndex((item) => item.link === currentLink);
      console.log("currentItem:", currentItem);

      if (items.length && currentItem >= items.length - 2) {
        console.log("fetching context");
        const nextContext = state.source.get(context.next);
        if (!nextContext.isReady && !nextContext.isFetching) {
          actions.source.fetch(context.next);
        }
      }

      const nextItem = items[currentItem + 1];

      // console.log("nextItem:", nextItem);

      if (nextItem) return nextItem.link;

      return nextItem ? nextItem.link : null;
    }

    return current.next || null;
  })();
  const isLimit = (() => {
    const { limit } = state.router.state;
    const hasReachedLimit = !!limit && links.length >= limit;

    if (last.isPostType && context && context.isArchive) {
      // TODO: add isNotFecthing clause.
      const isNotLastItem =
        context.items[context.items.length - 1].link !== last.link;
      const isThereNext = !!context.next;
      return hasReachedLimit && (isNotLastItem || isThereNext);
    }

    if (last.isArchive) {
      const isNotFetching = !last.isFetching;
      const isThereNext = !!last.next;
      return hasReachedLimit && isNotFetching && isThereNext;
    }

    return false;
  })();

  // console.log("Wrapper iLimit:", isLimit);

  const { supported, fetchRef, routeRef } = useInfiniteScroll({
    link,
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
