import React from "react";
import { connect, useConnect, styled } from "frontity";
import useInfiniteScroll from "./use-infinite-scroll";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";

const Page = connect(({ currentLink, nextLink, Component, Loading, limit }) => {
  const {
    fetchRef,
    routeRef,
    isReady,
    isFetching,
    hasReachedLimit,
    forceFetch,
  } = useInfiniteScroll({
    currentLink,
    nextLink,
    limit,
  });

  if (!isReady && !isFetching) return null;

  return (
    <Container ref={routeRef}>
      {isReady && (
        <>
          <Component link={currentLink} />
          <Fetcher ref={fetchRef} />
        </>
      )}
      {isFetching && !!Loading && <Loading />}
      {!isFetching && hasReachedLimit && (
        <Button onClick={forceFetch}>More!</Button>
      )}
    </Container>
  );
});

const Container = styled.div`
  position: relative;
`;

const Fetcher = styled.div`
  position: absolute;
  bottom: 0;
`;

const Button = styled.button`
  width: 800px;
  margin: 0;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    margin-top: 24px;
  }
`;

export interface Options {
  link?: string;
  limit?: number;
  Component: React.FC;
  Loading?: React.FC;
}

export default ({ link, limit, Component, Loading }: Options) => {
  const { state } = useConnect<WpSource & TinyRouter>();
  const current = state.source.get(link || state.router.link);
  const links: string[] = state.router.state.links || [current.link];

  const pages = links.map((link) => (
    <Page
      key={link}
      currentLink={link}
      nextLink={state.source.get(link).next}
      limit={limit}
      Component={Component}
      Loading={Loading}
    />
  ));

  return {
    links,
    pages,
  };
};
