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
        // Hold a reference to the previous App.
        const App = frontity.App;

        // Wrap the theme with a component
        frontity.App = function CustomApp() {
          return <ThemeWrapped App={App} />;
        };

        // Hold a reference to the previous render.
        const previousRender = frontity.render;

        // Define a custom render method
        frontity.render = ({ App, ...rest }) => {
          // This is a simple simualtion of 'server bound values'
          // that are included in the client.
          const seed = Math.random();

          // Call previousRender
          const html = previousRender({
            ...rest,
            App: function App() {
              return (
                <SeedProvider value={{ seed }}>
                  <App />
                </SeedProvider>
              );
            },
          });

          return {
            html,
            seed,
          };
        };

        // Hold a reference to the previous template.
        const previousTemplate = frontity.template;

        // Define a custom template method
        frontity.template = ({ result, ...rest }) => {
          const { html, seed } = result;

          rest.head.push('<link rel="custom" value="render" />');
          rest.head.push(`<link rel="seed" value="${seed}" />`);
          rest.scripts.push('<script id="custom-render-script"></script>');

          return previousTemplate({ ...rest, html });
        };
      },

      beforeCSR({ libraries: { frontity } }) {
        // On the client we need to 'read' the server sent value.
        const seed = document
          .querySelector("link[rel=seed]")
          .getAttribute("value");

        // Hold a reference to the previous App.
        const App = frontity.App;

        // And wrap with the provider the App.
        frontity.App = function AppWithSeed() {
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
