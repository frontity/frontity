import React, { Fragment } from "react";
import { connect, styled } from "frontity";
import Article, { SectionContainer } from "./article";
import PostSeparator from "./post-separator";
import Pagination from "./pagination";

export const Header = ({ label, children, labelColor }) => {
  return (
    <ArchiveHeader>
      <ArchiveHeaderInner>
        <ArchiveTitle>
          <ColoredText color={labelColor}>{label}: </ColoredText>
          {children}
        </ArchiveTitle>
      </ArchiveHeaderInner>
    </ArchiveHeader>
  );
};

const Posts = ({ state, showExcerpt, showMedia }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);
  const { primary } = state.theme.colors;

  return (
    <>
      {/* If the list is a taxonomy, we render a title. */}
      {data.isTaxonomy && (
        <Header labelColor={primary} label={data.taxonomy}>
          <span>{state.source[data.taxonomy][data.id].name}</span>
        </Header>
      )}

      {/* If the list is for a specific author, we render a title. */}
      {data.isAuthor && (
        <Header labelColor={primary} label="Author">
          <b>{state.source.author[data.id].name}</b>
        </Header>
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
              showExcerpt={showExcerpt}
              showMedia={showMedia}
            />
            {!isLastArticle && <PostSeparator />}
          </Fragment>
        );
      })}
      <Pagination />
    </>
  );
};

export default connect(Posts);

const ArchiveHeader = styled.header`
  color: #000000;
  text-align: center;
  background-color: #fff;
  padding: 4rem 0;

  @media (min-width: 700px) {
    padding: 8rem 0;
  }
`;

const ArchiveHeaderInner = SectionContainer;

const ArchiveTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: -0.026666667em;
  margin: 0;

  @media (min-width: 700px) {
    font-size: 3.2rem;
  }
`;

const ColoredText = styled.span`
  color: ${props => props.color};
  text-transform: capitalize;
`;
