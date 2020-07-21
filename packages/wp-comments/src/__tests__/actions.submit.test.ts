import * as frontity from "frontity";
import clone from "clone-deep";
import { createStore } from "@frontity/connect";
import { mergeDeepRight } from "ramda";

import wpComments from "..";
import { Packages } from "../../types";
import { mockResponse, fromEntries } from "./mocks/helpers";

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
      email: "frontibotito@frontity.org",
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
    // The post ID.
    const postId = 60;

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
      .submit(postId, {
        comment: "Hello world!",
        author: "Frontibotito",
        email: "frontibotito@frontity.org",
        url: "https://frontity.org",
      })
      .catch(() => {
        // Do nothing if it fails.
      });

    // Check the comment was sent.
    expect(fetch).toHaveBeenCalledTimes(1);

    // Check `fetch` was called with the correct params.
    const [[url, options]] = fetch.mock.calls;

    // Check that the request URL is correct.
    expect(url).toBe("https://test.frontity.org/wp-comments-post.php");

    // Check that the request parameters are correct.
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

    // Check that the request body is correct.
    expect(fromEntries((options.body as URLSearchParams).entries()))
      .toMatchInlineSnapshot(`
      Object {
        "author": "Frontibotito",
        "comment": "Hello world!",
        "comment_parent": "0",
        "comment_post_ID": "60",
        "email": "frontibotito@frontity.org",
        "url": "https://frontity.org",
      }
    `);

    // Check that the populated state is correct.
    expect(store.state.comments.forms[postId].submitted).toMatchInlineSnapshot(`
      Object {
        "author": "Frontibotito",
        "comment": "Hello world!",
        "email": "frontibotito@frontity.org",
        "errorMessage": "",
        "isApproved": false,
        "isError": false,
        "isOnHold": false,
        "isPending": true,
        "parent": 0,
        "timestamp": 1594161555147,
        "url": "https://frontity.org",
      }
    `);
  });

  test("should use the form fields", async () => {
    // The post ID.
    const postId = 60;

    // Mock packages with the API specified in state.source.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        source: {
          api: "https://test.frontity.org/wp-json/",
        },
        comments: {
          forms: {
            [postId]: {
              fields: {
                comment: "Hello world!",
                author: "Frontibotito",
                email: "frontibotito@frontity.org",
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
    store.actions.comments.submit(postId).catch(() => {
      // Do nothing if it fails.
    });

    // Check the comment was sent.
    expect(fetch).toHaveBeenCalledTimes(1);

    // Check `fetch` was called with the correct params.
    const [[url, options]] = fetch.mock.calls;

    // Check that the request URL is correct.
    expect(url).toBe("https://test.frontity.org/wp-comments-post.php");

    // Check that the request parameters are correct.
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

    // Check that the request body is correct.
    expect(fromEntries((options.body as URLSearchParams).entries()))
      .toMatchInlineSnapshot(`
      Object {
        "author": "Frontibotito",
        "comment": "Hello world!",
        "comment_parent": "0",
        "comment_post_ID": "60",
        "email": "frontibotito@frontity.org",
        "url": "https://frontity.org",
      }
    `);

    // Check that the populated state is correct.
    expect(store.state.comments.forms[postId].submitted).toMatchInlineSnapshot(`
      Object {
        "author": "Frontibotito",
        "comment": "Hello world!",
        "email": "frontibotito@frontity.org",
        "errorMessage": "",
        "isApproved": false,
        "isError": false,
        "isOnHold": false,
        "isPending": true,
        "parent": 0,
        "timestamp": 1594161555147,
        "url": "https://frontity.org",
      }
    `);
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
    const submission = store.actions.comments.submit(postId, {
      comment: "Hello world!",
      author: "Frontibotito",
      email: "frontibotito@frontity.org",
      url: "https://frontity.org",
    });

    // Get the form data.
    const { submitted } = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(submitted.isPending).toBe(true);

    await submission;

    // The submission should have failed.
    expect(submitted.isPending).toBe(false);
    expect(submitted.isError).toBe(true);
    expect(submitted.errorMessage).toMatchInlineSnapshot(
      `"The post ID is invalid"`
    );
  });

  test("should populate an error if email is empty", async () => {
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
              <p><strong>ERROR</strong>: please fill the required fields (name, email).</p>
            </div>
            <p><a href='javascript:history.back()'>&laquo; Back</a></p>
          </body>
        </html>
        `,
        { status: 200 }
      )
    );

    // The post ID.
    const postId = 60;

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      author: "Frontibotito",
      comment: "Hello world!",
      email: "",
      url: "https://frontity.org",
    });

    // Get the form data.
    const { submitted } = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(submitted.isPending).toBe(true);

    await submission;

    // The submission should have failed.
    expect(submitted.isPending).toBe(false);
    expect(submitted.isError).toBe(true);
    expect(submitted.errorMessage).toMatchInlineSnapshot(
      `"Author or email are empty, or email has an invalid format"`
    );
  });

  test("should populate an error if author is empty", async () => {
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
              <p><strong>ERROR</strong>: please fill the required fields (name, email).</p>
            </div>
            <p><a href='javascript:history.back()'>&laquo; Back</a></p>
          </body>
        </html>
        `,
        { status: 200 }
      )
    );

    // The post ID.
    const postId = 60;

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      author: "",
      comment: "Hello world!",
      email: "NOT_AN_EMAIL",
      url: "https://frontity.org",
    });

    // Get the form data.
    const { submitted } = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(submitted.isPending).toBe(true);

    await submission;

    // The submission should have failed.
    expect(submitted.isPending).toBe(false);
    expect(submitted.isError).toBe(true);
    expect(submitted.errorMessage).toMatchInlineSnapshot(
      `"Author or email are empty, or email has an invalid format"`
    );
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

    // A post ID.
    const postId = 60;

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      comment: "Hello world!",
      author: "Frontibotito",
      email: "NOT_AN_EMAIL",
      url: "https://frontity.org",
    });

    // Get the form data.
    const { submitted } = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(submitted.isPending).toBe(true);

    await submission;

    // The submission should have failed.
    expect(submitted.isPending).toBe(false);
    expect(submitted.isError).toBe(true);
    expect(submitted.errorMessage).toMatchInlineSnapshot(
      `"Author or email are empty, or email has an invalid format"`
    );
  });

  test("should populate an error if duplicated", async () => {
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

    // WordPress returns an 409 Conflict response with a message if the comment
    // was already submitted.
    fetch.mockResolvedValue(
      mockResponse(
        `
        <html>
          <head></head>
          <body id="error-page">
            <div class="wp-die-message">
              <p>Duplicate comment detected; it looks as though you&#8217;ve already said that!</p>
            </div>
            <p><a href='javascript:history.back()'>&laquo; Back</a></p>
          </body>
        </html>
        `,
        { status: 409 }
      )
    );

    // A post ID.
    const postId = 60;

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      comment: "Same comment again.",
      author: "Frontibotito",
      email: "frontibotito@frontity.org",
      url: "https://frontity.org",
    });

    // Get the form data.
    const { submitted } = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(submitted.isPending).toBe(true);

    await submission;

    // The submission should have failed.
    expect(submitted.isPending).toBe(false);
    expect(submitted.isError).toBe(true);
    expect(submitted.errorMessage).toMatchInlineSnapshot(
      `"The comment was already submitted"`
    );
  });

  test("should indicate if the comment was not accepted yet", async () => {
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

    // WordPress returns 203 when a comment was successfully submitted.
    fetch.mockResolvedValue(
      mockResponse(undefined, {
        status: 203,
        headers: {
          Location:
            "https://test.frontity.org/2016/the-beauties-of-gullfoss/http://frontity.site/post/?unapproved=123&moderation-hash=847492149d817bf7e08d81457bf9952f#comment-123",
        },
      })
    );

    // A post ID.
    const postId = 60;

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      comment: "Hello world!",
      author: "Frontibotito",
      email: "frontibotito@frontity.org",
      url: "https://frontity.org",
    });

    // Get the form data.
    const { submitted } = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(submitted.isPending).toBe(true);

    await submission;

    // The submission should have succeed (but not approved yet).
    expect(submitted.isPending).toBe(false);
    expect(submitted.isError).toBe(false);
    expect(submitted.isOnHold).toBe(true);
    expect(submitted.isApproved).toBe(false);
    expect(submitted.id).toBe(123);
  });

  test("should indicate if the comment was accepted", async () => {
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

    // WordPress returns 203 when a comment was successfully submitted.
    fetch.mockResolvedValue(
      mockResponse(undefined, {
        status: 203,
        headers: {
          Location:
            "https://test.frontity.org/2016/the-beauties-of-gullfoss/http://frontity.site/post/#comment-123",
        },
      })
    );

    // A post ID.
    const postId = 60;

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      comment: "Hello world!",
      author: "Frontibotito",
      email: "frontibotito@frontity.org",
      url: "https://frontity.org",
    });

    // Get the form data.
    const { submitted } = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(submitted.isPending).toBe(true);

    await submission;

    // The submission should have succeeded and is approved.
    expect(submitted.isPending).toBe(false);
    expect(submitted.isError).toBe(false);
    expect(submitted.isOnHold).toBe(false);
    expect(submitted.isApproved).toBe(true);
    expect(submitted.id).toBe(123);
  });

  test("should populate an error in any other case", async () => {
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

    // Any random error.
    fetch.mockResolvedValue(mockResponse(undefined, { status: 500 }));

    // A post ID.
    const postId = 60;

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      comment: "Hello world!",
      author: "Frontibotito",
      email: "frontibotito@frontity.org",
      url: "https://frontity.org",
    });

    // Get the form data.
    const { submitted } = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(submitted.isPending).toBe(true);

    await submission;

    // The submission should have succeed (but not approved yet).
    expect(submitted.isPending).toBe(false);
    expect(submitted.isError).toBe(true);
    expect(submitted.errorMessage).toMatchInlineSnapshot(
      `"Unexpected error: 500"`
    );
  });

  test("should overwrite submitted props each time is called", async () => {
    // A post ID.
    const postId = 60;

    // Mock packages with the API specified and some form.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        source: {
          api: "https://test.frontity.org/wp-json/",
        },
        comments: {
          forms: {
            [postId]: {
              fields: {
                comment: "Hello world!",
                author: "Frontibotito",
                email: "frontibotito@frontity.org",
                parent: 0,
                url: "https://frontity.org",
              },
              submitted: {
                author: "Frontibotito",
                comment: "Hello world!",
                email: "frontibotito@frontity.org",
                errorMessage: "",
                isApproved: false,
                isError: false,
                isPending: false,
                isOnHold: false,
                parent: 0,
                timestamp: 1594161555147,
                url: "https://frontity.org",
              },
            },
          },
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // Send a comment and do not wait for the response.
    store.actions.comments
      .submit(postId, {
        comment: "Other comment!",
        author: "Other author",
        email: "other@email.test",
        url: "https://other.url.test",
        parent: 123,
      })
      .catch(() => {
        // Do nothing.
      });

    const { submitted } = store.state.comments.forms[postId];

    // The submission should have been overwritten.
    expect(submitted).toMatchInlineSnapshot(`
      Object {
        "author": "Other author",
        "comment": "Other comment!",
        "email": "other@email.test",
        "errorMessage": "",
        "isApproved": false,
        "isError": false,
        "isOnHold": false,
        "isPending": true,
        "parent": 123,
        "timestamp": 1594161555147,
        "url": "https://other.url.test",
      }
    `);
  });

  test("should show a warning message if a submission is pending", async () => {
    // A post ID.
    const postId = 60;

    // Mock packages with the API specified and some form.
    const packages: any = mergeDeepRight(clone(wpComments), {
      state: {
        source: {
          api: "https://test.frontity.org/wp-json/",
        },
        comments: {
          forms: {
            [postId]: {
              fields: {
                comment: "Hello world!",
                author: "Frontibotito",
                email: "frontibotito@frontity.org",
                parent: 0,
                url: "https://frontity.org",
              },
              submitted: {
                author: "Frontibotito",
                comment: "Hello world!",
                email: "frontibotito@frontity.org",
                errorMessage: "",
                isApproved: false,
                isError: false,
                isPending: true,
                isOnHold: false,
                parent: 0,
                timestamp: 1594161555147,
                url: "https://frontity.org",
              },
            },
          },
        },
      },
    });

    // Create store from mocked packages.
    const store = createStore<Packages>(packages as Packages);

    // Send a comment and do not wait for the response.
    store.actions.comments
      .submit(postId, {
        comment: "Other comment!",
        author: "Other author",
        email: "other@email.test",
        url: "https://other.url.test",
        parent: 123,
      })
      .catch(() => {
        // Do nothing.
      });

    const { submitted } = store.state.comments.forms[postId];

    // The submission should not be sent.
    expect(fetch).not.toHaveBeenCalled();
    expect(submitted).toMatchInlineSnapshot(`
      Object {
        "author": "Frontibotito",
        "comment": "Hello world!",
        "email": "frontibotito@frontity.org",
        "errorMessage": "",
        "isApproved": false,
        "isError": false,
        "isOnHold": false,
        "isPending": true,
        "parent": 0,
        "timestamp": 1594161555147,
        "url": "https://frontity.org",
      }
    `);

    // Check that a warning message was shown instead.
    expect(warn.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "You cannot submit a comment to the same post if another is already pending.",
        ],
      ]
    `);
  });
});
