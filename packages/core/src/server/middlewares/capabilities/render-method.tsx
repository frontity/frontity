import { renderToStaticMarkup, renderToString } from "react-dom/server";

/**
 * The render method for a given React App.
 *
 * @param args - The arguments to be used for render.
 *
 * @returns The serialized App.
 */
const render = ({ collectChunks, App }) => {
  const jsx = <App />;

  if (!collectChunks) {
    return renderToStaticMarkup(jsx);
  }

  return renderToString(collectChunks(jsx));
};

/**
 * Defines the default render method.
 *
 * @param namespace - The namespace object.
 */
export const renderMethod = (namespace) => {
  namespace.render = render;
};
