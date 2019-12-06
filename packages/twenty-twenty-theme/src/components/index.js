import React from "react";
import { Global, connect, styled, Head } from "frontity";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Page404 from "./page404.js";
import Loading from "./loading";
import Title from "./title";
import SearchResults from "./search-results";
import globalStyles from "./global-styles";
import Footer from "./footer";

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
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Add the header of the site. */}
      <Header />

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main>
        {(data.isFetching && <Loading />) ||
          (isSearch && <SearchResults />) ||
          (data.isArchive && <List />) ||
          (data.isPostType && <Post />) ||
          (data.is404 && <Page404 />)}
      </Main>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      <Footer />
    </>
  );
};

export default connect(Theme);

const Main = styled.main`
  display: block;
  /* overflow-x: hidden; */
`;
