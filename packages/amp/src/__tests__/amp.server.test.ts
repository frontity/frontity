import { createStore, InitializedStore } from "@frontity/connect";
import clone from "clone-deep";
import { Packages } from "../../types";
import Amp from "../server";

describe("AMP server tests", () => {
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

  test("The initial values are overwritten with the Amp ones", () => {
    const previousRender = store.libraries.frontity.render;
    const previousTemplate = store.libraries.frontity.template;

    store.actions.amp.beforeSSR();

    expect(store.libraries.frontity.render).not.toEqual(previousRender);
    expect(store.libraries.frontity.template).not.toEqual(previousTemplate);
  });
});
