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
  store = createStore<WpSource>(clone(wpSource(), { clone: false }));
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
  // because it's used in
  getMatchMock.getMatch.mockReturnValueOnce(redirection);
  store.libraries.source.redirections.push(redirection);

  await store.actions.source.fetch("/test");

  expect(redirection.func).toHaveBeenCalledTimes(1);
  expect(getMatchMock.getMatch).toHaveBeenCalledTimes(2);

  // The first call is matching the redirections
  // The second call is matching the handler
  expect(getMatchMock.getMatch.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "link": "/test/",
          "route": "/test/",
        },
        Array [
          Object {
            "func": [MockFunction] {
              "calls": Array [
                Array [
                  Object {},
                ],
              ],
              "results": Array [
                Object {
                  "type": "return",
                  "value": "/redirected",
                },
              ],
            },
            "name": "redirection",
            "params": Object {},
            "pattern": "/test",
            "priority": 1,
          },
        ],
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
