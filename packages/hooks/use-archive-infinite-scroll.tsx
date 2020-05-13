import React from "react";
import { connect, useConnect, css } from "frontity";
import useInfiniteScroll from "./use-infinite-scroll";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";

const Wrapper = connect(({ link, children }) => {
  const { state } = useConnect<WpSource & TinyRouter>();

  const { supported, fetchRef, routeRef, isReady } = useInfiniteScroll({
    link,
  });

  if (!isReady) return null;

  children = React.Children.map(children, (child) =>
    child ? React.cloneElement(child, { link }) : child
  );

  if (!supported) return children;

  const { limit, links } = state.router.state;
  const last = state.source.get(links[links.length - 1]);

  const isLimit =
    !!limit && links.length >= limit && !last.isFetching && !!last.next;

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

export default ({ limit, context }: Options) => {
  const { state, actions } = useConnect<WpSource & TinyRouter>();

  const current = state.source.get(state.router.link);
  const links: string[] = state.router.state.links || [current.link];
  const last = state.source.get(links[links.length - 1]);

  if (typeof window === "undefined") {
    Object.assign(state.router.state, {
      links,
      context,
      limit,
    });
  }

  // Sync the browser state with the current router state.
  React.useEffect(() => {
    actions.router.set(current.link, {
      method: "replace",
      state: JSON.parse(JSON.stringify(state.router.state)),
    });
  }, []);

  const isLimit =
    !!limit && links.length >= limit && !last.isFetching && !!last.next;

  const increaseLimit = () => {
    actions.router.set(current.link, {
      method: "replace",
      state: JSON.parse(
        JSON.stringify({
          ...state.router.state,
          limit: state.router.state.limit + 1,
        })
      ),
    });
  };

  const pages = links.map((link) => ({
    key: link,
    link: link,
    isLastPage: link === last.link,
    Wrapper: Wrapper,
  }));

  return {
    pages,
    isLimit,
    isFetching: last.isFetching,
    increaseLimit,
  };
};
