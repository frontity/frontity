import React from "react";
import { loadable, connect } from "frontity";

const Style50 = loadable(() => import("./wp-5.0/style"));
const StyleRtl50 = loadable(() => import("./wp-5.0/style-rtl"));
const Theme50 = loadable(() => import("./wp-5.0/theme"));
const ThemeRtl50 = loadable(() => import("./wp-5.0/theme-rtl"));

const Gutenberg = ({ state }) => {
  if (state.gutenberg.rtl)
    return (
      <>
        <StyleRtl50 />
        <ThemeRtl50 />
      </>
    );
  return (
    <>
      <Style50 />
      <Theme50 />
    </>
  );
};

export default connect(Gutenberg);
