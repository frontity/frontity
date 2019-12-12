/* eslint-disable @typescript-eslint/camelcase */
import clone from "clone-deep";
import { createStore, InitializedStore } from "@frontity/connect";
import wpSource from "@frontity/wp-source/src";
import HeadTagsPackage, { State, HeadTags } from "../../types";
import headTagsPackage from "..";
import {
  mockPostEntity,
  mockPostType,
  mockTaxonomy,
  mockAuthor
} from "./mocks/utils";

let store: InitializedStore<HeadTagsPackage>;
beforeEach(() => {
  // Create store.
  const config: HeadTagsPackage = clone(headTagsPackage());

  // Mock wp-source state.
  config.state.source = clone(wpSource()).state.source;
  config.state.source.api = "https://test.frontity.io/wp-json";
  // Mock router state.
  config.state.router = { link: "/" };
  // Mock site url.
  config.state.frontity = { url: "https://mars.frontity.org" };
  // Initialize store.
  store = createStore(config);
});

describe("state.headTags.current (post entity)", () => {
  const setUpState = (state: State, headTags?: HeadTags) => {
    // Populate source state.
    const { post, data } = mockPostEntity(headTags);
    state.source.post = post;
    state.source.data = data;

    // Populate router state.
    state.router.link = "/post-1/";
  };

  test("returns an empty array if `head_tags` is undefined", () => {
    const headTags = undefined;
    // Populate all state.
    setUpState(store.state, headTags);
    // Test current head tags.
    expect(store.state.headTags.current).toMatchSnapshot();
  });

  test("returns elements without attributes (title)", () => {
    const headTags: HeadTags = [{ tag: "title", content: "Post 1 - Frontity" }];
    // Populate all state.
    setUpState(store.state, headTags);
    // Test current head tags.
    expect(store.state.headTags.current).toMatchSnapshot();
  });

  test("returns elements without content (meta tags)", () => {
    const headTags: HeadTags = [
      {
        tag: "meta",
        attributes: {
          name: "robots",
          content:
            "max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        }
      }
    ];
    // Populate all state.
    setUpState(store.state, headTags);
    // Test current head tags.
    expect(store.state.headTags.current).toMatchSnapshot();
  });

  test("transforms links that point to WordPress pages", () => {
    const headTags: HeadTags = [
      {
        tag: "link",
        attributes: {
          rel: "canonical",
          href: "https://test.frontity.io/post-1/"
        }
      },
      {
        tag: "meta",
        attributes: {
          property: "og:url",
          content: "https://test.frontity.io/post-1/"
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "shortlink",
          href: "https://test.frontity.io/?p=1"
        }
      }
    ];
    // Populate all state.
    setUpState(store.state, headTags);
    // Test current head tags.
    expect(store.state.headTags.current).toMatchSnapshot();
  });

  test("doesn't change links that don't point to WordPress pages", () => {
    const headTags: HeadTags = [
      {
        tag: "meta",
        attributes: {
          property: "og:image",
          content: "https://test.frontity.io/wp-content/uploads/2019/12/img.jpg"
        }
      },
      {
        tag: "meta",
        attributes: {
          name: "twitter:image",
          content: "https://test.frontity.io/wp-content/uploads/2019/12/img.jpg"
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "dns-prefetch",
          href: "//s.w.org"
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "alternate",
          type: "application/rss+xml",
          title: "frontity » Feed",
          href: "https://test.frontity.io/feed/"
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "alternate",
          type: "application/rss+xml",
          title: "frontity » Comments Feed",
          href: "https://test.frontity.io/comments/feed/"
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "alternate",
          type: "application/rss+xml",
          title: "frontity » Post 1 Comments Feed",
          href: "https://test.frontity.io/post-1/feed/"
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "https://api.w.org/",
          href: "https://test.frontity.io/wp-json/"
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "EditURI",
          type: "application/rsd+xml",
          title: "RSD",
          href: "https://test.frontity.io/xmlrpc.php?rsd"
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "wlwmanifest",
          type: "application/wlwmanifest+xml",
          href: "https://test.frontity.io/wp-includes/wlwmanifest.xml"
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "alternate",
          type: "application/json+oembed",
          href:
            "https://test.frontity.io/wp-json/oembed/1.0/embed?url=http%3A%2F%2Ftest.frontity.io%2Fpost-1%2F"
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "alternate",
          type: "text/xml+oembed",
          href:
            "https://test.frontity.io/wp-json/oembed/1.0/embed?url=http%3A%2F%2Ftest.frontity.io%2Fpost-1%2F&format=xml"
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "pingback",
          href: "https://test.frontity.io/xmlrpc.php"
        }
      }
    ];
    // Populate all state.
    setUpState(store.state, headTags);
    // Test current head tags.
    expect(store.state.headTags.current).toMatchSnapshot();
  });

  test("transform links inside ld+json data", () => {
    const headTags: HeadTags = [
      {
        tag: "script",
        attributes: {
          type: "application/ld+json",
          class: "yoast-schema-graph yoast-schema-graph--main"
        },
        content: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              // All these links should change...
              "@type": "WebSite",
              "@id": "https://test.frontity.io/#website",
              url: "https://test.frontity.io/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://test.frontity.io/?s={search_term_string}"
              }
            },
            {
              "@type": "ImageObject",
              "@id": "https://test.frontity.io/post-1/#primaryimage",
              // ...except this one.
              url: "https://test.frontity.io/wp-content/uploads/2019/12/img.jpg"
            }
          ]
        })
      }
    ];
    // Populate all state.
    setUpState(store.state, headTags);
    // Test current head tags.
    expect(store.state.headTags.current).toMatchSnapshot();
  });

  test("transforms links appropiately when WP is in a subdirectory", () => {
    const headTags: HeadTags = [
      {
        tag: "link",
        attributes: {
          rel: "canonical",
          href: "https://test.frontity.io/subdir/post-1/" // should change
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "https://api.w.org/",
          href: "https://test.frontity.io/subdir/wp-json/" // should not change
        }
      },
      {
        tag: "script",
        attributes: {
          type: "application/ld+json"
        },
        content: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              // All these links should change
              "@type": "WebSite",
              "@id": "https://test.frontity.io/subdir/#website",
              url: "https://test.frontity.io/subdir/"
            }
          ]
        })
      }
    ];
    // Populate all state.
    setUpState(store.state, headTags);

    // Change API prop
    store.state.source.api = "https://test.frontity.io/subdir/wp-json/";

    // Test current head tags.
    expect(store.state.headTags.current).toMatchSnapshot();
  });

  test("transforms links appropiately when Frontity is in a subdirectory", () => {
    const headTags: HeadTags = [
      {
        tag: "link",
        attributes: {
          rel: "canonical",
          href: "https://test.frontity.io/subdir/post-1/" // should change
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "https://api.w.org/",
          href: "https://test.frontity.io/subdir/wp-json/" // should not change
        }
      },
      {
        tag: "script",
        attributes: {
          type: "application/ld+json"
        },
        content: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              // All these links should change
              "@type": "WebSite",
              "@id": "https://test.frontity.io/subdir/#website",
              url: "https://test.frontity.io/subdir/"
            }
          ]
        })
      }
    ];
    // Populate all state.
    setUpState(store.state, headTags);

    // Change API and Frontity URL prop
    store.state.frontity.url = "https://frontity.org/mars/";
    store.state.source.api = "https://test.frontity.io/subdir/wp-json/";

    // Test current head tags.
    expect(store.state.headTags.current).toMatchSnapshot();
  });
});

