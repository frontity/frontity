export default [
  {
    name: "multi-settings-default",
    packages: [
      "@frontity/theme-default",
      {
        name: "@frontity/wp-source",
      },
    ],
  },
  {
    name: "unique-settings-amp",
    mode: "amp" as const,
    packages: [
      "@frontity/theme-amp",
      {
        name: "@frontity/wp-source",
        active: false,
      },
    ],
  },
];
