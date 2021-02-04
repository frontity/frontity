import { createStore, InitializedStore } from "@frontity/connect";
import WpSource from "../../types";
import clone from "clone-deep";
import wpSource from "..";
jest.mock("../libraries/handlers");
import * as handlers from "../libraries/handlers";

let store: InitializedStore<WpSource>;

// Create mock for handler generators
const handlerMocks = handlers as jest.Mocked<typeof handlers>;
handlerMocks.author.mockResolvedValue(null);
handlerMocks.tag.mockResolvedValue(null);
handlerMocks.category.mockResolvedValue(null);
handlerMocks.postType.mockResolvedValue(null);

describe("AMP tests", () => {
  beforeEach(() => {
    // Reset mocks
    handlerMocks.author.mockClear();
    handlerMocks.tag.mockClear();
    handlerMocks.category.mockClear();
    handlerMocks.postType.mockClear();

    store = createStore<WpSource>(clone(wpSource(), { clone: false }));
    store.state.source.url = "https://test.frontity.org/";
  });

  test("Should call the author handler if 'amp' is an author", async () => {
    await store.actions.source.init();
    await store.actions.source.fetch("/author/amp");

    expect(handlerMocks.author).toHaveBeenCalledTimes(1);
    expect(handlerMocks.author.mock.calls[0][0].params).toMatchInlineSnapshot(`
      Object {
        "slug": "amp",
      }
    `);
  });

  test("Should call the tag handler if 'amp' is a tag", async () => {
    await store.actions.source.init();
    await store.actions.source.fetch("/tag/amp");

    expect(handlerMocks.tag).toHaveBeenCalledTimes(1);
    expect(handlerMocks.tag.mock.calls[0][0].params).toMatchInlineSnapshot(`
      Object {
        "slug": "amp",
      }
    `);
  });

  test("Should call the category handler if 'amp' is a category", async () => {
    await store.actions.source.init();
    await store.actions.source.fetch("/category/amp");

    expect(handlerMocks.category).toHaveBeenCalledTimes(1);
    expect(handlerMocks.category.mock.calls[0][0].params)
      .toMatchInlineSnapshot(`
      Object {
        "0": undefined,
        "slug": "amp",
      }
    `);
  });

  test("Should call the post handler if 'amp' is a post", async () => {
    await store.actions.source.init();
    await store.actions.source.fetch("/amp");

    expect(handlerMocks.postType).toHaveBeenCalledTimes(1);

    // The slug should be `amp` because we are intentionally
    expect(handlerMocks.postType.mock.calls[0][0].params)
      .toMatchInlineSnapshot(`
      Object {
        "0": undefined,
        "slug": "amp",
      }
    `);
  });

  test("Should call the post handler if 'amp' is a post 2", async () => {
    await store.actions.source.init();
    await store.actions.source.fetch("/some-post/amp");

    expect(handlerMocks.postType).toHaveBeenCalledTimes(1);
    expect(handlerMocks.postType.mock.calls[0][0].params)
      .toMatchInlineSnapshot(`
      Object {
        "0": undefined,
        "slug": "some-post",
      }
    `);
  });
});
