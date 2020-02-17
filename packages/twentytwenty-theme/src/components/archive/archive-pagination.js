import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "../link";

const Pagination = ({ state, actions, libraries }) => {
  const { totalPages } = state.source.get(state.router.link);
  const { path, page, query } = libraries.source.parse(state.router.link);

  // returns true if next page exists
  const hasNextPage = page < totalPages;
  // returns false if previous page exists
  const hasPreviousPage = page > 1;
  // get page link with page number
  const getPageLink = pageNo =>
    libraries.source.stringify({ path, query, page: pageNo });

  // Prefetch next page if it hasn't been fetched yet.
  useEffect(() => {
    if (hasNextPage) actions.source.fetch(getPageLink(page + 1));
  }, []);

  return (
    <Container>
      <ul>
        {hasPreviousPage && (
          <li>
            <Link link={getPageLink(page - 1)} disabled>
              ← Prev
            </Link>
          </li>
        )}

        {hasNextPage && (
          <li>
            <Link link={getPageLink(page + 1)}>Next →</Link>
          </li>
        )}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #000;
`;

export default connect(Pagination);
