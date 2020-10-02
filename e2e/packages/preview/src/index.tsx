import React from "react";
import { connect, useConnect } from "frontity";
import Preview, { Packages } from "../types";

/**
 * Main component for the Preview mini theme.
 *
 * @param props - Store from Frontity.
 *
 * @returns A React element.
 */
const Theme = () => {
  const { state } = useConnect<Packages>();
  const data = state.source.get(state.frontity.initialLink);
  if (data.isPostType) {
    const post = state.source[data.type][data.id];
    return (
      <>
        <h1
          data-test-id="title"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div
          data-test-id="content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </>
    );
  }
  return null;
};

const preview: Preview = {
  roots: {
    preview: connect(Theme),
  },
  actions: {
    preview: {
      beforeSSR: ({ state, actions }) => async ({ ctx }) => {
        await actions.source.fetch(state.frontity.initialLink);
        const data = state.source.get(state.frontity.initialLink);
        if (data.isError) {
          ctx.status = data.errorStatus;
        }
      },
    },
  },
};

export default preview;
