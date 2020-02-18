import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "../link";

const Pagination = ({ state, actions, libraries }) => {
  const { totalPages } = state.source.get(state.router.link);
  const { path, page, query } = libraries.source.parse(state.router.link);

  // returns true if next page exists
  const hasNextPage = page < totalPages;
  // returns true if previous page exists
  const hasPreviousPage = page > 1;
  // get page link with page number
  const getPageLink = pageNo =>
    libraries.source.stringify({ path, query, page: pageNo });

  // Like range in python, returns array of numbers from min to max
  let range = (min, max) =>
    min === max ? [min] : [min, ...range(min + 1, max)];

  // TODO: generated array based on total page and current page
  const getFolios = () => {
    let foliosArray = range(1, totalPages);

    if (totalPages > 5) {
      foliosArray = [1];
      foliosArray.push("...");

      if (page + 2 >= totalPages) {
        foliosArray.push(...range(page, totalPages));
      }
    }

    return foliosArray;
  };

  // Prefetch next page if it hasn't been fetched yet.
  useEffect(() => {
    if (hasNextPage) actions.source.fetch(getPageLink(page + 1));
  }, []);

  return (
    <Container>
      <ul>
        {hasPreviousPage && (
          <li>
            <Link link={getPageLink(page - 1)}>← Prev</Link>
          </li>
        )}

        {getFolios().map(paging => {
          // if paging is dots
          if (paging === "...") {
            return (
              <li className="dots" key={paging}>
                ...
              </li>
            );
          }

          // is paging is current page
          if (paging === page) {
            return (
              <li className="active" key={paging}>
                {paging}
              </li>
            );
          }

          return (
            <li key={paging}>
              <Link link={getPageLink(paging)}>{paging}</Link>
            </li>
          );
        })}

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
  margin: 10rem 0 2rem;
  display: flex;
  justify-content: center;

  ul {
    list-style: none;

    li {
      display: inline-block;

      &,
      & > * {
        padding: 0 5px;
        font-size: 1.1em;
      }

      a {
        text-decoration: none;
      }
    }
  }
`;

export default connect(Pagination);
