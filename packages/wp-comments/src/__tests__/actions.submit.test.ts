import * as frontity from "frontity";
import clone from "clone-deep";
import { createStore } from "@frontity/connect";
import { mergeDeepRight } from "ramda";

import wpComments from "..";
import { Packages } from "../../types";
import { mockResponse } from "./mocks/helpers";

const fetch = jest.spyOn(frontity, "fetch").mockResolvedValue(undefined);
const warn = jest.spyOn(frontity, "warn");
jest.spyOn(Date, "now").mockReturnValue(1594161555147);

describe("actions.comments.submit", () => {
  beforeEach(() => {
    fetch.mockClear();
    warn.mockClear();
  });

  test("should show a warning message if the source is a WP.com site", () => {
    // Mock that `source.api` points to a WordPress.com site.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        source: {
          isWpCom: true,
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // Send a comment.
    store.actions.comments.submit(60, {
      comment: "Hello world!",
      author: "Frontibotito",
      email: "frontibotito@frontity.com",
      url: "https://frontity.org",
    });

    // Check the comment was not sent.
    expect(fetch).not.toHaveBeenCalled();

    // Check that a warning message was shown instead.
    expect(warn.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "Sending comments to a WordPress.com site is not supported yet.",
        ],
      ]
    `);
  });

  test("should use the fields passed as argument", async () => {
    // Mock packages with the API specified in state.source.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        source: {
          api: "https://test.frontity.org/wp-json/",
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // Send a comment but do not wait for the response.
    store.actions.comments
      .submit(60, {
        comment: "Hello world!",
        author: "Frontibotito",
        email: "frontibotito@frontity.com",
        url: "https://frontity.org",
      })
      .catch(() => {
        // Do nothing if it fails.
      });

    // Check the comment was sent.
    expect(fetch).toHaveBeenCalledTimes(1);

    // Check `fetch` was called with the correct params.
    const [[url, options]] = fetch.mock.calls;

    expect(url).toBe("https://test.frontity.org/wp-comments-post.php");
    expect(options).toMatchInlineSnapshot(`
      Object {
        "body": URLSearchParams {},
        "headers": Object {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        "method": "POST",
        "redirect": "manual",
      }
    `);
    expect(options.body.toString()).toMatchInlineSnapshot(
      `"comment=Hello+world%21&author=Frontibotito&email=frontibotito%40frontity.com&url=https%3A%2F%2Ffrontity.org&comment_parent=0&comment_post_ID=60"`
    );

    expect(store.state.comments.forms).toMatchInlineSnapshot(`
      Object {
        "60": Object {
          "fields": Object {
            "author": "Frontibotito",
            "comment": "Hello world!",
            "email": "frontibotito@frontity.com",
            "parent": 0,
            "url": "https://frontity.org",
          },
          "submitted": Object {
            "author": "Frontibotito",
            "comment": "Hello world!",
            "email": "frontibotito@frontity.com",
            "errorMessage": "",
            "isApproved": false,
            "isError": false,
            "isPending": true,
            "isUnapproved": false,
            "parent": 0,
            "timestamp": 1594161555147,
            "url": "https://frontity.org",
          },
        },
      }
    `);
  });

  test("should use the form fields", async () => {
    // Mock packages with the API specified in state.source.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        source: {
          api: "https://test.frontity.org/wp-json/",
        },
        comments: {
          forms: {
            60: {
              fields: {
                comment: "Hello world!",
                author: "Frontibotito",
                email: "frontibotito@frontity.com",
                parent: 0,
                url: "https://frontity.org",
              },
            },
          },
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // Send a comment but do not wait for the response.
    store.actions.comments.submit(60).catch(() => {
      // Do nothing if it fails.
    });

    // Check the comment was sent.
    expect(fetch).toHaveBeenCalledTimes(1);

    // Check `fetch` was called with the correct params.
    const [[url, options]] = fetch.mock.calls;

    expect(url).toBe("https://test.frontity.org/wp-comments-post.php");
    expect(options).toMatchInlineSnapshot(`
      Object {
        "body": URLSearchParams {},
        "headers": Object {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        "method": "POST",
        "redirect": "manual",
      }
    `);
    expect(options.body.toString()).toMatchInlineSnapshot(
      `"comment=Hello+world%21&author=Frontibotito&email=frontibotito%40frontity.com&url=https%3A%2F%2Ffrontity.org&comment_parent=0&comment_post_ID=60"`
    );

    expect(store.state.comments.forms).toMatchInlineSnapshot(`
      Object {
        "60": Object {
          "fields": Object {
            "author": "Frontibotito",
            "comment": "Hello world!",
            "email": "frontibotito@frontity.com",
            "parent": 0,
            "url": "https://frontity.org",
          },
          "submitted": Object {
            "author": "Frontibotito",
            "comment": "Hello world!",
            "email": "frontibotito@frontity.com",
            "errorMessage": "",
            "isApproved": false,
            "isError": false,
            "isPending": true,
            "isUnapproved": false,
            "parent": 0,
            "timestamp": 1594161555147,
            "url": "https://frontity.org",
          },
        },
      }
    `);
  });

  test("should abort if comment is not specified", async () => {
    // Mock packages with the API specified in state.source.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        source: {
          api: "https://test.frontity.org/wp-json/",
        },
        comments: {
          forms: {
            60: {
              fields: {
                comment: "",
                author: "Frontibotito",
                email: "frontibotito@frontity.com",
                parent: 0,
                url: "https://frontity.org",
              },
            },
          },
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // Send a comment but do not wait for the response.
    const submitPromise = store.actions.comments.submit(60);
    await expect(submitPromise).rejects.toThrowErrorMatchingInlineSnapshot(
      `
"\`comment\` is required
Visit https://community.frontity.org for help! 🙂
"
`
    );

    // Do not create submitted object.
    expect(store.state.comments.forms[60].submitted).not.toBeDefined();
  });

  test("should abort if author is not specified", async () => {
    // Mock packages with the API specified in state.source.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        source: {
          api: "https://test.frontity.org/wp-json/",
        },
        comments: {
          forms: {
            60: {
              fields: {
                comment: "Hello world!",
                author: "",
                email: "frontibotito@frontity.com",
                parent: 0,
                url: "https://frontity.org",
              },
            },
          },
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // Send a comment but do not wait for the response.
    const submitPromise = store.actions.comments.submit(60);
    await expect(submitPromise).rejects.toThrowErrorMatchingInlineSnapshot(`
"\`author\` is required
Visit https://community.frontity.org for help! 🙂
"
`);

    // Do not create submitted object.
    expect(store.state.comments.forms[60].submitted).not.toBeDefined();
  });

  test("should abort if email is not specified", async () => {
    // Mock packages with the API specified in state.source.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        source: {
          api: "https://test.frontity.org/wp-json/",
        },
        comments: {
          forms: {
            60: {
              fields: {
                comment: "Hello world!",
                author: "Frontibotito",
                email: "",
                parent: 0,
                url: "https://frontity.org",
              },
            },
          },
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // Send a comment but do not wait for the response.
    const submitPromise = store.actions.comments.submit(60);
    await expect(submitPromise).rejects.toThrowErrorMatchingInlineSnapshot(`
"\`email\` is required
Visit https://community.frontity.org for help! 🙂
"
`);

    // Do not create submitted object.
    expect(store.state.comments.forms[60].submitted).not.toBeDefined();
  });

  test("should populate an error if ID is wrong", async () => {
    // Mock packages with the API specified and some form.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        source: {
          api: "https://test.frontity.org/wp-json/",
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // WordPress returns an empty OK response if the post ID is wrong.
    fetch.mockResolvedValue(mockResponse(undefined, { status: 200 }));

    // An invalid post ID.
    const postId = +9000;

    // Send a comment and wait for the response.
    const submitPromise = store.actions.comments.submit(postId, {
      comment: "Hello world!",
      author: "Frontibotito",
      email: "frontibotito@frontity.com",
      url: "https://frontity.org",
    });

    // Get the form data.
    const form = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(form.submitted.isPending).toBe(true);

    await submitPromise;

    // The submittion should have failed.
    expect(form.submitted).toMatchInlineSnapshot(`
      Object {
        "author": "Frontibotito",
        "comment": "Hello world!",
        "email": "frontibotito@frontity.com",
        "errorMessage": "The post ID is invalid",
        "isApproved": false,
        "isError": true,
        "isPending": false,
        "isUnapproved": false,
        "parent": 0,
        "timestamp": 1594161555147,
        "url": "https://frontity.org",
      }
    `);
  });

  test("should populate an error if email is wrong", async () => {
    // Mock packages with the API specified and some form.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        source: {
          api: "https://test.frontity.org/wp-json/",
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // WordPress returns an OK response with a message if the email ID is wrong.
    fetch.mockResolvedValue(
      mockResponse(
        `
        <html>
          <head></head>
          <body id="error-page">
            <div class="wp-die-message">
              <p><strong>ERROR</strong>: please enter a valid email address.</p>
            </div>
            <p><a href='javascript:history.back()'>&laquo; Back</a></p>
          </body>
        </html>
        `,
        { status: 200 }
      )
    );

    // An invalid post ID.
    const postId = +9000;

    // Send a comment and wait for the response.
    const submitPromise = store.actions.comments.submit(postId, {
      comment: "Hello world!",
      author: "Frontibotito",
      email: "NOT_AN_EMAIL",
      url: "https://frontity.org",
    });

    // Get the form data.
    const form = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(form.submitted.isPending).toBe(true);

    await submitPromise;

    // The submittion should have failed.
    expect(form.submitted).toMatchInlineSnapshot(`
      Object {
        "author": "Frontibotito",
        "comment": "Hello world!",
        "email": "NOT_AN_EMAIL",
        "errorMessage": "Email has an invalid format",
        "isApproved": false,
        "isError": true,
        "isPending": false,
        "isUnapproved": false,
        "parent": 0,
        "timestamp": 1594161555147,
        "url": "https://frontity.org",
      }
    `);
  });

  test.todo("should populate an error if duplicated");
  test.todo("should indicate if the comment was nos accepted yet");
  test.todo("should indicate if the comment was accepted");
  test.todo("should populate an error in any other case");
});
