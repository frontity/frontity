import React from "react";
import { Global, css } from "@emotion/core";
import connect from "@frontity/connect";
import Connect from "@frontity/types/connect";
import MarsTheme from "../../../type";
import styled from "@emotion/styled";
import Header from "./header";
import List from "./list";
import Post from "./post";

const Theme: React.FC<Connect<MarsTheme>> = ({ state }) => {
  console.log("state:", state);
  return (
    <>
      <Global styles={globalStyles} />
      <Head>
        <Header />
      </Head>

      <Body>
        {state.router.path === "/" && <List />}
        {state.router.path === "/something" && <Post />}
      </Body>
    </>
  );
};

export default connect(Theme);

const globalStyles = css`
  body {
    margin: 0;
    background: #f0e7e7;
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
