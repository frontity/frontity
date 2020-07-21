import React from "react";
import { connect, useConnect } from "frontity";
import Archive from "./components/archive";
import PostType from "./components/post-type";
import * as handlers from "./handlers";
import UseInfiniteScroll from "../types";

const Root: React.FC = connect(
  () => {
    const { state, actions } = useConnect<UseInfiniteScroll>();

    return (
      <>
        {(state.router.link.startsWith("/archive") && <Archive />) ||
          (state.router.link.startsWith("/post-type") && <PostType />) || (
            <button
              data-test="to-archive"
              onClick={() => {
                actions.router.set("/archive");
                actions.source.fetch("/archive");
              }}
            >
              To Archive
            </button>
          )}
      </>
    );
  },
  { injectProps: false }
);

const pkg: UseInfiniteScroll = {
  name: "use-infinite-scroll",
  state: {},
  actions: {
    theme: {
      init({ libraries }) {
        Object.values(handlers).forEach((handler) => {
          libraries.source.handlers.push(handler);
        });
      },
      beforeSSR({ state, actions }) {
        return async () => {
          // await actions.source.fetch(state.router.link);
        };
      },
    },
  },
  roots: {
    useInfiniteScroll: Root,
  },
  libraries: {},
};

export default pkg;
