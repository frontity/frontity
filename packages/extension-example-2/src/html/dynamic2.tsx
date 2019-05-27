import React from "react";
import { css } from "frontity";
import frontity from "./frontity.png";

const Dynamic = () => (
  <div
    css={css`
      color: green;
    `}
  >
    <img src={frontity} width="150px" />
    <div>I am dynamic from extension!!</div>
  </div>
);

export default Dynamic;
