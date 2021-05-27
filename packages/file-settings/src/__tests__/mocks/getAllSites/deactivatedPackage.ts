export default [
  {
    name: "mono-settings",
    mode: "default" as const,
    state: {},
    packages: [
      {
        name: "@frontity/theme",
        active: true,
        state: {},
      },
      {
        name: "@frontity/wp-source",
        active: false,
        state: {},
      },
    ],
  },
];
