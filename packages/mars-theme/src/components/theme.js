import React from "react";
import { Global, css, connect, styled, Head } from "frontity";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Page404 from "./page404.js";
import Loading from "./loading";

const globalStyles = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
`;

const Theme = ({ state }) => {
  const data = state.source.get(state.router);

  let Content = <Loading />;

  if (data.isArchive) Content = <List />;
  if (data.isPostType) Content = <Post />;
  if (data.is404) Content = <Page404 />;

  return (
    <>
      <Head>
        <title>{state.frontity.title}</title>
        <html lang="en" />
      </Head>
      <Global styles={globalStyles} />
      <HeadContainer>
        <Header />
      </HeadContainer>
      <Body>{Content}</Body>
    </>
  );
};

export default connect(Theme);

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #1f38c5;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
    180deg,
    rgba(66, 174, 228, 0.1),
    rgba(66, 174, 228, 0)
  );
`;
