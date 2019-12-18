import React, { useEffect, useState } from "react";
import { connect, styled } from "frontity";
import useInView from "@frontity/hooks/use-in-view";

import PostSeparator from "../post/post-separator";
import Loading from "../loading";
import Archive from "./archive";

const InfiniteScroller = ({ state, actions, libraries }) => {
  // Get the total posts to be displayed based for the current link
  const { totalPages } = state.source.get(state.router.link);
  const { path, page, query } = libraries.source.parse(state.router.link);

  // Check if we can go to next page within the pagination
  const isThereNextPage = page < totalPages;

  // Get the link for the next page
  const nextPageLink = libraries.source.stringify({
    path,
    page: page + 1,
    query
  });

  let data;
  const [isVisible, scrollObserverRef] = useInView();
  const [nextPageVisible, nextPageRef] = useInView();

  if (isVisible && isThereNextPage) {
    actions.source.fetch(nextPageLink);
    data = state.source.get(nextPageLink);
  }

  // if (nextPageVisible) {
  //   actions.router.set(nextPageLink);
  // }

  return (
    <Container>
      <PostSeparator />
      <Container>
        <ScrollObserver ref={scrollObserverRef} />
        {data && data.isFetching && <Loading />}
        <NextPage ref={nextPageRef} />
      </Container>

      {data && data.isArchive && <Archive data={data} />}
    </Container>
  );
};

export default connect(InfiniteScroller);

const NextPage = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  /* z-index: -1;
  visibility: hidden; */
  background: pink;
`;

const ScrollObserver = styled.div`
  position: absolute;
  bottom: 0;
  height: 500px;
  width: 100%;
  /* z-index: -1;
  visibility: hidden; */
  background: pink;
`;

const Container = styled.div`
  position: relative;
`;
