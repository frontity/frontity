import { createStore } from "@frontity/connect";
import { Response as NodeResponse } from "node-fetch";
import wpSource from "../../";
import populate from "../populate";
import postsCat7 from "../handlers/__tests__/mocks/posts-cat-7.json";
import postsCat7Subdir from "../handlers/__tests__/mocks/posts-cat-7-subdir.json";

jest.mock("../");

const initStore = () => {
  const config = wpSource();
  return createStore(config);
};

// Use Response from "node-fetch" to mock response objects,
// but with "lib.dom.d.ts" Response type.
const mockResponse = body =>
  (new NodeResponse(JSON.stringify(body)) as any) as Response;

describe("populate", () => {
  test("adds posts and embedded into state", async () => {
    const { state } = initStore();
    const response = mockResponse(postsCat7);
    const result = await populate({ state, response });

    expect(result).toMatchSnapshot();
    expect(state.source).toMatchSnapshot();
  });

  test("removes WP API path from links", async () => {
    const { state } = initStore();
    state.source.api = "https://test.frontity.io/subdirectory/wp-json";

    const response = mockResponse(postsCat7Subdir);
    const result = await populate({ state, response });

    expect(result).toMatchSnapshot();
    expect(state.source).toMatchSnapshot();
  });

  test("transforms links if subdirectory is specified", async () => {
    const { state } = initStore();
    state.source.api = "https://test.frontity.io/subdirectory/wp-json";

    const response = mockResponse(postsCat7Subdir);
    const subdirectory = "/blog/";
    const result = await populate({ state, response, subdirectory });

    expect(result).toMatchSnapshot();
    expect(state.source).toMatchSnapshot();
  });
});