describe("state.headTags.current (post type)", () => {
  const setUpState = (state: State, headTags?: HeadTags) => {
    // Populate source state.
    const { type, data } = mockPostType(headTags);
    state.source.type = type;
    state.source.data = data;

    // Populate router state.
    state.router.link = "/";
  };

  test("works with post types", () => {
    const headTags: HeadTags = [
      {
        tag: "link",
        attributes: {
          rel: "canonical",
          href: "https://test.frontity.io/" // should change
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "next",
          href: "https://test.frontity.io/page/2/" // should change
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "https://api.w.org/",
          href: "https://test.frontity.io/wp-json/" // should not change
        }
      },
      {
        tag: "script",
        attributes: {
          type: "application/ld+json"
        },
        content: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              // All these links should change
              "@type": "WebSite",
              "@id": "https://test.frontity.io/#website",
              url: "https://test.frontity.io/"
            }
          ]
        })
      }
    ];
    // Populate all state.
    setUpState(store.state, headTags);
    // Test current head tags.
    expect(store.state.headTags.current).toMatchSnapshot();
  });
});

describe("state.headTags.current (taxonomy)", () => {
  const setUpState = (state: State, headTags?: HeadTags) => {
    // Populate source state.
    const { category, data } = mockTaxonomy(headTags);
    state.source.category = category;
    state.source.data = data;

    // Populate router state.
    state.router.link = "/category/cat-1/";
  };

  test("works with taxonomies", () => {
    const headTags: HeadTags = [
      {
        tag: "link",
        attributes: {
          rel: "canonical",
          href: "https://test.frontity.io/category/cat-1/" // should change
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "next",
          href: "https://test.frontity.io/category/cat-1/page/2/" // should change
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "https://api.w.org/",
          href: "https://test.frontity.io/wp-json/" // should not change
        }
      },
      {
        tag: "script",
        attributes: {
          type: "application/ld+json"
        },
        content: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              // All these links should change
              "@type": "WebSite",
              "@id": "https://test.frontity.io/#website",
              url: "https://test.frontity.io/"
            }
          ]
        })
      }
    ];
    // Populate all state.
    setUpState(store.state, headTags);
    // Test current head tags.
    expect(store.state.headTags.current).toMatchSnapshot();
  });
});

describe("state.headTags.current (author)", () => {
  const setUpState = (state: State, headTags?: HeadTags) => {
    // Populate source state.
    const { author, data } = mockAuthor(headTags);
    state.source.author = author;
    state.source.data = data;

    // Populate router state.
    state.router.link = "/author/author-1/";
  };

  test("works with auhors", () => {
    const headTags: HeadTags = [
      {
        tag: "link",
        attributes: {
          rel: "canonical",
          href: "https://test.frontity.io/author/author-1/" // should change
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "next",
          href: "https://test.frontity.io/author/author-1/page/2/" // should change
        }
      },
      {
        tag: "link",
        attributes: {
          rel: "https://api.w.org/",
          href: "https://test.frontity.io/wp-json/" // should not change
        }
      },
      {
        tag: "script",
        attributes: {
          type: "application/ld+json"
        },
        content: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              // All these links should change
              "@type": "WebSite",
              "@id": "https://test.frontity.io/#website",
              url: "https://test.frontity.io/"
            }
          ]
        })
      }
    ];
    // Populate all state.
    setUpState(store.state, headTags);
    // Test current head tags.
    expect(store.state.headTags.current).toMatchSnapshot();
  });
});
