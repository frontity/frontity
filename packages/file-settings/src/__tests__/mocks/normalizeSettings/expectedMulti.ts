export default [
  {
    name: "multi-settings-default",
    mode: "default" as const,
    state: {},
    packages: [
      {
        name: "@frontity/theme-default",
        active: true,
        state: {},
      },
      {
        name: "@frontity/wp-source",
        active: true,
        state: {},
      },
    ],
  },
  {
    name: "unique-settings-amp",
    mode: "amp" as const,
    state: {},
    packages: [
      {
        name: "@frontity/theme-amp",
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
