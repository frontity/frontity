const settings = {
  name: "mars-theme-example",
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
            ["Nature", "/category/nature/"],
            ["Travel", "/category/travel/"],
            ["Japan", "/tag/japan/"],
            ["About Us", "/about-us/"],
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
          url: "https://test.frontity.org",
        },
      },
    },
  ],
};

export default settings;
