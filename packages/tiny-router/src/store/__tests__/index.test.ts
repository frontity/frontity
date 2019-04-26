import { createOvermindMock } from "overmind";
import { namespaced } from "overmind/config";
import router from "..";

const settings = {
  state: {
    frontity: {
      url: "https://example.com"
    }
  }
};

let overmind = createOvermindMock(
  namespaced({
    settings,
    router
  })
);

afterEach(() => {
  overmind = createOvermindMock(
    namespaced({
      settings,
      router
    })
  );
});

describe("state", () => {
  test("url", () => {
    expect(overmind.state.router.url).toBe("https://example.com/");
  });
});

describe("actions", () => {
  test("set", async () => {
    const mutations = await overmind.actions.router.set("/some-post");
    expect(mutations).toMatchSnapshot();
  });
});
