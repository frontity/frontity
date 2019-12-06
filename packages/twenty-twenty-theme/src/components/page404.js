import React from "react";
import { styled } from "frontity";
import { SectionContainer } from "./list/article";
import SearchForm from "./search-form";

// The 404 page component
const Page404 = () => (
  <Container size="thin">
    <EntryTitle>Page Not Found</EntryTitle>
    <IntroText>
      The page you were looking for could not be found. It might have been
      removed, renamed, or did not exist in the first place. Search for:
    </IntroText>
    <SearchForm />
  </Container>
);

export default Page404;

export const EntryTitle = styled.h1`
  margin: 0;

  @media (min-width: 700px) {
    font-size: 6.4rem !important;
  }

  @media (min-width: 1200px) {
    font-size: 8.4rem !important;
  }
`;

const IntroText = styled.div`
  margin-top: 2rem;
  line-height: 1.5;

  @media (min-width: 700px) {
    font-size: 2rem;
    margin-top: 2.5rem;
  }
`;

const Container = styled(SectionContainer)`
  text-align: center;
  padding-top: 8rem;
`;
