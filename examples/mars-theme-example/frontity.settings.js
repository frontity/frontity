const settings = {
  name: "mars-theme-example",
  state: {
    frontity: {
      url: "https://test.frontity.io",
      title: "Test Frontity Blog",
      description: "Useful content for Frontity development",
      navbar: [
        ["Home", "/"],
        ["Nature", "/category/nature/"],
        ["Travel", "/category/travel/"],
        ["Japan", "/tag/japan/"],
        ["About Us", "/about-us/"]
      ]
    }
  },
  packages: [
    "@frontity/mars-theme",
    "@frontity/tiny-router",
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          apiUrl: "https://blog.com/wp-json/"
        }
      }
    }
  ]
};

module.exports = settings;
