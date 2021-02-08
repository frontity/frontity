import { createStore, InitializedStore } from "@frontity/connect";
import WpSource from "../../types";
import clone from "clone-deep";
import wpSource from "..";
jest.mock("../libraries/handlers");
import * as handlers from "../libraries/handlers";

let store: InitializedStore<WpSource>;

// Create mock for handler generators
const handlerMocks = handlers as jest.Mocked<typeof handlers>;
handlerMocks.postArchive.mockResolvedValue(null);
handlerMocks.postType.mockResolvedValue(null);

describe("AMP tests", () => {
  beforeEach(() => {
    // Reset mocks
    handlerMocks.postArchive.mockClear();
    handlerMocks.postType.mockClear();

    store = createStore<WpSource>(clone(wpSource(), { clone: false }));
    store.state.source.url = "https://test.frontity.org/";
  });

  test("`/author/amp` is not supported", async () => {
    await store.actions.source.init();
    await store.actions.source.fetch("/author/amp");
    const data = store.state.source.get("/author/amp");

    // We don't support using "amp" as a term, so this link is
    // not correct, but we will fix this in source V2.0
    expect(data.link).toBe("/author/");
  });

  test("`/tag/amp` is not supported", async () => {
    await store.actions.source.init();
    await store.actions.source.fetch("/tag/amp");
    const data = store.state.source.get("/tag/amp");

    // We don't support using "amp" as a term, so this link is
    // not correct, but we will fix this in source V2.0
    expect(data.link).toBe("/tag/");
    expect(data).toMatchInlineSnapshot(`
      Object {
        "isFetching": false,
        "isReady": true,
        "link": "/tag/",
        "page": 1,
        "query": Object {},
        "route": "/tag/amp/",
      }
    `);
  });

  test("`/category/amp` is not supported", async () => {
    await store.actions.source.init();
    await store.actions.source.fetch("/category/amp");

    const data = store.state.source.get("/category/amp");

    // We don't support using "amp" as a term, so this link is
    // not correct, but we will fix this in source V2.0
    expect(data.link).toBe("/category/");
    expect(data).toMatchInlineSnapshot(`
      Object {
        "isFetching": false,
        "isReady": true,
        "link": "/category/",
        "page": 1,
        "query": Object {},
        "route": "/category/amp/",
      }
    `);
  });

  test("`/some-post/amp` is not supported", async () => {
    await store.actions.source.init();
    await store.actions.source.fetch("/some-post/amp");
    const data = store.state.source.get("/some-post/amp");

    // We don't support using "amp" as a term, so this link is
    // not correct, but we will fix this in source V2.0
    expect(data.link).toBe("/some-post/");
    expect(data).toMatchInlineSnapshot(`
      Object {
        "isFetching": false,
        "isReady": true,
        "link": "/some-post/",
        "page": 1,
        "query": Object {},
        "route": "/some-post/amp/",
      }
    `);
  });

  test("`/amp` should fetch the home page", async () => {
    await store.actions.source.init();
    await store.actions.source.fetch("/amp");
    const data = store.state.source.get("/amp");

    expect(data.link).toBe("/");
    expect(data).toMatchInlineSnapshot(`
      Object {
        "isFetching": false,
        "isReady": true,
        "link": "/",
        "page": 1,
        "query": Object {},
        "route": "/amp/",
      }
    `);

    // The handler for the home page should be called
    expect(handlerMocks.postArchive).toHaveBeenCalledTimes(1);
    expect(
      handlerMocks.postArchive.mock.calls[0][0].params
    ).toMatchInlineSnapshot(`Object {}`);
  });
});
