export default [
  {
    name: "settings-with-short-match",
    mode: "default" as const,
    state: {},
    match: ["https://frontity.org.*"],
    packages: [],
  },
  {
    name: "settings-with-large-match",
    mode: "default" as const,
    state: {},
    match: ["https://frontity.org/page/.*"],
    packages: [],
  },
];
