import clone from "clone-deep";
import { createStore, InitializedStore } from "@frontity/connect";
import * as frontity from "frontity";

import wpSource from "../..";
import { mockResponse } from "../handlers/__tests__/mocks/helpers";
import WpSource from "../../../types";

const mockedFetch: jest.MockedFunction<typeof fetch> = jest.fn((_) =>
  Promise.resolve(mockResponse({ id: 1 }))
);
(frontity.fetch as typeof fetch) = mockedFetch;

let store: InitializedStore<WpSource>;

beforeEach(() => {
  store = createStore(clone(wpSource()));
  store.state.source.api = "https://test.frontity.org/wp-json";
  store.actions.source.init();
});

it("should add the Authorization header when fetching a post", async () => {
  store.state.source.auth = "Hello test";
  await store.actions.source.fetch("/some-post/1");

  expect(mockedFetch.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&slug=1",
          Object {
            "headers": Object {
              "Authorization": "Hello test",
            },
          },
        ],
        Array [
          "https://test.frontity.org/wp-json/wp/v2/pages?_embed=true&slug=1",
          Object {
            "headers": Object {
              "Authorization": "Hello test",
            },
          },
        ],
        Array [
          "https://test.frontity.org/wp-json/wp/v2/media?_embed=true&slug=1",
          Object {
            "headers": Object {
              "Authorization": "Hello test",
            },
          },
        ],
      ]
    `);
});

it("should add value of frontity_source_auth to state.source.auth", async () => {
  const authToken = "hello";
  await store.actions.source.fetch(
    `/some-post/1?frontity_source_auth=${authToken}`
  );

  expect(store.state.source.auth).toBe(authToken);
});
