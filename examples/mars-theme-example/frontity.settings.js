const settings = {
  name: "mars-theme-example",
  state: {
    frontity: {
      url: "https://test.frontity.io",
      title: "Test Frontity Blog",
      description: "Useful content for Frontity development"
    }
  },
  packages: [
    "@frontity/tiny-router",
    {
      name: "@frontity/mars-theme",
      state: {
        theme: {
          menu: [
            ["Home", "/"],
            ["Nature", "/category/nature/"],
            ["Travel", "/category/travel/"],
            ["Japan", "/tag/japan/"],
            ["About Us", "/about-us/"]
          ]
        }
      }
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          apiUrl: "https://test.frontity.io/wp-json",
          isWPCom: false
        }
      }
    }
  ]
};

module.exports = settings;
