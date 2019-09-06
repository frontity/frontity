import { createStore, InitializedStore } from "@frontity/connect";
import wpSource from "../../../";
import WpSource from "../../../../types";
import Api from "../../api";
// JSON mocks
import { mockResponse } from "./mocks/helpers";
import attachment1 from "./mocks/post-type/attachment-1.json";
import page1 from "./mocks/post-type/page-1.json";
import post1 from "./mocks/post-type/post-1.json";
import cpt11 from "./mocks/post-type/cpt-11.json";

let store: InitializedStore<WpSource>;
let api: jest.Mocked<Api>;
beforeEach(() => {
  store = createStore(wpSource());
  store.actions.source.init();
  api = store.libraries.source.api as jest.Mocked<Api>;
});

describe("post", () => {
  test("doesn't exist in source.post", async () => {
    // Mock Api responses
    api.get = jest.fn().mockResolvedValueOnce(mockResponse([post1]));
    // Fetch entities
    await store.actions.source.fetch("/post-1/");
    expect(store.state.source).toMatchSnapshot();
  });

  // test("exists in source.post", async () => {
  //   const get = store.libraries.source.api.get as jest.Mock;

  //   store.state.source.post[60] = post60;

  //   // source.fetch("/the-beauties-of-gullfoss/")
  //   store.state.source.data["/the-beauties-of-gullfoss/"] = {
  //     isFetching: true,
  //     isReady: false
  //   };

  //   await handler({
  //     route: "/the-beauties-of-gullfoss/",
  //     params: { slug: "the-beauties-of-gullfoss" },
  //     ...store
  //   });

  //   expect(get).not.toBeCalled();
  //   expect(store.state.source.data).toMatchSnapshot();
  // });

  // test("throws an error if it doesn't exist", async () => {
  //   store.libraries.source.api.get = jest
  //     .fn()
  //     .mockResolvedValueOnce(mockResponse([]));

  //   store.libraries.source.populate = jest
  //     .fn()
  //     .mockResolvedValueOnce(mockResponse([]));

  //   // source.fetch("/the-beauties-of-gullfoss/")
  //   store.state.source.data["/the-beauties-of-gullfoss/"] = {
  //     isFetching: true,
  //     isReady: false
  //   };

  //   const promise = handler({
  //     route: "/the-beauties-of-gullfoss/",
  //     params: { slug: "the-beauties-of-gullfoss" },
  //     ...store
  //   });

  //   expect(promise).rejects.toThrowError();
  // });

  // test("fetchs from a different endpoint with extra params", async () => {
  //   // change the default post endpoint and params
  //   store.state.source.postEndpoint = "multiple-post-type";
  //   store.state.source.params = { type: ["post", "travel"] };

  //   // source.fetch("/the-beauties-of-gullfoss/")
  //   store.state.source.data["/the-beauties-of-gullfoss/"] = {
  //     isFetching: true,
  //     isReady: false
  //   };

  //   await handler({
  //     route: "/the-beauties-of-gullfoss/",
  //     params: { slug: "the-beauties-of-gullfoss" },
  //     ...store
  //   });

  //   const apiGet = jest.spyOn(store.libraries.source.api, "get");
  //   expect(apiGet.mock.calls).toMatchSnapshot();
  // });
});

describe("page", () => {});

describe("attachment", () => {});

describe("cpt", () => {});
