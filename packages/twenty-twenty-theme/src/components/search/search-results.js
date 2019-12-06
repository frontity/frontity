import React from "react";
import { connect, styled } from "frontity";
import List from "../list";
import { Header } from "../list/posts";
import { SectionContainer } from "../list/article";
import SearchForm from "./search-form";

const SearchResults = ({ state, libraries }) => {
  const currentPath = state.router.link;
  const { total } = state.source.data[currentPath];
  const isEmpty = total === 0;

  const parse = libraries.source.parse(state.router.link);
  const searchQuery = parse.query["s"];

  return (
    <>
      <Header label="Search">
        <span>{`“${searchQuery}”`}</span>
        <IntroText size="thin">
          {isEmpty ? (
            <Text>
              We could not find any results for your search. You can give it
              another try through the search form below.
            </Text>
          ) : (
            <Text>
              We found {total} {total === 1 ? "result" : "results"} for your
              search.
            </Text>
          )}
        </IntroText>
      </Header>
      {isEmpty ? (
        <SearchContainer size="thin">
          <SearchForm />
        </SearchContainer>
      ) : (
        <List showExcerpt={true} showMedia={false} />
      )}
    </>
  );
};

export default connect(SearchResults);

const IntroText = styled(SectionContainer)`
  width: 100%;
  margin-top: 2rem;
  font-weight: initial;

  @media (min-width: 700px) {
    font-size: 2rem;
    margin-top: 2.5rem;
  }
`;

const Text = styled.p`
  margin: 0 0 1em 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SearchContainer = styled(SectionContainer)`
  padding-top: 5rem;
  @media (min-width: 700px) {
    padding-top: 6rem;
  }
`;
