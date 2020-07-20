import { createStore, InitializedStore } from "@frontity/connect";
import wpSource from "@frontity/wp-source/src";
import clone from "clone-deep";
import { mergeDeepRight } from "ramda";
import wpComments from "../";
import { Packages } from "../../types";
// JSON mocks

import comments from "./mocks/post-60-comments.json";
import { mockResponse } from "./mocks/helpers";

type Api = Packages["libraries"]["source"]["api"];

let store: InitializedStore<Packages>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  const packages: any = mergeDeepRight(clone(wpSource()), clone(wpComments));
  store = createStore<Packages>(packages);
  store.state.source.api = "https://test.frontity.org/wp-json";
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
});

describe("commentsHandler", () => {
  test("fetch comments from given post and add them to the state", async () => {
    // Mock Api responses
    // We have to use this form instead of:
    // .mockResolvedValueOnce(mockResponse([]))
    // because the later always returns the same instance of Response.
    // which results in error because response.json() can only be run once
    api.get = jest.fn((_) => Promise.resolve(mockResponse(comments)));

    // Fetch entities
    await store.actions.source.fetch("comments/60");
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        Object {
          "endpoint": "comments",
          "params": Object {
            "_embed": false,
            "page": 1,
            "per_page": 100,
            "post": 60,
          },
        },
      ]
    `);

    expect(store.state.source.comment).toMatchInlineSnapshot(`
      Object {
        "1": Object {
          "_links": Object {},
          "author": 1,
          "author_avatar_urls": Object {},
          "author_name": "Frontibotito",
          "author_url": "http://test.frontity.org",
          "content": Object {
            "rendered": "<p>Test Comment 1</p>",
          },
          "date": "2020-07-20T11:00:00",
          "date_gmt": "2019-07-20T09:00:00",
          "id": 1,
          "link": "/2016/the-beauties-of-gullfoss/comment-page-1/#comment-1",
          "meta": Array [],
          "parent": 0,
          "post": 60,
          "status": "approved",
          "type": "comment",
        },
        "2": Object {
          "_links": Object {},
          "author": 1,
          "author_avatar_urls": Object {},
          "author_name": "Frontibotito",
          "author_url": "http://test.frontity.org",
          "content": Object {
            "rendered": "<p>Test Comment 2</p>",
          },
          "date": "2020-07-20T12:00:00",
          "date_gmt": "2019-07-20T10:00:00",
          "id": 2,
          "link": "/2016/the-beauties-of-gullfoss/comment-page-1/#comment-2",
          "meta": Array [],
          "parent": 0,
          "post": 60,
          "status": "approved",
          "type": "comment",
        },
      }
    `);

    expect(store.state.source.get("comments/60")).toMatchInlineSnapshot(`
      Object {
        "areComments": true,
        "isFetching": false,
        "isReady": true,
        "items": Array [
          Object {
            "children": Array [],
            "id": 2,
            "type": "comment",
          },
          Object {
            "children": Array [],
            "id": 1,
            "type": "comment",
          },
        ],
        "link": "comments/60/",
        "page": 1,
        "postId": 60,
        "query": Object {},
        "route": "comments/60/",
        "total": 2,
        "totalPages": 1,
      }
    `);
  });
});
