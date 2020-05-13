import React from "react";
import { connect, useConnect, css } from "frontity";
import useInfiniteScroll from "./use-infinite-scroll";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";

const Wrapper = connect(({ link, isLimit, children }) => {
  const { fetchRef, routeRef, isReady } = useInfiniteScroll({
    link,
  });

  if (!isReady) return null;

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
      {React.Children.map(children, (child) => {
        return child ? React.cloneElement(child, { link }) : child;
      })}
      {!isLimit && <div css={fetcher} ref={fetchRef} />}
    </div>
  );
});

export interface Options {
  limit?: number;
}

export default ({ limit }: Options) => {
  const { state, actions } = useConnect<WpSource & TinyRouter>();
  const current = state.source.get(state.router.link);
  const links: string[] = state.router.state.links || [current.link];
  const last = state.source.get(links[links.length - 1]);

  const isLimit =
    !!limit && links.length >= limit && !last.isFetching && last.next;

  // TODO:
  // Return: isLimit, isFetching, isLastPage, [Wrapper, link, key], fetchNextPage

  const pages = links.map((link) => ({
    key: link,
    link: link,
    isLastPage: link === last.link,
    Wrapper: Wrapper,
  }));

  const fetchNext = () => {
    const next = last.next ? state.source.get(last.next) : null;
    if (!next.isReady) actions.source.fetch(next.link);

    if (!links.includes(next.link)) {
      links.push(next.link);

      actions.router.set(current.link, {
        method: "replace",
        state: JSON.parse(
          JSON.stringify({
            ...state.router.state,
            links,
          })
        ),
      });
    }
  };

  return {
    pages,
    isLimit,
    isFetching: last.isFetching,
    fetchNext,
  };
};
