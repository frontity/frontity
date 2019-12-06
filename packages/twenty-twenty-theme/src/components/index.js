import { connect, Global, Head, styled } from "frontity";
import React from "react";
import Footer from "./footer";
import globalStyles from "./global-styles";
import Header from "./header";
import List from "./list";
import Loading from "./loading";
import Page404 from "./page404.js";
import Post from "./post";
import SearchResults from "./search/search-results";
import SkipLink from "./skip-link";
import Title from "./title";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  const parse = libraries.source.parse(state.router.link);
  // Check if the url is a search type
  const isSearch = Boolean(parse.query["s"]);

  return (
    <>
      {/* Add some global styles for the whole site, like body or a's. 
        Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles(state.theme.colors)} />

      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Accessibility: Provides ability to skip to main content */}
      <SkipLink as="a" href="#main">
        Skip to main content
      </SkipLink>

      <div style={{ minHeight: "calc(100vh - 190px)" }}>
        {/* Add the header of the site. */}
        <Header />

        {/* Add the main section. It renders a different component depending
        on the type of URL we are in. */}
        <Main id="main">
          {(data.isFetching && <Loading />) ||
            (isSearch && <SearchResults />) ||
            (data.isArchive && <List />) ||
            (data.isPostType && <Post />) ||
            (data.is404 && <Page404 />)}
        </Main>
      </div>

      <Footer />
    </>
  );
};

export default connect(Theme);

const Main = styled.main`
  display: block;
`;
