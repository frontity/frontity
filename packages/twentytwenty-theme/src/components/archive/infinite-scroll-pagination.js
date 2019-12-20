import React, { useEffect } from "react";
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

  // Store the reference to the current URL so that when the user
  // scrolls back up we can revert to this URL
  const currentLink = state.router.link;

  let data;
  const [scrollObserverVisible, scrollObserverRef] = useInView();
  const [nextPageVisible, nextPageRef] = useInView();

  if (scrollObserverVisible && isThereNextPage) {
    actions.source.fetch(nextPageLink);
    data = state.source.get(nextPageLink);
  }

  useEffect(() => {
    console.log("scroll", scrollObserverVisible);
    if (nextPageVisible) {
      history.pushState(null, null, nextPageLink);
    }
    if (
      scrollObserverVisible &&
      !nextPageVisible &&
      window.location.pathname !== currentLink
    ) {
      console.log("should go back here");
    }
  }, [nextPageVisible, scrollObserverVisible]);

  // useEffect(() => {
  //   console.log(scrollObserverRef);
  // }, [scrollObserverRef]);

  return (
    <Container>
      <PostSeparator />
      <Container>
        <ScrollObserver ref={scrollObserverRef} />
      </Container>
      <ArchiveContainer>
        {data && data.isFetching && <Loading />}
        <ArchiveContainer ref={nextPageRef}>
          {data && data.isArchive && (
            <Archive data={data} link={nextPageLink} />
          )}
        </ArchiveContainer>
      </ArchiveContainer>
    </Container>
  );
};

export default connect(InfiniteScroller);

const ScrollObserver = styled.div`
  position: absolute;
  bottom: 0;
  height: 500px;
  width: 100%;
  /* z-index: -1;
  visibility: hidden; */
  background: pink;
  opacity: 0.4;
`;

const ArchiveContainer = styled.div`
  width: auto;
  height: auto;
`;

const Container = styled.div`
  position: relative;
`;
