import { connect } from "frontity";
import React, { Fragment, useEffect } from "react";
import Article from "../post/post-item";
import ArchiveHeader from "./archive-header";
import Pagination from "./archive-pagination";
import PostSeparator from "../post/post-separator";
import Post from "../post";
import InfiniteScroller from "./infinite-scroll-pagination";
import { useInView } from "react-intersection-observer";

const Archive = ({
  state,
  showExcerpt,
  showMedia,
  data,
  link = state.router.link
}) => {
  // Get the data of the current list.
  data = data || state.source.get(link);
  const { primary } = state.theme.colors;

  // Whether the show the excerpt instead of the full content
  // If passed as prop, we'll respect that. Else, we'll use the theme settings
  const _showExcerpt = showExcerpt || !state.theme.showAllContentOnArchive;

  useEffect(() => {
    Post.preload();
  }, []);

  // Keep track of whether the Archive is visible or not.
  // We will pass this as prop to the <InfiniteScroll /> to keep the URL
  // in sync with whichever page number is currently visible
  const [archiveRef, archiveIsVisible] = useInView();

  return (
    <div ref={archiveRef}>
      {/* If the list is a taxonomy, we render a title. */}
      {data.isTaxonomy && (
        <ArchiveHeader labelColor={primary} label={data.taxonomy}>
          <span>{state.source[data.taxonomy][data.id].name}</span>
        </ArchiveHeader>
      )}

      {/* If the list is for a specific author, we render a title. */}
      {data.isAuthor && (
        <ArchiveHeader labelColor={primary} label="Author">
          <b>{state.source.author[data.id].name}</b>
        </ArchiveHeader>
      )}

      {/* Iterate over the items of the list. */}
      {data.items.map(({ type, id }, index) => {
        const isLastArticle = index === data.items.length - 1;
        const item = state.source[type][id];
        // Render one Item component for each one.
        return (
          <Fragment key={item.id}>
            <Article
              key={item.id}
              item={item}
              showExcerpt={_showExcerpt}
              showMedia={showMedia}
            />
            {!isLastArticle && <PostSeparator />}
          </Fragment>
        );
      })}
      {state.theme.infiniteScrolling ? (
        <InfiniteScroller
          currentPageVisible={archiveIsVisible}
          currentLink={link}
        />
      ) : (
        <Pagination />
      )}
    </div>
  );
};

export default connect(Archive);
