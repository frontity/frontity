import React, { useEffect } from "react";
import { connect, styled, css } from "frontity";
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

  return (
    <Container>
      <Direction>
        {hasNewerPosts && (
          <StyledLink link={getPageLink(page - 1)}>
            ← <span>Newer</span>
          </StyledLink>
        )}
      </Direction>

      <div
        css={css`
          display: inline-block;
        `}
      >
        <div
          css={css`
            list-style: none;
            margin: 0 2rem;
          `}
        >
          {paginationArray.map((item, index) => {
            // if item is dots, "..."
            if (item === "...") {
              return <PagingItem key={index}>{`...`}</PagingItem>;
            }

            // if item is current page
            if (item === page) {
              return <PagingItem key={index}>{item}</PagingItem>;
            }

            return (
              <PagingItem key={index}>
                <StyledLink link={getPageLink(item)}>{item}</StyledLink>
              </PagingItem>
            );
          })}
        </div>
      </div>

      <Direction>
        {hasOlderPosts && (
          <StyledLink link={getPageLink(page + 1)}>
            <span>Older</span> →
          </StyledLink>
        )}
      </Direction>
    </Container>
  );
};

const getMaxWidth = props => maxWidths[props.size] || maxWidths["medium"];

const maxWidths = {
  thin: "58rem",
  small: "80rem",
  medium: "100rem"
};

const Container = styled.div`
  font-size: 1em;
  font-weight: 600;
  margin: 0 auto;
  line-height: 30px;
  width: calc(100% - 4rem);
  max-width: ${getMaxWidth};

  @media (min-width: 700px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 8rem);
    font-size: 1.3em;
    font-weight: 700;
  }
`;

const PagingItem = styled.li`
  display: inline-block;
  margin: 0;

  &:not(:last-of-type) {
    margin-right: 2rem;
  }
`;

const Direction = styled.div`
  display: inline-block;

  @media (min-width: 700px) {
    span::after {
      content: " Posts";
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default connect(Pagination);
