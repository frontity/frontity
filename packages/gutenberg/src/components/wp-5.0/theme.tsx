import React from "react";
import { Global, css } from "frontity";
import style from "./theme.min.css";

const Theme = () => <Global styles={css(style)} />;

export default Theme;
