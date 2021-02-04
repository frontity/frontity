import { createContext, useContext } from "react";

const seedContext = createContext({ seed: undefined });
const { Provider: SeedProvider } = seedContext;

/**
 * The theme root component.
 *
 * @returns The JSX of the tree.
 */
const Theme = () => {
  const val = useContext(seedContext);
  return (
    <div>
      <input name="seed" type="text" value={val.seed} readOnly />
      Theme custom rendered on the server
    </div>
  );
};

/**
 * The custom wrapped theme.
 *
 * @param props - The component props.
 *
 * @returns The JSX of the wrapped theme.
 */
const ThemeWrapped = ({ App }) => {
  return (
    <div id="wrapper">
      Wrapper for the `.App`
      <App />
    </div>
  );
};

export default {
  roots: {
    customRender: Theme,
  },
  actions: {
    customRender: {
      beforeSSR({ libraries: { frontity } }) {
        // Wrap the theme with a component
        frontity.App = ThemeWrapped;

        // Define a custom render method
        frontity.render = ({ App, defaultRenderer }) => {
          // This is a simple simualtion of 'server bound values'
          // that are included in the client.
          const seed = Math.random();

          const html = defaultRenderer(
            <SeedProvider value={{ seed }}>
              <App />
            </SeedProvider>
          );

          return {
            html,
            seed,
          };
        };

        // Define a custom template method
        frontity.template = ({ defaultTemplate, result, ...rest }) => {
          const { html, seed } = result;

          rest.head.push('<link rel="custom" value="render" />');
          rest.head.push(`<link rel="seed" value="${seed}" />`);
          rest.scripts.push('<script id="custom-render-script"></script>');

          return defaultTemplate({ ...rest, html });
        };
      },

      beforeCSR({ libraries: { frontity } }) {
        // On the client we need to 'read' the server sent value.
        const seed = document
          .querySelector("link[rel=seed]")
          .getAttribute("value");

        // And wrap with the provider the App.
        frontity.App = function AppWithSeed({ App }) {
          return (
            <SeedProvider value={{ seed }}>
              <ThemeWrapped App={App} />
            </SeedProvider>
          );
        };
      },
    },
  },
};
