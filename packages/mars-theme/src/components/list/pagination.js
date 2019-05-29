import React, { useEffect } from "react";
import { connect } from "frontity";
import Link from "../link";

const Pagination = ({ state, actions }) => {
  const { totalPages } = state.source.data(state.router.path);
  const isThereNextPage = state.router.page < totalPages;
  const isTherePreviousPage = state.router.page > 1;

  // Fetch the next page if it hasn't been fetched yet.
  useEffect(() => {
    if (isThereNextPage)
      actions.source.fetch({
        path: state.router.path,
        page: state.router.page + 1
      });
  }, []);

  return (
    <div>
      {isThereNextPage && (
        <Link path={state.router.path} page={state.router.page + 1}>
          <em>← Older posts</em>
        </Link>
      )}
      {isTherePreviousPage && isThereNextPage && " - "}
      {isTherePreviousPage && (
        <Link path={state.router.path} page={state.router.page - 1}>
          <em>Newer posts →</em>
        </Link>
      )}
    </div>
  );
};

export default connect(Pagination);
