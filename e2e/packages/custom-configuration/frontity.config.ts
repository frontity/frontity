import { WebpackCustomizer, BabelCustomizer } from "frontity/types";

/**
 * The custom Webpack configuration.
 *
 * @param options - The options, defined in {@link WebpackCustomizer}.
 */
export const webpack: WebpackCustomizer = ({ config }) => {
  config.resolve.alias["frontity-components"] = "@frontity/components";
};

/**
 * The custom Babel configuration.
 *
 * @param options - The options, defined in {@link BabelCustomizer}.
 */
export const babel: BabelCustomizer = ({ config }) => {
  config.plugins.push([
    "search-and-replace",
    {
      rules: [
        {
          search: "##One##",
          replace: "@@111@@",
        },
      ],
    },
  ]);
};
