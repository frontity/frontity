import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import { useInView } from "react-intersection-observer";

import PostSeparator from "../post/post-separator";
import Loading from "../loading";
import Archive from "./archive";

const InfiniteScroller = ({
  state,
  actions,
  libraries,
  currentPageVisible,
  currentLink
}) => {
  // Get the total posts to be displayed based for the current link
  const { totalPages } = state.source.get(currentLink);
  const { path, page, query } = libraries.source.parse(currentLink);

  // Check if we can go to next page within the pagination
  const isThereNextPage = page < totalPages;

  // Get the link for the next page
  const nextPageLink = libraries.source.stringify({
    path,
    page: page + 1,
    query
  });

  // Create a ref to ScrollObserver and observe it's visiblility.
  // ScrollObserver is a "hit area" - as soon as it's visible in the viewport
  const [scrollObserverRef, scrollObserverVisible] = useInView();

  // Create a ref for the following page. We use it to keep the URL in sync with the scrolling
  const [nextPageRef, nextPageVisible] = useInView();

  const nextPageData = state.source.get(nextPageLink);

  // Fetch the data for the following page
  useEffect(() => {
    if (scrollObserverVisible && isThereNextPage) {
      actions.source.fetch(nextPageLink);
    }
  }, [scrollObserverVisible, isThereNextPage]);

  // Keep the URL in sync with the pages, as the user keeps scrolling
  useEffect(() => {
    if (!nextPageVisible && currentPageVisible) {
      history.replaceState(null, null, currentLink);
    }
  }, [nextPageVisible, currentPageVisible]);

  return (
    <>
      <PostSeparator />
      <div style={{ position: `relative` }}>
        <ScrollObserver ref={scrollObserverRef} />
      </div>

      {nextPageData.isFetching && <Loading />}

      <div ref={nextPageRef}>
        {nextPageData.isArchive && (
          <Archive data={nextPageData} link={nextPageLink} />
        )}
      </div>
    </>
  );
};

export default connect(InfiniteScroller);

const ScrollObserver = styled.div`
  position: absolute;
  bottom: 0;
  height: 500px;
  width: 100%;
  z-index: -1;
  visibility: hidden;
`;
