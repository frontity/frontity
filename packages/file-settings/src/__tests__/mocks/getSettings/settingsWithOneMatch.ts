export default [
  {
    name: "settings-without-match",
    mode: "default" as const,
    state: {},
    packages: [],
  },
  {
    name: "settings-with-match",
    mode: "default" as const,
    match: ["https://frontity.org.*/amp/?$"],
    state: {},
    packages: [],
  },
];
