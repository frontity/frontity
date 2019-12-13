import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";

/**
 * Pagination Component
 *
 * It's used to allow the user to paginate between a list of posts.
 *
 * The `state`, `actions`, `libraries` props are provided by the global context,
 * when we wrap this component in `connect(...)`
 */
const Pagination = ({ state, libraries }) => {
  // Get the total posts to be displayed based for the current link
  const { totalPages } = state.source.get(state.router.link);
  const { path, page, query } = libraries.source.parse(state.router.link);

  // Check if we can go to next page within the pagination
  const isThereNextPage = page < totalPages;

  // Check if we can go to previous page within the pagination
  const isTherePreviousPage = page > 1;

  // Get the link for the next page
  const nextPageLink = libraries.source.stringify({
    path,
    page: page + 1,
    query
  });

  // Get the link for the previous page
  const prevPageLink = libraries.source.stringify({
    path,
    page: page - 1,
    query
  });

  return (
    <div>
      {/* If there's a next page, render this link */}
      {isThereNextPage && (
        <Link link={nextPageLink}>
          <Text>← Older posts</Text>
        </Link>
      )}

      {isTherePreviousPage && isThereNextPage && " - "}

      {/* If there's a previous page, render this link */}
      {isTherePreviousPage && (
        <Link link={prevPageLink}>
          <Text>Newer posts →</Text>
        </Link>
      )}
    </div>
  );
};

/**
 * Connect Pagination to global context to give it access to
 * `state`, `actions`, `libraries` via props
 */
export default connect(Pagination);

const Text = styled.em`
  display: inline-block;
  margin-top: 16px;
`;
