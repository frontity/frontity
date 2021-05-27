export default [
  {
    name: "settings-default",
    mode: "default" as const,
    state: {},
    packages: [
      {
        name: "@frontity/theme-default",
        active: true,
        state: {},
      },
      {
        name: "@frontity/wp-source-default",
        active: true,
        state: {},
      },
    ],
  },
  {
    name: "settings-amp",
    mode: "amp" as const,
    state: {},
    packages: [
      {
        name: "@frontity/theme-amp",
        active: true,
        state: {},
      },
      {
        name: "@frontity/wp-source-amp",
        active: true,
        state: {},
      },
    ],
  },
];
