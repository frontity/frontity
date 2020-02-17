export default {
  name: "mars-theme-example",
  state: {
    frontity: {
      url: "https://mars.frontity.org",
      title: "Test Frontity Blog",
      description: "Useful content for Frontity development"
    }
  },
  packages: [
    "@frontity/tiny-router",
    "@frontity/html2react",
    {
      name: "@frontity/twentytwenty-theme",
      state: {
        theme: {
          menu: [
            [
              "Frontity",
              "https://frontity.org?utm_source=blog&utm_medium=horizontal-menu-link"
            ],
            [
              "Community",
              "https://community.frontity.org/?utm_source=blog&utm_medium=horizontal-menu-link"
            ],
            [
              "Docs",
              "https://docs.frontity.org/?utm_source=blog&utm_medium=horizontal-menu-link"
            ],
            ["GitHub", "https://github.com/frontity/frontity"],
            ["Twitter", "https://twitter.com/frontity"]
          ],
          colors: {
            primary: "#E6324B",
            headerBg: "#ffffff",
            footerBg: "#ffffff",
            bodyBg: "#ffffff"
          },
          // Whether to show the search button in page header
          showSearchInHeader: true,
          // Whether to show all post content or only excerpt (summary) in archive view
          showAllContentOnArchive: false,
          // Settings for the featured media (image or video)
          featuredMedia: {
            // Whether to show it on archive view
            showOnArchive: true,
            // Whether to show it on post
            showOnPost: true
          },
          // Whether to auto-fetch links on a page. Values can be "no" | "all" | "in-view" | "hover"
          autoPreFetch: "hover",
          /**
           * At the moment, we only include the ascii characters of Inter font.
           * Values can be "us-ascii" | "latin" | "all"
           */
          fontSets: "us-ascii"
        }
      }
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          api: "https://test.frontity.io/wp-json"
        }
      }
    }
  ]
};
