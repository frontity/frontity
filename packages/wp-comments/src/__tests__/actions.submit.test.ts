import * as frontity from "frontity";
import clone from "clone-deep";
import { createStore } from "@frontity/connect";
import { mergeDeepRight } from "ramda";
import {
  HeadersInit,
  ResponseInit,
  Headers,
  Response as NodeResponse,
} from "node-fetch";

import wpComments from "..";
import { Packages } from "../../types";

const fetch = jest.spyOn(frontity, "fetch").mockResolvedValue(undefined);
const warn = jest.spyOn(frontity, "warn");

// Utility to mock responses from WP REST API.
export const mockResponse = (
  body,
  headersInit?: HeadersInit,
  init?: ResponseInit
): Response => {
  const headers = headersInit && { headers: new Headers(headersInit) };
  return (new NodeResponse(JSON.stringify(body), {
    ...init,
    ...headers,
  }) as unknown) as Response;
};

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
      comment: "This is a comment example. Hi!",
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
        comment: "This is a comment example. Hi!",
        author: "Frontibotito",
        email: "frontibotito@frontity.com",
        url: "https://frontity.org",
      })
      .catch(() => {
        // Do nothing if it fails.
      });

    // Check the comment was sent.
    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls).toMatchInlineSnapshot(`Array []`);
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
                comment: "This is a comment example. Hi!",
                author: "Frontibotito",
                email: "frontibotito@frontity.com",
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
    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls).toMatchInlineSnapshot(`Array []`);
  });

  test("should populate an error if ID is wrong", () => {
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

    // Send a comment but do not wait for the response.
    store.actions.comments
      .submit(60, {
        comment: "This is a comment example. Hi!",
        author: "Frontibotito",
        email: "frontibotito@frontity.com",
        url: "https://frontity.org",
      })
      .catch(() => {
        // Do nothing if it fails.
      });

    // Check the comment was sent.
    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls).toMatchInlineSnapshot(`Array []`);
  });
  test.todo("should populate an error if author or email are wrong");
  test.todo("should populate an error if duplicated");
  test.todo("should indicate if the comment was nos accepted yet");
  test.todo("should indicate if the comment was accepted");
  test.todo("should populate an error in any other case");
  test.todo("should update form if arguments are specified");
});
