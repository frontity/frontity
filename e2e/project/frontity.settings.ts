import { Settings } from "frontity/types";

import TinyRouter from "@frontity/tiny-router/types";
import WpSource from "@frontity/wp-source/types";
import GoogleTagManagerAnalytics from "@frontity/google-tag-manager-analytics/types";
import ComscoreAnalytics from "@frontity/comscore-analytics/types";
import GoogleAnalytics from "@frontity/google-analytics/types";
import GoogleAdManager from "@frontity/google-ad-manager/types";
import SmartAdserver from "@frontity/smart-adserver/types";
import Yoast from "@frontity/yoast/types";
import HeadTags from "@frontity/head-tags/types";
import MarsTheme from "@frontity/mars-theme/types";

const settings: Settings<
  | TinyRouter
  | WpSource
  | GoogleTagManagerAnalytics
  | ComscoreAnalytics
  | GoogleAnalytics
  | GoogleAdManager
  | SmartAdserver
  | Yoast
  | HeadTags
  | MarsTheme
> = [
  {
    name: "head",
    packages: ["e2e-head"],
  },
  {
    name: "image",
    packages: ["e2e-image"],
  },
  {
    name: "amp-image",
    mode: "amp",
    packages: ["@frontity/amp", "e2e-image"],
  },
  {
    name: "fonts",
    packages: [
      {
        name: "@frontity/tiny-router",
        state: { router: { autoFetch: false } },
      },
      "e2e-fonts",
    ],
  },
  {
    name: "emotion",
    packages: [
      {
        name: "@frontity/tiny-router",
        state: { router: { autoFetch: false } },
      },
      "e2e-emotion",
    ],
  },
  {
    name: "loadable",
    packages: ["e2e-loadable"],
  },
  {
    name: "iframe",
    packages: ["e2e-iframe"],
  },
  {
    name: "wp-source-errors",
    packages: [
      "e2e-wp-source-errors",
      "@frontity/wp-source",
      "@frontity/tiny-router",
    ],
  },
  {
    name: "script",
    packages: ["e2e-script"],
  },
  {
    name: "switch",
    packages: ["e2e-switch"],
  },
  {
    name: "html2react",
    packages: ["e2e-html2react", "@frontity/html2react"],
  },
  {
    name: "tiny-router",
    packages: [
      "e2e-tiny-router",
      {
        name: "@frontity/tiny-router",
        state: { router: { autoFetch: false } },
      },
      {
        name: "@frontity/wp-source",
        state: { source: { url: "https://test.frontity.org/" } },
      },
    ],
  },
  {
    name: "google-tag-manager",
    packages: [
      "e2e-analytics",
      "@frontity/tiny-router",
      {
        name: "@frontity/google-tag-manager-analytics",
        state: {
          googleTagManagerAnalytics: {
            containerId: "GTM-XXXXXX-X",
          },
        },
      },
    ],
  },
  {
    name: "comscore-analytics",
    packages: [
      "@frontity/tiny-router",
      {
        name: "@frontity/comscore-analytics",
        state: {
          comscoreAnalytics: {
            trackingIds: ["111111", "222222"],
          },
        },
      },
      "e2e-analytics",
    ],
  },
  {
    name: "use-in-view",
    packages: ["e2e-use-in-view"],
  },
  {
    name: "slot-and-fill",
    packages: ["e2e-slot-and-fill"],
  },
  {
    name: "use-infinite-scroll",
    packages: [
      "e2e-use-infinite-scroll",
      {
        name: "@frontity/tiny-router",
        state: { router: { autoFetch: false } },
      },
      {
        name: "@frontity/wp-source",
        state: { source: { api: "https://domain.com/wp-json" } },
      },
    ],
  },
  {
    name: "analytics",
    packages: ["e2e-analytics", "@frontity/tiny-router", "@frontity/analytics"],
  },
  {
    name: "google-analytics",
    packages: [
      "@frontity/tiny-router",
      {
        name: "@frontity/google-analytics",
        state: {
          googleAnalytics: {
            trackingIds: ["UA-XXXXXX-X", "UA-YYYYYY-Y"],
          },
        },
      },
      "e2e-analytics",
    ],
  },
  {
    name: "wp-comments",
    packages: [
      "e2e-wp-comments",
      "@frontity/tiny-router",
      "@frontity/wp-comments",
      {
        name: "@frontity/wp-source",
        state: { source: { url: "http://localhost:8080/" } },
      },
    ],
  },
  {
    name: "google-ad-manager",
    packages: [
      "e2e-ads",
      "@frontity/tiny-router",
      {
        name: "@frontity/google-ad-manager",
        state: {
          fills: {
            googleAdManager: {
              headerAd: {
                slot: "header",
                library: "googleAdManager.GooglePublisherTag",
                priority: 5,
                props: {
                  id: "header-ad",
                  unit: "/4595/nfl.test.open",
                  size: [300, 250],
                },
              },
              contentAd: {
                slot: "content",
                library: "googleAdManager.GooglePublisherTag",
                priority: 5,
                props: {
                  id: "content-ad",
                  unit: "/4595/nfl.test.open",
                  size: [300, 250],
                },
              },
              footerAd: {
                slot: "footer",
                library: "googleAdManager.GooglePublisherTag",
                priority: 5,
                props: {
                  id: "footer-ad",
                  unit: "/4595/nfl.test.open",
                  size: [
                    [300, 250],
                    [300, 600],
                  ],
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    name: "wp-basic-tests",
    packages: [
      "e2e-wp-basic-tests",
      "@frontity/tiny-router",
      {
        name: "@frontity/wp-source",
        state: {
          source: {
            url: "http://localhost:8080/",
          },
        },
      },
    ],
  },
  {
    name: "smart-adserver",
    packages: [
      "e2e-smart-adserver",
      "@frontity/tiny-router",
      {
        name: "@frontity/smart-adserver",
        state: {
          smartAdserver: {
            networkId: "256",
            subdomain: "www3",
          },
          fills: {
            smartAdserver: {
              image728x90: {
                slot: "header",
                library: "smartAdserver.SmartAd",
                priority: 5,
                props: {
                  callType: "std",
                  siteId: 383739,
                  pageId: 1326721,
                  formatId: 6467,
                  tagId: "hello",
                },
              },
              html300x100: {
                slot: "bottom",
                library: "smartAdserver.SmartAd",
                priority: 5,
                props: {
                  callType: "std",
                  siteId: 383739,
                  pageId: 1326721,
                  formatId: 8025,
                  tagId: "std-min-height",
                  minHeight: 100,
                },
              },
              // These two are assigned to a slot that doesn't exist, so they
              // won't be rendered.
              image300x250: {
                slot: "nonexistent",
                library: "smartAdserver.SmartAd",
                priority: 5,
                props: {
                  callType: "std",
                  siteId: 383739,
                  pageId: 1326721,
                  formatId: 19809,
                  tagId: "std-image",
                },
              },
              html300x600: {
                slot: "nonexistent",
                library: "smartAdserver.SmartAd",
                priority: 5,
                props: {
                  callType: "std",
                  siteId: 383739,
                  pageId: 1326721,
                  formatId: 58374,
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    name: "yoast-package",
    state: {
      frontity: {
        url: "http://my.frontity.site",
      },
    },
    packages: [
      "@frontity/tiny-router",
      "@frontity/html2react",
      {
        name: "@frontity/wp-source",
        state: {
          source: {
            url: "http://localhost:8080/",
            postTypes: [
              {
                type: "movie",
                endpoint: "movies",
                archive: "/movies",
              },
            ],
            taxonomies: [
              {
                taxonomy: "actor",
                endpoint: "actors",
                postTypeEndpoint: "movies",
              },
            ],
          },
        },
      },
      {
        name: "@frontity/yoast",
        state: {
          yoast: {
            renderTags: "server",
          },
        },
      },
    ],
  },
  {
    name: "head-tags",
    state: {
      frontity: {
        url: "http://my.frontity.site",
      },
    },
    packages: [
      "@frontity/tiny-router",
      "@frontity/html2react",
      {
        name: "@frontity/wp-source",
        state: {
          source: {
            url: "http://localhost:8080/",
            postTypes: [
              {
                type: "movie",
                endpoint: "movies",
                archive: "/movies",
              },
            ],
            taxonomies: [
              {
                taxonomy: "actor",
                endpoint: "actors",
                postTypeEndpoint: "movies",
              },
            ],
            params: {
              ["head_tags_skip_cache"]: "true",
            },
          },
        },
      },
      {
        name: "@frontity/head-tags",
        state: {
          headTags: {
            transformLinks: {
              base: "http://localhost:8080",
            },
          },
        },
      },
    ],
  },
  {
    name: "redirections",
    state: {
      frontity: {
        url: "http://localhost:3001",
      },
    },
    packages: [
      "e2e-redirections",
      "@frontity/tiny-router",
      {
        name: "@frontity/wp-source",
        state: {
          source: {
            url: "http://localhost:8080",
            redirections: "404",
          },
        },
      },
    ],
  },
  {
    name: "embedded-mode",
    match: [process.env.FRONTITY_SERVER],
    state: {
      frontity: {
        url: "http://localhost:8080",
      },
    },
    packages: [
      "e2e-preview",
      {
        name: "@frontity/wp-source",
        state: {
          source: {
            postTypes: [
              {
                type: "movie",
                endpoint: "movies",
              },
            ],
          },
        },
      },
    ],
  },
  {
    name: "render",
    state: {
      frontity: {
        url: "https://domain.com",
      },
    },
    packages: ["e2e-render", "@frontity/tiny-router", "@frontity/wp-source"],
  },
  {
    name: "custom-render",
    packages: ["e2e-custom-render"],
  },
  {
    name: "custom-configuration",
    packages: ["e2e-custom-configuration", "e2e-custom-configuration-theme"],
  },
  {
    name: "amp",
    packages: ["@frontity/amp", "e2e-static-theme"],
  },
  {
    name: "amp-wordpress",
    packages: [
      "@frontity/amp",
      "e2e-amp",
      "@frontity/html2react",
      "@frontity/tiny-router",
      {
        name: "@frontity/wp-source",
        state: { source: { url: "http://localhost:8080/" } },
      },
    ],
  },
  {
    name: "amp-comscore-analytics",
    mode: "amp",
    packages: [
      "@frontity/amp",
      {
        name: "@frontity/comscore-analytics",
        state: {
          comscoreAnalytics: {
            trackingIds: ["111111", "222222"],
          },
        },
      },
    ],
  },
  {
    name: "amp-google-tag-manager-analytics",
    mode: "amp",
    packages: [
      "@frontity/amp",
      {
        name: "@frontity/google-tag-manager-analytics",
        state: {
          googleTagManagerAnalytics: {
            containerIds: ["GTM-XXXXXX-X", "GTM-YYYYYY-Y"],
            ampConfig: {
              vars: {
                someProp: "someValue",
              },
            },
          },
        },
      },
    ],
  },
  {
    name: "amp-mars-theme",
    mode: "amp",
    state: {
      frontity: {
        url: "https://localhost:3001/",
      },
    },
    packages: [
      "@frontity/amp",
      "@frontity/tiny-router",
      "@frontity/html2react",
      {
        name: "@frontity/mars-theme",
        state: {
          theme: {
            menu: [
              ["The White Heron", "/the-white-heron"],
              ["The Lost City", "/hello-world"],
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
        state: { source: { url: "http://localhost:8080/" } },
      },
    ],
  },
  {
    name: "amp-google-analytics",
    mode: "amp",
    packages: [
      "@frontity/amp",
      {
        name: "@frontity/google-analytics",
        state: {
          googleAnalytics: {
            trackingIds: ["UA-XXXXXXXX-X", "UA-YYYYYYYY-Y"],
            ampConfig: {
              vars: {
                someProp: "someValue",
              },
              triggers: {
                button: {
                  selector: "#the-button",
                  on: "click",
                  vars: {
                    event_name: "login",
                    method: "Google",
                  },
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    name: "amp-google-ad-manager",
    mode: "amp",
    packages: [
      "@frontity/amp",
      "e2e-ads",
      "@frontity/tiny-router",
      {
        name: "@frontity/google-ad-manager",
        state: {
          fills: {
            googleAdManager: {
              headerAd: {
                slot: "header",
                library: "googleAdManager.AmpAd",
                priority: 5,
                props: {
                  id: "header",
                  slot: "/4595/nfl.test.open",
                  width: 300,
                  height: 250,
                },
              },
              footerAd: {
                slot: "footer",
                library: "googleAdManager.AmpAd",
                priority: 5,
                props: {
                  slot: "/4595/nfl.test.open",
                  width: 300,
                  height: 600,
                  overrideWidth: 300,
                  overrideHeight: 250,
                  multiSize: "300x600, 300x250",
                  multiSizeValidation: false,
                },
              },
            },
          },
        },
      },
    ],
  },
];

export default settings;
