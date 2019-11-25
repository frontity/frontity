import Store from "../store";

const rawStore = {
  state: {},
  actions: {}
};

describe("Store", () => {
  it("should return an instance of the Store", () => {
    const store = new Store(rawStore);
    expect(store).toBeInstanceOf(Store);
  });

  it("should expose the rawStore", () => {
    const store = new Store(rawStore);
    expect(store.rawStore).toBe(rawStore);
  });

  it("should be able to replace the whole store", () => {
    const store = new Store(rawStore);
    const newRawStore = { state: {}, actions: {} };
    store.replaceStore(newRawStore);
    expect(store.rawStore).toBe(newRawStore);
  });
});
