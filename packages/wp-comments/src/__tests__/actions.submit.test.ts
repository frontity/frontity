import * as frontity from "frontity";
import clone from "clone-deep";
import { createStore } from "@frontity/connect";
import { mergeDeepRight } from "ramda";
import wpSource from "@frontity/wp-source/src";

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
        content: "Hello world!",
        authorName: "Frontibotito",
        authorEmail: "frontibotito@frontity.org",
        authorURL: "https://frontity.org",
      })
      .catch(() => {
        // Do nothing if it fails.
      });

    // Check the comment was sent.
    expect(fetch).toHaveBeenCalledTimes(1);

    // Check `fetch` was called with the correct params.
    const [[url, options]] = fetch.mock.calls;

    // Check that the request URL is correct.
    expect(url).toBe("https://test.frontity.org/wp-json/wp/v2/comments");

    // Check that the request parameters are correct.
    expect(options).toMatchInlineSnapshot(`
      Object {
        "body": URLSearchParams {},
        "headers": Object {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        "method": "POST",
      }
    `);

    // Check that the request body is correct.
    expect(fromEntries((options.body as URLSearchParams).entries()))
      .toMatchInlineSnapshot(`
      Object {
        "author_email": "frontibotito@frontity.org",
        "author_name": "Frontibotito",
        "author_url": "https://frontity.org",
        "content": "Hello world!",
        "post": "60",
      }
    `);

    // Check that the populated state is correct.
    expect(store.state.comments.forms[postId]).toMatchInlineSnapshot(`
      Object {
        "errorCode": "",
        "errorMessage": "",
        "errors": Object {},
        "fields": Object {
          "authorEmail": "frontibotito@frontity.org",
          "authorName": "Frontibotito",
          "authorURL": "https://frontity.org",
          "content": "Hello world!",
        },
        "isError": false,
        "isSubmitted": false,
        "isSubmitting": true,
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
                content: "Hello world!",
                authorName: "Frontibotito",
                authorEmail: "frontibotito@frontity.org",
                parent: 0,
                authorURL: "https://frontity.org",
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
    expect(url).toBe("https://test.frontity.org/wp-json/wp/v2/comments");

    // Check that the request parameters are correct.
    expect(options).toMatchInlineSnapshot(`
      Object {
        "body": URLSearchParams {},
        "headers": Object {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        "method": "POST",
      }
    `);

    // Check that the request body is correct.
    expect(fromEntries((options.body as URLSearchParams).entries()))
      .toMatchInlineSnapshot(`
      Object {
        "author_email": "frontibotito@frontity.org",
        "author_name": "Frontibotito",
        "author_url": "https://frontity.org",
        "content": "Hello world!",
        "parent": "0",
        "post": "60",
      }
    `);

    // Check that the populated state is correct.
    // The form should still be submitting.
    expect(store.state.comments.forms[postId]).toMatchInlineSnapshot(`
      Object {
        "errorCode": "",
        "errorMessage": "",
        "errors": Object {},
        "fields": Object {
          "authorEmail": "frontibotito@frontity.org",
          "authorName": "Frontibotito",
          "authorURL": "https://frontity.org",
          "content": "Hello world!",
          "parent": 0,
        },
        "isError": false,
        "isSubmitted": false,
        "isSubmitting": true,
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

    // WordPress should return a 403 if the post ID is wrong.
    fetch.mockResolvedValue(
      mockResponse(
        {
          code: "rest_comment_invalid_post_id",
          message:
            "Sorry, you are not allowed to create this comment without a post.",
          data: { status: 403 },
        },
        { status: 403 }
      )
    );

    // An invalid post ID.
    const postId = +9000;

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      content: "Hello world!",
      authorName: "Frontibotito",
      authorEmail: "frontibotito@frontity.org",
      authorURL: "https://frontity.org",
    });

    // Get the form data.
    const form = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(form.isSubmitting).toBe(true);

    await submission;

    // The submission should have failed.
    expect(form.isSubmitting).toBe(false);
    expect(form.isError).toBe(true);
    expect(form.errorMessage).toMatchInlineSnapshot(
      `"Sorry, you are not allowed to create this comment without a post."`
    );
  });

  test("should populate an error if authorEmail is empty or incorrect", async () => {
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

    // WordPress returns an 400 response with a message if the authorEmail is wrong.
    fetch.mockResolvedValue(
      mockResponse(
        {
          code: "rest_comment_author_data_required",
          message:
            "Creating a comment requires valid author name and email values.",
          data: { status: 400 },
        },
        { status: 400 }
      )
    );

    // The post ID.
    const postId = 60;

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      authorName: "Frontibotito",
      content: "Hello world!",
      authorEmail: "",
      authorURL: "https://frontity.org",
    });

    // Get the form data.
    const form = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(form.isSubmitting).toBe(true);

    await submission;

    // The submission should have failed.
    expect(form.isSubmitting).toBe(false);
    expect(form.isError).toBe(true);
    expect(form.errorMessage).toMatchInlineSnapshot(
      `"Creating a comment requires valid author name and email values."`
    );
  });

  test("should populate an error if authorName is empty or incorrect", async () => {
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
        {
          code: "rest_comment_author_data_required",
          message:
            "Creating a comment requires valid author name and email values.",
          data: { status: 400 },
        },
        { status: 400 }
      )
    );

    // The post ID.
    const postId = 60;

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      authorName: "Frontibotito",
      content: "Hello world!",
      authorEmail: "",
      authorURL: "https://frontity.org",
    });

    // Get the form data.
    const form = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(form.isSubmitting).toBe(true);

    await submission;

    // The submission should have failed.
    expect(form.isSubmitting).toBe(false);
    expect(form.isError).toBe(true);
    expect(form.errorMessage).toMatchInlineSnapshot(
      `"Creating a comment requires valid author name and email values."`
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
        {
          code: "comment_duplicate",
          message:
            "Duplicate comment detected; it looks as though you&#8217;ve already said that!",
          data: {
            status: 409,
          },
        },
        { status: 409 }
      )
    );

    // A post ID.
    const postId = 60;

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      content: "Same comment again.",
      authorName: "Frontibotito",
      authorEmail: "frontibotito@frontity.org",
      authorURL: "https://frontity.org",
    });

    // Get the form data.
    const form = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(form.isSubmitting).toBe(true);

    await submission;

    // The submission should have failed.
    expect(form.isSubmitting).toBe(false);
    expect(form.isError).toBe(true);
    expect(form.errorMessage).toMatchInlineSnapshot(
      `"Duplicate comment detected; it looks as though you&#8217;ve already said that!"`
    );
  });

  test("should indicate if the comment was not accepted yet", async () => {
    // Mock packages with the API specified and some form.
    const packages: any = mergeDeepRight(clone(wpSource()), clone(wpComments));
    const store = createStore<Packages>(packages);
    store.state.source.api = "https://test.frontity.org/wp-json";
    store.actions.source.init();

    // A post ID.
    const postId = 60;

    // WordPress returns 201 when a comment was successfully submitted.
    fetch.mockResolvedValue(
      mockResponse(
        {
          id: 123,
          post: postId,
          parent: 0,
          author: 0,
          authorName: "Frontitbotito",
          authorURL: "",
          date: "2020-08-26T21:45:06",
          content: { rendered: "<p>Hello world!</p>\n" },
          link: "http://localhost:8080/hello-world/#comment-2",
          status: "hold",
          type: "comment",
        },
        {
          status: 201,
        }
      )
    );

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      content: "Hello world!",
      authorName: "Frontibotito",
      authorEmail: "frontibotito@frontity.org",
      authorURL: "https://frontity.org",
    });

    // Get the form data.
    const form = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(form.isSubmitting).toBe(true);

    await submission;

    // The submission should have succeed (but not approved yet).
    expect(form.isSubmitting).toBe(false);
    expect(form.isSubmitted).toBe(true);
    expect(form.isError).toBe(false);
  });

  test("should indicate if the comment was accepted", async () => {
    // Mock packages with the API specified and some form.
    const packages: any = mergeDeepRight(clone(wpSource()), clone(wpComments));
    const store = createStore<Packages>(packages);
    store.state.source.api = "https://test.frontity.org/wp-json";
    store.actions.source.init();

    type Api = Packages["libraries"]["source"]["api"];
    const api = store.libraries.source.api as jest.Mocked<Api>;
    api.get = jest.fn();

    // Initialize the state.
    // There are no comments, but we nee
    api.get.mockResolvedValueOnce(mockResponse([]));
    await store.actions.source.fetch("@comments/60");

    // A post ID.
    const postId = 60;

    // WordPress returns 201 when a comment was successfully submitted.
    fetch.mockResolvedValue(
      mockResponse(
        {
          id: 123,
          post: postId,
          parent: 0,
          author: 0,
          authorName: "Frontitbotito",
          authorURL: "",
          date: "2020-08-26T21:45:06",
          content: {
            rendered: "<p>Hello world!</p>\n",
          },
          link: "http://localhost:8080/hello-world/#comment-2",
          status: "approved",
          type: "comment",
        },
        {
          status: 201,
        }
      )
    );

    // Send a comment and wait for the response.
    const submission = store.actions.comments.submit(postId, {
      content: "Hello world!",
      authorName: "Frontibotito",
      authorEmail: "frontibotito@frontity.org",
      authorURL: "https://frontity.org",
    });

    // Get the form data.
    const form = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(form.isSubmitting).toBe(true);

    await submission;

    // The submission should have succeeded and is approved.
    expect(form.isSubmitting).toBe(false);
    expect(form.isSubmitted).toBe(true);
    expect(form.isError).toBe(false);

    // The comment is ready has been added to the items
    expect(store.state.source.get(`@comments/${postId}`))
      .toMatchInlineSnapshot(`
      Object {
        "isComments": true,
        "isFetching": false,
        "isReady": true,
        "items": Array [
          Object {
            "id": 123,
            "type": "comment",
          },
        ],
        "link": "@comments/60/",
        "page": 1,
        "postId": 60,
        "query": Object {},
        "route": "@comments/60/",
        "total": 1,
        "totalPages": 1,
        "type": "comments",
      }
    `);

    // The fields should have been reset.
    expect(store.state.comments.forms[postId]).toMatchInlineSnapshot(`
      Object {
        "errorCode": "",
        "errorMessage": "",
        "errors": Object {},
        "fields": Object {
          "content": "",
        },
        "isError": false,
        "isSubmitted": true,
        "isSubmitting": false,
      }
    `);
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
      content: "Hello world!",
      authorName: "Frontibotito",
      authorEmail: "frontibotito@frontity.org",
      authorURL: "https://frontity.org",
    });

    // Get the form data.
    const form = store.state.comments.forms[postId];

    // Check the submission is in progress.
    expect(form.isSubmitting).toBe(true);

    await submission;

    // The submission failed with a 500 error.
    expect(form.isSubmitting).toBe(false);
    expect(form.isError).toBe(true);
    expect(form.errorMessage).toMatchInlineSnapshot(
      `"Unexpected error: Internal Server Error"`
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
              isSubmitted: false,
              isSubmitting: false,
              isError: false,
              errorMessage: "",
              errorCode: "",
              errors: {},
              fields: {
                content: "Hello world!",
                authorName: "Frontibotito",
                authorEmail: "frontibotito@frontity.org",
                parent: 0,
                authorURL: "https://frontity.org",
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
        content: "Other comment!",
        authorName: "Other author",
        authorEmail: "other@email.test",
        authorURL: "https://other.url.test",
        parent: 123,
      })
      .catch(() => {
        // Do nothing.
      });

    const form = store.state.comments.forms[postId];

    // The submission should have been overwritten.
    expect(form).toMatchInlineSnapshot(`
      Object {
        "errorCode": "",
        "errorMessage": "",
        "errors": Object {},
        "fields": Object {
          "authorEmail": "other@email.test",
          "authorName": "Other author",
          "authorURL": "https://other.url.test",
          "content": "Other comment!",
          "parent": 123,
        },
        "isError": false,
        "isSubmitted": false,
        "isSubmitting": true,
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
              isSubmitted: false,
              isSubmitting: true, // <-- This is the key property for this test
              isError: false,
              errorMessage: "",
              errorCode: "",
              errors: {},
              fields: {
                content: "Hello world!",
                authorName: "Frontibotito",
                authorEmail: "frontibotito@frontity.org",
                parent: 0,
                authorURL: "https://frontity.org",
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
        content: "Other comment!",
        authorName: "Other author",
        authorEmail: "other@email.test",
        authorURL: "https://other.url.test",
        parent: 123,
      })
      .catch(() => {
        // Do nothing.
      });

    const form = store.state.comments.forms[postId];

    // The submission should not be sent.
    expect(fetch).not.toHaveBeenCalled();
    expect(form).toMatchInlineSnapshot(`
      Object {
        "errorCode": "",
        "errorMessage": "",
        "errors": Object {},
        "fields": Object {
          "authorEmail": "frontibotito@frontity.org",
          "authorName": "Frontibotito",
          "authorURL": "https://frontity.org",
          "content": "Hello world!",
          "parent": 0,
        },
        "isError": false,
        "isSubmitted": false,
        "isSubmitting": true,
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
