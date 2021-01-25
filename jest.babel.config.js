module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
  ],
  plugins: [
    [
      "@emotion/babel-plugin",
      {
        autoLabel: "never",
      },
    ],
  ],
};
