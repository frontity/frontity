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
    name: "multi-settings-amp",
    mode: "amp" as const,
    packages: [
      "@frontity/theme-amp",
      {
        name: "@frontity/theme-amp",
        active: false,
      },
    ],
  },
];
