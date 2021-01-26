import Render, { Packages } from "../types";
import { connect, useConnect } from "frontity";
import { isPost, isPostArchive } from "@frontity/source";

let counter = 0;

const Counter = connect(() => {
  const { state } = useConnect<Packages>();

  // Subscribe to the current data object. This will rerender each time either
  // `state.router.link` or the data object returned by `state.source`get`
  // changes.
  state.source.get(state.router.link);

  // Add 1 to the counter each time this component rerenders.
  counter += 1;

  return (
    <>
      <div data-test-id="counter">Renders: {counter}</div>
      <Theme />
    </>
  );
});

const Theme = connect(() => {
  const { state } = useConnect<Packages>();
  const data = state.source.get(state.router.link);
  return (
    <>
      {data.isFetching && <div data-test-id="content">Fetching...</div>}
      {isPostArchive(data) && <div data-test-id="content">Rendered: Home</div>}
      {isPost(data) && <div data-test-id="content">Rendered: Post 1</div>}
    </>
  );
});

const render: Render = {
  state: {
    source: {
      data: {
        "/": {
          isReady: true,
          isPostArchive: true,
        },
      },
    },
  },
  roots: {
    render: Counter,
  },
};

export default render;
