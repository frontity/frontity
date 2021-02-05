import { renderToStaticMarkup, renderToString } from "react-dom/server";

/**
 * The default serializer. Handles the case where there are no entrypoints.
 *
 * @param args - The arguments to be used for this pass.
 *
 * @returns The function to serialize with.
 */
const serialize = ({ collectChunks, hasEntryPoint }: any) => (jsx: any) => {
  console.log("JSX", jsx);
  if (!hasEntryPoint) {
    return renderToStaticMarkup(jsx);
  }

  return renderToString(collectChunks(jsx));
};

/**
 * The render method for a given React App.
 *
 * @param args - The arguments to be used for render.
 *
 * @returns The serialized App.
 */
const render = ({ App, ...args }) => {
  console.log("render", App);
  return serialize(args)(<App />);
};

/**
 * Defines the default render method.
 *
 * @param store - The store object.
 */
export const renderMethod = (store) => {
  store.libraries.frontity.render = render;
};
