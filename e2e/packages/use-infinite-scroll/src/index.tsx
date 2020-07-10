import React from "react";
import { connect, useConnect } from "frontity";
import Archive from "./archive";
import PostType from "./post-type";
import UseInfiniteScroll from "../types";

const Root: React.FC = connect(
  () => {
    const { state } = useConnect<UseInfiniteScroll>();
    return (
      <>
        {state.router.link === "/archive" && <Archive />}
        {state.router.link === "/post-type" && <PostType />}
      </>
    );
  },
  { injectProps: false }
);

const pkg: UseInfiniteScroll = {
  name: "use-infinite-scroll",
  state: {},
  actions: {},
  roots: {
    useInfiniteScroll: Root,
  },
  libraries: {},
};

export default pkg;
