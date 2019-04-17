import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import { actions, effects } from "..";

let store;
let resolver: { match: jest.Mock };
beforeEach(() => {
  const state = { data: {} };
  // mock 'resolver.match' function
  resolver = { match: jest.fn(() => Promise.resolve()) };
  // create store
  store = createOvermindMock(
    namespaced({ source: { actions, state, effects } }),
    { source: { resolver } }
  );
});

describe("actions › fetch", () => {
  test("adds data if that name doesn't exist yet", async () => {
    const name = "/category/nature";

    // data[name] doesn't exist yet
    expect(store.state.source.data[name]).not.toBeDefined();

    // just after execute 'fetch', data[name] should exist
    const fetchPromise = store.actions.source.fetch({ name });
    expect(store.state.source.data[name]).toBeDefined();
    expect(store.state.source.data[name].isFetching).toBe(true);

    // match function should have been called
    expect(resolver.match).toHaveBeenCalled();

    // when fetch has finished isFetching should be false
    await fetchPromise;
    expect(store.state.source.data[name].isFetching).toBe(false);
  });

  test("doesn't do anything if that name exists", async () => {
    const name = "/category/nature";

    // add data[name] to the store
    await store.actions.source.fetch({ name });
    expect(resolver.match).toHaveBeenCalledTimes(1);
    expect(store.state.source.data[name].isFetching).toBe(false);

    // fetch again the same name
    const fetchPromise = store.actions.source.fetch({ name });

    // just after execute nothing must have happened
    expect(resolver.match).toHaveBeenCalledTimes(1);
    expect(store.state.source.data[name].isFetching).toBe(false);

    // when fetch has finished nothing must have happened
    await fetchPromise;
    expect(resolver.match).toHaveBeenCalledTimes(1);
    expect(store.state.source.data[name].isFetching).toBe(false);
  });

  test("doesn't do anything if fetch is executed inside handler", async () => {
    const name = "/category/nature";

    // Change 'resolver.match' so it calls 'source.fetch' action
    resolver.match = jest.fn(() => {
      store.actions.source.fetch({ name });
      return Promise.resolve();
    });

    // spy on source.fetch
    jest.spyOn(store.actions.source, "fetch");

    /// just after execute 'fetch', data[name] should exist
    const fetchPromise = store.actions.source.fetch({ name });
    expect(store.state.source.data[name]).toBeDefined();
    expect(store.state.source.data[name].isFetching).toBe(true);

    // match function should have been called
    expect(resolver.match).toHaveBeenCalled();

    // when fetch has finished
    // 1. isFetching should be false
    // 2. fetch should have been called 2 times
    // 3. resolver.match should have been called once
    await fetchPromise;
    expect(store.state.source.data[name].isFetching).toBe(false);
    expect(store.actions.source.fetch).toHaveBeenCalledTimes(2);
    expect(resolver.match).toHaveBeenCalledTimes(1);
  });
});
