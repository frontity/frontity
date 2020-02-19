import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "../link";

const paginate = (totalPages, currentPage) => {
  const delta = 1;
  const range = []; // pagination without dots
  const pagination = []; // formatted pagination - with dots
  let last;

  // Push first page - 1
  range.push(1);

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < totalPages && i > 1) range.push(i);
  }

  // Push last page - totalPages
  range.push(totalPages);

  /**
   * range[] when totalPages is 5 and currentPage is 1 => [1, 2, 5];
   * range[] when totalPages is 5 and currentPage is 3 => [1, 2, 3, 4, 5];
   * range[] when totalPages is 5 and currentPage is 5 => [1, 5, 5];
   */
  for (let item of range) {
    if (last) {
      if (item - last === 3) pagination.push(last + 1);

      if (item - last !== 1) pagination.push("...");
    }

    pagination.push(item);
    last = item;
  }

  return pagination;
};

const Pagination = ({ state, actions, libraries }) => {
  const { totalPages } = state.source.get(state.router.link);
  const { path, page, query } = libraries.source.parse(state.router.link);

  // returns true if next page exists
  const hasOlderPosts = page < totalPages;
  // returns true if previous page exists
  const hasNewerPosts = page > 1;
  // get page link with page number
  const getPageLink = pageNo =>
    libraries.source.stringify({ path, query, page: pageNo });

  // Pagination - array of numbers/dots for pages
  const pagination = paginate(totalPages, page);

  // Prefetch next page if it hasn't been fetched yet.
  useEffect(() => {
    if (hasOlderPosts) actions.source.fetch(getPageLink(page + 1));
  }, []);

  if (totalPages <= 1) {
    return <div />;
  }

  return (
    <Container>
      <div>
        {hasNewerPosts && (
          <Link link={getPageLink(page - 1)}>← Newer Posts</Link>
        )}
      </div>

      <div className="">
        <ul>
          {pagination.map(item => {
            // if item is dots
            if (item === "...") {
              return (
                <li className="dots" key={item}>
                  ...
                </li>
              );
            }

            // is item is current page
            if (item === page) {
              return (
                <li className="active" key={item}>
                  {item}
                </li>
              );
            }

            return (
              <li key={item}>
                <Link link={getPageLink(item)}>{item}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        {hasOlderPosts && (
          <Link link={getPageLink(page + 1)}>Older Posts →</Link>
        )}
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.3em;
  font-weight: 700;
  word-spacing: 5px;
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - 4rem);

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ul {
    list-style: none;
    margin: 0;

    li {
      display: inline-block;
      padding: 0 5px;
    }
  }
`;

export default connect(Pagination);
