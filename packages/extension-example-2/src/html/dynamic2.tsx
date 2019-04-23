import React from "react";
import { css } from "@emotion/core";

const Dynamic = () => (
  <div
    css={css`
      color: green;
    `}
  >
    I am dynamic from extension!!
  </div>
);

export default Dynamic;
