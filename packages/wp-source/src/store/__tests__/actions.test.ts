import { Overmind } from "overmind";
import { namespaced } from "overmind/config";
import * as source from "..";

let store;
beforeEach(() => {
  const config = namespaced({ source });
  store = new Overmind(config);
});

describe("actions", () => {
  test("Testing Impossible Fetch", async () => {
    store.actions.source.register({
      pattern: "/pathname",
      handler: async (store, { name, params, page }) => {
        await Promise.resolve(params);
        store.actions.source.populate(name, [], page);
      }
    });

    await store.actions.source.fetch({ name: "/pathname", page: 2 });
    // expect(store.state.source.isPopulated).toBe(true);
  });
});
