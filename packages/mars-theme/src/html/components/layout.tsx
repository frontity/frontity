import React from "react";
import { Global, css } from "@emotion/core";
import connect from "@frontity/connect";
import { Connect } from "frontity/types";
import MarsTheme from "../../..";
import styled from "@emotion/styled";
import Header from "./header";
import List from "./list";
import Post from "./post";

const Theme: React.FC<Connect<MarsTheme>> = ({ state }) => (
  <>
    <Global styles={globalStyles} />
    <Head>
      <Header />
    </Head>
    <Body>
      {(state.source.data(state.router.path) || {}).isArchive && <List />}
      {(state.source.data(state.router.path) || {}).isPost && <Post />}
    </Body>
  </>
);

export default connect(Theme);

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

const Head = styled.div`
  display: flex;
  justify-content: center;
  background-color: #c1440e;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
`;
