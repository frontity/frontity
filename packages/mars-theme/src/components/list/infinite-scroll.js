import React from "react";
import { connect, styled } from "frontity";
import useInfiniteScroll from "@frontity/hooks/use-infinite-scroll";

const InfiniteScroll = ({ link, state, Loading, Page }) => {
  const data = state.source.get(link);

  if (!data.isReady && !data.isFetching) return null;

  const { fetchRef, routeRef } = useInfiniteScroll({
    currentLink: data.link,
    nextLink: data.next,
  });

  return (
    <Container ref={routeRef}>
      {data.isReady ? (
        <>
          <Page link={link} />
          <Fetcher ref={fetchRef} />
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default connect(InfiniteScroll);

const Container = styled.div`
  position: relative;
`;

const Fetcher = styled.div`
  position: absolute;
  bottom: 0;
`;
