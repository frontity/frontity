const settings = {
  name: "mars-theme",
  state: {
    frontity: {
      url: "https://mars.frontity.org",
      title: "Test Frontity Blog",
      description: "Useful content for Frontity development",
    },
  },
  packages: [
    "@frontity/tiny-router",
    "@frontity/html2react",
    {
      name: "@frontity/mars-theme",
      state: {
        theme: {
          autoPrefetch: "no",
          menu: [
            ["Home", "/"],
            ["Et Laudantium", "/category/et-laudantium/"],
            ["Laborum", "/category/laborum/"],
          ],
          featured: {
            showOnList: true,
            showOnPost: true,
          },
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "http://embedded.local",
        },
      },
    },
  ],
};

export default settings;
