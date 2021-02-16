import { createStore, InitializedStore } from "@frontity/connect";
import clone from "clone-deep";
import { Packages } from "../../types";
import Amp from "../server";

jest.mock("@emotion/server/create-instance", () => () => ({
  extractCritical: jest.fn().mockImplementation((args) => args),
}));

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
        App: jest.fn().mockImplementation((args) => args),
        render: jest.fn().mockImplementation((args) => args),
        template: jest.fn().mockImplementation((args) => args),
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

  test("The `render` method uses the CacheProvider", () => {
    const previousRender = store.libraries.frontity.render;

    // Call the beforeSSR action.
    store.actions.amp.beforeSSR();

    const render = store.libraries.frontity.render;
    const result = render({ App: store.libraries.frontity.App });

    expect(result).toMatchSnapshot();
    expect(previousRender).toBeCalled();

    // Expect the App contents to be overwritten with the cache provider.
    const contents = result.App();
    expect(contents).toMatchSnapshot();
  });

  test("The `template` method uses the previous result", () => {
    const previousTemplate = store.libraries.frontity.template;

    // Call the beforeSSR action.
    store.actions.amp.beforeSSR();

    const template = store.libraries.frontity.template;

    expect(
      template({
        result: { html: "html", css: "css", ids: ["id1"] },
        head: [],
        html: "initial",
        scripts: [],
      })
    ).toMatchSnapshot();
    expect(previousTemplate).toBeCalled();
  });
});
