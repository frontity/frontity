export default ({ config }) => {
  // Modify the config as you wish
  // Here for example we alias react to preact/compat.
  config.resolve.alias["react"] = "preact/compat";
  config.resolve.alias["react-dom"] = "preact/compat";
};
