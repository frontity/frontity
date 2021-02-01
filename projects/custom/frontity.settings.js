export default {
  name: "custom",
  state: {
    frontity: {
      url: "https://twentytwenty.frontity.org",
      title: "Custom Frontity Blog",
      description:
        "This is a highly customized project for Frontity development",
    },
  },
  packages: [
    "@frontity/tiny-router",
    "@frontity/html2react",
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://test.frontity.org",
        },
      },
    },
    "custom-theme",
  ],
};
