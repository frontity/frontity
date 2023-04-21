import { renderToStaticMarkup, renderToString } from "react-dom/server";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { prefixer } from "stylis";
import hashStyles from "@emotion/hash";

/**
 * The render method for a given React App.
 *
 * @param args - The arguments to be used for render.
 *
 * @returns The serialized App.
 */
const render = ({ collectChunks, App, publicPath }) => {
  const namesBefore = [];
  const namesAfter = [];

  const key = "frontity";
  const cache = createCache({
    key,
    stylisPlugins: [
      prefixer as any,
      (element) => {
        if (element.type === "rule") {
          if (
            element.children.find((child) =>
              /__webpack_public_path__/.test(child.value)
            )
          ) {
            const stylesBefore = element.children
              .map((child) => child.value)
              .join();
            const stylesAfter = element.children
              .map((child) => {
                child.value = child.value.replace(
                  /__webpack_public_path__/g,
                  publicPath
                );
                return child.value;
              })
              .join();
            const nameBefore = hashStyles(stylesBefore);
            const nameAfter = hashStyles(stylesAfter);
            console.log("name:", nameBefore, nameAfter);

            element.value = element.value.replace(nameBefore, nameAfter);
            element.props = element.props.map((prop) =>
              prop.replace(nameBefore, nameAfter)
            );

            namesBefore.push(nameBefore);
            namesAfter.push(nameAfter);
          }
          console.log("element:", element);
        }
      },
    ],
  });

  const {
    extractCriticalToChunks,
    constructStyleTagsFromChunks,
  } = createEmotionServer(cache);

  const jsx = (
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
  );

  let result = "";

  if (!collectChunks) {
    result = renderToStaticMarkup(jsx);
  } else {
    result = renderToString(collectChunks(jsx));
  }

  const chunks = extractCriticalToChunks(result);
  const styles = constructStyleTagsFromChunks(chunks);

  result = result.replace(/__webpack_public_path__/g, publicPath);

  namesBefore.forEach((name, index) => {
    result = result.replace(new RegExp(name), namesAfter[index]);
  });

  console.log("RESULT:\n", result);
  console.log("STYLES:\n", styles);

  return { result, styles };
};

/**
 * Defines the default render method.
 *
 * @param namespace - The namespace object.
 */
export const renderMethod = (namespace) => {
  namespace.render = render;
};
