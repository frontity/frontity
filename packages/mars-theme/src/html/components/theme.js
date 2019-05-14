import React from "react";
import { Global, css, connect, styled } from "frontity";
import Header from "./header";
import List from "./list";
import Post from "./post";

const globalStyles = css`
  body {
    margin: 0;
    background: #f0e7e7;
  }

  a,
  a:visited {
    color: inherit;
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
      {state.source.data(state.router.path).isPost && <Post />}
    </Body>
  </>
);

export default connect(Theme);

const Head = styled.div`
  display: flex;
  justify-content: center;
  background-color: #c1440e;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
`;
