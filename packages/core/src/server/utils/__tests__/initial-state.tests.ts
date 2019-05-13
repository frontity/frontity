import initialState from "../initial-state";

const settings = {
  name: "site",
  mode: "html",
  state: {
    frontity: {
      url: "https://site.com"
    }
  },
  packages: [
    {
      name: "package1",
      active: true,
      state: {}
    },
    {
      name: "package2",
      active: true,
      state: {}
    }
  ]
};

describe("initialState", () => {
  it("should return a valid initial state", () => {
    const url = new URL("https://site.com/post");
    expect(initialState({ settings, url })).toMatchSnapshot();
  });

  it("should return a valid path and page", () => {
    const url = new URL("https://site.com/category/nature/page/2");
    expect(initialState({ settings, url })).toMatchSnapshot();
  });
});
