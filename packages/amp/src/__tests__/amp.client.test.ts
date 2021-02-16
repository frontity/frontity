import { createStore, InitializedStore } from "@frontity/connect";
import clone from "clone-deep";
import { Packages } from "../../types";
import Amp from "../client";

describe("AMP client hydration tests", () => {
  let store: InitializedStore<Packages>;

  beforeEach(() => {
    // Initialize the store
    store = createStore<Packages>(clone(Amp));

    // We have to mock these since the `createStore` it's not the one used
    // on the server and client.
    store.libraries = {
      source: {
        parse: jest.fn(),
        normalize: jest.fn(),
        stringify: jest.fn(),
      },
      frontity: {
        App: jest.fn(),
        render: jest.fn(),
        template: jest.fn(),
      },
    };
  });

  test("The initial App is overwritten with the Amp one", () => {
    const previousApp = store.libraries.frontity.App;
    store.actions.amp.beforeCSR();

    expect(store.libraries.frontity.App).not.toEqual(previousApp);
  });
});
