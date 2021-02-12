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
      beforeSSR({ libraries }) {
        // Hold a reference to the previous App.
        const PreviousApp = libraries.frontity.App;

        // Wrap the theme with a component
        libraries.frontity.App = function CustomApp() {
          return <ThemeWrapped App={PreviousApp} />;
        };

        // Hold a reference to the previous render.
        const previousRender = libraries.frontity.render;

        // Define a custom render method
        libraries.frontity.render = ({ App, ...rest }) => {
          // This is a simple simualtion of 'server bound values'
          // that are included in the client.
          const seed = Math.random();

          // Call previousRender
          const html = previousRender({
            ...rest,
            App: function RenderApp() {
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
        const previousTemplate = libraries.frontity.template;
        // console.log("previousTemplate", { frontity });

        // Define a custom template method
        libraries.frontity.template = ({ result, ...rest }) => {
          const { html, seed } = result;

          rest.head.push('<link rel="custom" value="render" />');
          rest.head.push(`<link rel="seed" value="${seed}" />`);
          rest.scripts.push('<script id="custom-render-script"></script>');

          return previousTemplate({ ...rest, html });
        };
      },

      beforeCSR({ libraries }) {
        // On the client we need to 'read' the server sent value.
        const seed = document
          .querySelector("link[rel=seed]")
          .getAttribute("value");
        // Hold a reference to the previous App.
        const PreviousApp = libraries.frontity.App;
        // And wrap with the provider the App.
        libraries.frontity.App = function AppWithSeed() {
          return (
            <SeedProvider value={{ seed }}>
              <ThemeWrapped App={PreviousApp} />
            </SeedProvider>
          );
        };
      },
    },
  },
};
