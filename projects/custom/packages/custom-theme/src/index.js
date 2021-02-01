import { styled, css } from "frontity";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";

const Button = styled.button`
  border: 0;
  padding: 1em;
  margin: 0;
  border-radius: 0.25em;
  background-color: dodgerblue;
  color: white;
`;

function Root() {
  return (
    <div>
      <h1>Customizable</h1>
      <p
        css={css({
          border: `1px solid tomato`,
          padding: `1em`,
          margin: 0,
        })}
      >
        project
      </p>
      <Button>Clicky button</Button>
    </div>
  );
}

export default {
  name: "custom-theme",
  roots: {
    theme: Root,
  },
  actions: {
    theme: {
      beforeSSR({ libraries: { frontity } }) {
        frontity.render = ({ App, defaultRenderer }) => {
          const key = "frontity";
          const cache = createCache({ key });
          const { extractCritical } = createEmotionServer(cache);
          const res = extractCritical(
            defaultRenderer(
              <CacheProvider value={cache}>
                <App />
              </CacheProvider>
            )
          );

          return {
            ...res,
            key,
          };
        };

        frontity.template = ({ defaultTemplate, result, ...rest }) => {
          const { html, ids, css, key } = result;

          rest.head.push(
            `<style data-emotion="${key} ${ids.join(" ")}">${css}</style>`
          );

          return defaultTemplate({ ...rest, html });
        };
      },
      beforeCSR({ libraries: { frontity } }) {
        const cache = createCache({ key: "frontity" });

        frontity.App = ({ App }) => (
          <CacheProvider value={cache}>
            <App />
          </CacheProvider>
        );
      },
    },
  },
};
