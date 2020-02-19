import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "../link";

const paginate = (totalPages, currentPage) => {
  const delta = 1;
  const pagination = [];

  // Push items from "current - 1" (if available) to current + 1 (if available)
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    // if current = 1, total = 7, pagination[] => [2]
    // if current = 5, total = 7, pagination[] => [4, 5, 6];
    // current = 7, total = 7, pagination[] => [6];
    pagination.push(i);
  }

  // if 3 or more pages exist before current page
  //  items from 2 to current - 2 will be "..."
  if (currentPage - delta > 2) {
    // add "..." to the beginning
    pagination.unshift("...");
  }

  // if 3 or more exists after current page
  // items from current + 2 to lastPage(totalPage) - 1 will be "..."
  if (currentPage + delta < totalPages - 1) {
    // add "..." to the end
    pagination.push("...");
  }

  // Always add 1 (first page) to the beginning
  pagination.unshift(1);
  // Always add totalPage (last page) to the end
  pagination.push(totalPages);

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
  const paginationArray = paginate(totalPages, page);

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
          {paginationArray.map((item, index) => {
            // if item is dots
            if (item === "...") {
              return (
                <li className="dots" key={index}>
                  ...
                </li>
              );
            }

            // is item is current page
            if (item === page) {
              return (
                <li className="active" key={index}>
                  {item}
                </li>
              );
            }

            return (
              <li key={index}>
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
