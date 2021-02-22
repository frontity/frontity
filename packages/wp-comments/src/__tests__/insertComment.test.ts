import clone from "clone-deep";
import { mergeDeepRight } from "ramda";
import { createStore, InitializedStore } from "@frontity/connect";
import wpSource from "@frontity/wp-source/src";

import { mockResponse, mockComment } from "./mocks/helpers";
import wpComments, { insertComment } from "../";
import { Packages } from "../../types";
import { populate } from "@frontity/wp-source/src/libraries";
import Router from "../../../router/types";

type Api = Packages["libraries"]["source"]["api"];

let store: InitializedStore<Packages & Router>;
let api: jest.Mocked<Api>;

beforeEach(async () => {
  const packages: any = mergeDeepRight(clone(wpSource()), clone(wpComments));

  store = createStore<Packages & Router>(packages);
  store.state.source.url = "https://test.frontity.org/";
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
  api.get = jest.fn();

  // Let's insert 1 comment into the state
  api.get.mockResolvedValueOnce(
    mockResponse([
      mockComment({ post: 60, id: 1 }),
      mockComment({ post: 60, id: 2, parent: 1 }),
    ])
  );

  await store.actions.source.fetch("@comments/60");
});

describe("Inserting a comment", () => {
  test("should add 1 new comment correctly", async () => {
    const comment = mockComment({ post: 60, id: 3 });
    const response = mockResponse(comment);
    const { state } = store;

    const { id, type } = comment;
    const commentItem = { id, type };

    await populate({ response, state });
    insertComment(commentItem, state);

    expect((store.state.source.get("@comments/60") as any).items)
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "children": Array [
            Object {
              "id": 2,
              "type": "comment",
            },
          ],
          "id": 1,
          "type": "comment",
        },
        Object {
          "id": 3,
          "type": "comment",
        },
      ]
    `);
  });

  test("should add a reply comment correctly", async () => {
    const comment = mockComment({ post: 60, id: 3, parent: 1 });
    const response = mockResponse(comment);
    const { state } = store;

    await populate({ response, state });

    const { id, type } = comment;
    insertComment({ id, type }, state);

    expect((store.state.source.get("@comments/60") as any).items)
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "children": Array [
            Object {
              "id": 2,
              "type": "comment",
            },
            Object {
              "id": 3,
              "type": "comment",
            },
          ],
          "id": 1,
          "type": "comment",
        },
      ]
    `);
  });

  test("should add a nested reply comment correctly", async () => {
    const comment = mockComment({ post: 60, id: 3, parent: 2 });
    const response = mockResponse(comment);
    const { state } = store;

    const { id, type } = comment;

    await populate({ response, state });
    insertComment({ id, type }, state);

    expect((store.state.source.get("@comments/60") as any).items)
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "children": Array [
            Object {
              "children": Array [
                Object {
                  "id": 3,
                  "type": "comment",
                },
              ],
              "id": 2,
              "type": "comment",
            },
          ],
          "id": 1,
          "type": "comment",
        },
      ]
    `);
  });
});
