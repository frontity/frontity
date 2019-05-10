import React from "react";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import Header from "./header";
import List from "./list";

const Theme: React.FC = () => (
  <>
    <Global styles={globalStyles} />
    <Head>
      <Header />
    </Head>
    <Body>
      <List />
    </Body>
  </>
);

export default Theme;

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
