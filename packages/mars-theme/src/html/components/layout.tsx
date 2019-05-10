import React from "react";
import { Global, css } from "@emotion/core";
import Header from "./header";
import List from "./list";

const Theme: React.FC = () => (
  <>
    <Global styles={globalStyles} />
    <Header />
    <List />
  </>
);

export default Theme;

const globalStyles = css`
  body {
    margin: 0;
  }
`;