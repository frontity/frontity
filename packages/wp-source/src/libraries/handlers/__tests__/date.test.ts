import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { state, actions, effects } from "../../";
import handler from "../date";

import { mockResponse, expectEntities } from "./mocks/helpers";
import posts2016 from "./mocks/posts2016.json";
import posts2016p2 from "./mocks/posts2016p2.json";
import posts20161025 from "./mocks/posts2016-10-25.json";

let mocks;
beforeEach(() => {
  mocks = {
    // Mock resolver
    resolver: { match: jest.fn() },
    // Mock api
    api: { get: jest.fn() },
    // Populate
    populate: effects.populate
  };
});

describe("date", () => {
  test("get two pages of year 2016", async () => {
    mocks.resolver.match.mockReturnValue({
      handler,
      params: { year: "2016" }
    });

    mocks.api.get.mockResolvedValue(
      mockResponse(posts2016, {
        "X-WP-Total": 15,
        "X-WP-TotalPages": 8
      })
    );

    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, { source: mocks });

    await store.actions.source.fetch("/category/nature/");

    expect(mocks.api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source.dataMap).toMatchSnapshot();
    expectEntities(store.state.source);

    mocks.api.get.mockResolvedValue(
      mockResponse(posts2016p2, {
        "X-WP-Total": 15,
        "X-WP-TotalPages": 8
      })
    );

    await store.actions.source.fetch({ path: "/category/nature/", page: 2 });
    expect(mocks.api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source.dataMap).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("doesn't exist in dataMap (2016/10)", async () => {
    mocks.resolver.match.mockReturnValue({
      handler,
      params: { year: "2016", month: "10" }
    });

    mocks.api.get.mockResolvedValue(
      mockResponse(posts20161025, {
        "X-WP-Total": 2,
        "X-WP-TotalPages": 1
      })
    );

    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, { source: mocks });

    await store.actions.source.fetch("/category/nature/");

    expect(mocks.api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source.dataMap).toMatchSnapshot();
    expectEntities(store.state.source);
  });

  test("doesn't exist in dataMap (2016/10/25)", async () => {
    mocks.resolver.match.mockReturnValue({
      handler,
      params: { year: "2016", month: "10", day: "25" }
    });

    mocks.api.get.mockResolvedValue(
      mockResponse(posts20161025, {
        "X-WP-Total": 2,
        "X-WP-TotalPages": 1
      })
    );

    const config = namespaced({ source: { actions, state, effects } });
    const store = createOvermindMock(config, { source: mocks });

    await store.actions.source.fetch("/category/nature/");

    expect(mocks.api.get.mock.calls).toMatchSnapshot();
    expect(store.state.source.dataMap).toMatchSnapshot();
    expectEntities(store.state.source);
  });
});
