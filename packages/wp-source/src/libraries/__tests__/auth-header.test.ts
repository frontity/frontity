import clone from "clone-deep";
import { createStore, InitializedStore } from "@frontity/connect";
import * as frontity from "frontity";

import wpSource from "../..";
import { mockResponse } from "../handlers/__tests__/mocks/helpers";
import WpSource from "../../../types";
import { Package } from "frontity/types";

const mockedFetch: jest.MockedFunction<typeof fetch> = jest.fn((_) =>
  Promise.resolve(mockResponse({ id: 1 }))
);
(frontity.fetch as typeof fetch) = mockedFetch;

let store: InitializedStore<WpSource & Package>;

beforeEach(() => {
  store = createStore(clone(wpSource()));
  store.state.source.api = "https://test.frontity.org/wp-json";
});

it("should add the Authorization header when fetching a post", async () => {
  store.actions.source.init();

  // Get the entites, passing the auth information.
  await store.libraries.source.api.get({
    endpoint: "post",
    auth: "Hello test",
  });

  expect(mockedFetch.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "https://test.frontity.org/wp-json/wp/v2/post",
        Object {
          "headers": Object {
            "Authorization": "Hello test",
          },
        },
      ],
    ]
  `);
});

it("should pass the value of FRONTITY_SOURCE_AUTH to state.source.auth", async () => {
  const authToken = "hello";

  // Add the token to the env variable
  process.env.FRONTITY_SOURCE_AUTH = authToken;

  // Initialize wp-source package
  store.actions.source.init();

  expect(store.state.source.auth).toBe(authToken);
});

it("should pass the frontity_source_auth option to state.source.auth", async () => {
  const authToken = "hello";

  // eslint-disable-next-line @typescript-eslint/camelcase
  store.state.frontity = { options: { frontity_source_auth: authToken } };

  // Initialize wp-source package
  store.actions.source.init();

  expect(store.state.source.auth).toBe(authToken);
});

it("should use the value from `options` if both the state.source.auth and FRONTITY_SOURCE_AUTH are set", async () => {
  // Add the token to the env variable
  process.env.FRONTITY_SOURCE_AUTH = "This is not used";

  store.state.frontity = {
    options: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      frontity_source_auth: "This is used indeed",
    },
  };

  // Initialize wp-source package
  store.actions.source.init();

  expect(store.state.source.auth).toBe("This is used indeed");
});

it.todo("should check that the token is erased correctly in afterSSR");

it.todo("should check that we handle the frontity_name param correctly");
