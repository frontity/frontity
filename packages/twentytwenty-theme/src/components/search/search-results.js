import React from "react";
import { connect, styled } from "frontity";
import Archive from "../archive";
import ArchiveHeader from "../archive/archive-header";
import SectionContainer from "../styles/section-container";
import SearchForm from "./search-form";

const SearchResults = ({ state, libraries }) => {
  const { primary } = state.theme.colors;
  // Get the current path or link
  const currentPath = state.router.link;

  // Get the total pages that match the current path/url
  const { total } = state.source.data[currentPath];
  const isEmpty = total === 0;

  // Parse to current url to get the search query
  const parse = libraries.source.parse(state.router.link);

  // Parse returns an object whose query string is stored in "s"
  const searchQuery = parse.query["s"];

  // Since we formatted the query string in the search modal, let's reverse the formatting
  const reverseFormat = query => query.replace("+", " ");

  return (
    <>
      <ArchiveHeader label="Search" labelColor={primary}>
        <span>{`“${reverseFormat(searchQuery)}”`}</span>
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
      </ArchiveHeader>

      {isEmpty ? (
        <SearchContainer size="thin">
          <SearchForm />
        </SearchContainer>
      ) : (
        <Archive showExcerpt={true} showMedia={false} />
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
