import React from "react";
import { connect, styled } from "frontity";
import Article from "./article";
import PostSeparator from "./post-separator";
// import Pagination from "./pagination";

const Posts = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);

  return (
    <>
      {/* If the list is a taxonomy, we render a title. */}
      {data.isTaxonomy && (
        <Header>
          {data.taxonomy}: <b>{state.source[data.taxonomy][data.id].name}</b>
        </Header>
      )}

      {/* If the list is for a specific author, we render a title. */}
      {data.isAuthor && (
        <Header>
          Author: <b>{state.source.author[data.id].name}</b>
        </Header>
      )}

      {/* Iterate over the items of the list. */}
      {data.items.map(({ type, id }, index) => {
        const isLastArticle = index === data.items.length - 1;
        const item = state.source[type][id];
        // Render one Item component for each one.
        return (
          <>
            <Article key={item.id} item={item} />
            {!isLastArticle && <PostSeparator />}
          </>
        );
      })}
      {/* <Pagination /> */}
    </>
  );
};

export default connect(Posts);

// const Container = styled.section`
//   width: 800px;
//   margin: 0;
//   padding: 24px;
//   list-style: none;
// `;

const Header = styled.h3`
  font-weight: 300;
  text-transform: capitalize;
  color: rgba(12, 17, 43, 0.9);
`;
