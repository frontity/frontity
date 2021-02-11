import { createStore, InitializedStore } from "@frontity/connect";
import clone from "clone-deep";
import wpSource from "..";
import WpSource from "../../types";
import * as getMatch from "../libraries/get-match";

// Create mock for handler generators
jest.mock("../libraries/get-match");

const getMatchMock = getMatch as jest.Mocked<typeof getMatch>;

let store: InitializedStore<WpSource>;

beforeEach(() => {
  // Initialize the store
  store = createStore<WpSource>(clone(wpSource()));
  store.state.source.url = "https://test.frontity.org/";

  getMatchMock.getMatch.mockClear();
});

test("Correct handler should have been called after an internal redirection", async () => {
  const redirection = {
    name: "redirection",
    params: {},
    priority: 1,
    pattern: "/test",
    func: jest.fn(() => "/redirected"),
  };

  // We have to mock the return value of getMatch for the FIRST invocation
  // in actions.source.fetch()
  getMatchMock.getMatch.mockReturnValueOnce(redirection);

  await store.actions.source.fetch("/test");

  // The redirection func should have been called just once to get the new route
  expect(redirection.func).toHaveBeenCalledTimes(1);

  // The first call is matching the redirections
  // The second call is matching the handler
  expect(getMatchMock.getMatch).toHaveBeenCalledTimes(2);
  expect(getMatchMock.getMatch.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "link": "/test/",
          "route": "/test/",
        },
        Array [],
      ],
      Array [
        Object {
          "link": "/redirected/",
          "route": "/redirected",
        },
        Array [],
      ],
    ]
  `);
});
