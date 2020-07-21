import { createStore, InitializedStore } from "@frontity/connect";
import wpSource from "@frontity/wp-source/src";
import clone from "clone-deep";
import { mergeDeepRight } from "ramda";
import wpComments from "../";
import { Packages } from "../../types";
import { mockResponse, mockComment } from "./mocks/helpers";

type Api = Packages["libraries"]["source"]["api"];

let store: InitializedStore<Packages>;
let api: jest.Mocked<Api>;

beforeEach(() => {
  const packages: any = mergeDeepRight(clone(wpSource()), clone(wpComments));
  store = createStore<Packages>(packages);
  store.state.source.api = "https://test.frontity.org/wp-json";
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
  api.get = jest.fn();
});

describe("commentsHandler", () => {
  test("should populate comments correctly", async () => {
    api.get.mockResolvedValueOnce(
      mockResponse([
        mockComment({ post: 60, id: 2 }),
        mockComment({ post: 60, id: 1 }),
      ])
    );

    await store.actions.source.fetch("comments/60");

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get.mock.calls[0]).toMatchSnapshot();
    expect(store.state.source.comment).toMatchSnapshot();
    expect(store.state.source.get("comments/60")).toMatchSnapshot();
  });

  test("should work fine if there are no comments", async () => {
    api.get.mockResolvedValueOnce(mockResponse([]));

    await store.actions.source.fetch("comments/60");

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get.mock.calls[0]).toMatchSnapshot();
    expect(store.state.source.comment).toMatchSnapshot();
    expect(store.state.source.get("comments/60")).toMatchSnapshot();
  });

  test("should request more pages if there are more than 100 comments", async () => {
    // We use these headers to pretend that the responses contain many more
    // comments than they actually have.
    const responseProps = {
      headers: {
        "X-WP-TotalPages": "3",
        "X-WP-Total": "201",
      },
    };

    api.get
      .mockResolvedValueOnce(
        mockResponse([mockComment({ post: 60, id: 201 })], responseProps)
      )
      .mockResolvedValueOnce(
        mockResponse([mockComment({ post: 60, id: 101 })], responseProps)
      )
      .mockResolvedValueOnce(
        mockResponse([mockComment({ post: 60, id: 1 })], responseProps)
      );

    await store.actions.source.fetch("comments/60");

    expect(api.get).toHaveBeenCalledTimes(3);
    expect(api.get.mock.calls[0]).toMatchSnapshot();
    expect(store.state.source.comment).toMatchSnapshot();
    expect(store.state.source.get("comments/60")).toMatchSnapshot();
  });

  test("should handle replies correctly", async () => {
    api.get.mockResolvedValueOnce(
      mockResponse([
        mockComment({ post: 60, id: 3, parent: 2 }),
        mockComment({ post: 60, id: 2 }),
        mockComment({ post: 60, id: 1 }),
      ])
    );

    await store.actions.source.fetch("comments/60");

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get.mock.calls[0]).toMatchSnapshot();
    expect(store.state.source.comment).toMatchSnapshot();
    expect(store.state.source.get("comments/60")).toMatchSnapshot();
  });

  test("should handle replies correctly when more than one page", async () => {
    // We use these headers to pretend that the responses contain many more
    // comments than they actually have.
    const responseProps = {
      headers: {
        "X-WP-TotalPages": "2",
        "X-WP-Total": "103",
      },
    };

    api.get
      .mockResolvedValueOnce(
        mockResponse(
          [
            mockComment({ post: 60, id: 3, parent: 2 }),
            mockComment({ post: 60, id: 2 }),
            mockComment({ post: 60, id: 1 }),
          ],
          responseProps
        )
      )
      .mockResolvedValueOnce(
        mockResponse(
          [
            mockComment({ post: 60, id: 6 }),
            mockComment({ post: 60, id: 5, parent: 4 }),
            mockComment({ post: 60, id: 4, parent: 3 }),
          ],
          responseProps
        )
      );

    await store.actions.source.fetch("comments/60");

    expect(api.get).toHaveBeenCalledTimes(2);
    expect(api.get.mock.calls[0]).toMatchSnapshot();
    expect(store.state.source.comment).toMatchSnapshot();
    expect(store.state.source.get("comments/60")).toMatchSnapshot();
  });
});
