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
