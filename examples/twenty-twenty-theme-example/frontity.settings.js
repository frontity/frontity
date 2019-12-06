export default {
  name: "twenty-twenty-theme-example",
  state: {
    frontity: {
      url: "https://twentytwenty.frontity.org",
      title: "Matt Mullenberg",
      description: "Unlucky in Cards"
    }
  },
  packages: [
    "@frontity/tiny-router",
    "@frontity/html2react",
    {
      name: "@frontity/twenty-twenty-theme",
      state: {
        theme: {
          menu: [
            ["Home", "/"],
            ["About", "/about/"],
            ["Contact", "/contact/"],
            ["Let's Work Together", "/work"]
          ],
          featured: {
            showOnList: true,
            showOnPost: true
          }
        }
      }
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          api: "http://frontity.local/wp-json"
        }
      }
    }
  ]
};
