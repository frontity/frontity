/**
 * The custom webpack configuration.
 *
 * @param param0 - The arguments of the function.
 */
export const webpack = ({ config }) => {
  config.resolve.alias["frontity-components"] = "@frontity/components";
};
