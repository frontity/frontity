import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { actions, state, effects } from "..";
import { Handler, DataCategory } from "../../types";

const mockStore = () => {
  const config = namespaced({ source: { actions, state, effects } });

  const resolver = {
    match: (): {
      handler: Handler;
      params: { [param: string]: any };
    } => ({
      handler: async (ctx, { name, page }) => {
        const nature: DataCategory = {
          type: "category",
          id: 12,
          isArchive: true,
          isTaxonomy: true,
          isCategory: true,
          isFetching: true, 
          page: []
        };

        nature.page[page] = [
          { type: "post", id: 60, link: "/the-beauties-of-gullfoss" }
        ];

        Object.assign(ctx.state.source.data[name], nature);
      },
      params: {}
    })
  };

  return createOvermindMock(config, { source: { resolver } });
};

// return if the data that it's about to be fetched already exists
// init data

describe("actions › fetch", () => {
  test.only("adds data if that name doesn't exist yet", async () => {
    const name = "/category/nature";

    // init store
    const store = mockStore();

    // data[name] doesn't exist yet
    expect(store.state.source.data[name]).not.toBeDefined();

    // just after execute 'fetch', data[name] should exist
    const fetchPromise = store.actions.source.fetch({ name });
    expect(store.state.source.data[name]).toBeDefined();
    expect(store.state.source.data[name].isFetching).toBe(true);

    const mutations = await fetchPromise;
    expect(mutations).toMatchSnapshot();
  });

  test("doesn't do anything if that name exists", async () => {
    const name = "/category/nature";

    // init store
    const match = jest.fn(() => ({
      handler: async () => {},
      params: {}
    }));
    const store = mockStore();

    // add data[name] to the store
    await store.actions.source.fetch({ name });
    expect(match).toHaveBeenCalled();
    expect(store.state.source.data[name].isFetching).toBe(false);

    // fetch again the same name
    const fetchPromise = store.actions.source.fetch({ name });

    // just after execute nothing must have happened
    expect(match).toHaveBeenCalledTimes(1);
    expect(store.state.source.data[name].isFetching).toBe(false);

    // when fetch has finished nothing must have happened
    await fetchPromise;
    expect(match).toHaveBeenCalledTimes(1);
    expect(store.state.source.data[name].isFetching).toBe(false);
  });

  test("doesn't do anything if fetch is executed inside handler", async () => {
    const name = "/category/nature";

    // init store
    // Change 'resolver.match' so it calls 'source.fetch' action
    const match = jest.fn(() => {
      store.actions.source.fetch({ name });
      return Promise.resolve();
    });
    const store = mockStore();

    // spy on source.fetch
    jest.spyOn(store.actions.source, "fetch");

    /// just after execute 'fetch', data[name] should exist
    const fetchPromise = store.actions.source.fetch({ name });
    expect(store.state.source.data[name]).toBeDefined();
    expect(store.state.source.data[name].isFetching).toBe(true);

    // match function should have been called
    expect(match).toHaveBeenCalled();

    // when fetch has finished
    // 1. isFetching should be false
    // 2. fetch should have been called 2 times
    // 3. resolver.match should have been called once
    await fetchPromise;
    expect(store.state.source.data[name].isFetching).toBe(false);
    expect(store.actions.source.fetch).toHaveBeenCalledTimes(2);
    expect(match).toHaveBeenCalledTimes(1);
  });
});
