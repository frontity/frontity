import React from "react";
import { Global, css, connect, styled } from "frontity";
import Header from "./header";
import List from "./list";
import Post from "./post";

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

const Theme = ({ state }) => (
  <>
    <Global styles={globalStyles} />
    <Head>
      <Header />
    </Head>
    <Body>
      {state.source.data(state.router.path).isArchive && <List />}
      {state.source.data(state.router.path).isPostType && <Post />}
    </Body>
  </>
);

export default connect(Theme);

const Head = styled.div`
  display: flex;
  justify-content: center;
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
