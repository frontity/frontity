import { connect, Global, Head, styled } from "frontity";
import React from "react";
import Footer from "./footer";
import globalStyles from "./styles/global-styles";
import Header from "./header";
import Archive from "./archive";
import Loading from "./loading";
import Page404 from "./page-404";
import Post from "./post";
import SearchResults from "./search/search-results";
import SkipLink from "./styles/skip-link";
import MetaTitle from "./page-meta-title";
import { useTransition, animated } from "react-spring";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */

const Theme = ({ state, libraries }) => {
  // Get information about the current URL.
  const transitions = useTransition(state.router.link, link => link, {
    from: { opacity: 0.2 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const parse = libraries.source.parse(state.router.link);
  // Check if the url is a search type
  const isSearch = Boolean(parse.query["s"]);

  return (
    <>
      {/* Add some global styles for the whole site, like body or a's. 
        Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles(state.theme.colors, state.theme.fontSets)} />

      {/* Add some metatags to the <head> of the HTML. */}
      <MetaTitle />
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
        {transitions.map(({ item, props, key }) => {
          const data = state.source.get(item);
          return (
            <animated.div key={key} style={props}>
              <Main id="main">
                {(data.isFetching && <Loading />) ||
                  (isSearch && <SearchResults />) ||
                  (data.isArchive && <Archive data={data} />) ||
                  (data.isPostType && <Post data={data} />) ||
                  (data.is404 && <Page404 />)}
              </Main>
            </animated.div>
          );
        })}
      </div>

      <Footer />
    </>
  );
};

export default connect(Theme);

const Main = styled.main`
  display: block;
`;
