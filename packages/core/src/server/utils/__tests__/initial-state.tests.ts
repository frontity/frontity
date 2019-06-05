import initialState from "../initial-state";

const settings = {
  name: "site",
  mode: "html",
  state: {
    frontity: {
      url: "https://site.com",
      prop1: "prop1",
      menu1: ["Home"]
    }
  },
  packages: [
    {
      name: "package1",
      active: true,
      state: {
        frontity: {
          prop1: "overwritten by package1",
          menu1: ["Overwrrite by pacakge1", "With a second item"]
        },
        package1: {
          prop2: "prop2"
        }
      }
    },
    {
      name: "package2",
      active: true,
      state: {
        frontity: {
          prop1: "overwritten by package2"
        },
        package2: {
          prop3: "prop2"
        }
      }
    }
  ]
};

describe("initialState", () => {
  it("should return a valid initial state", () => {
    const url = new URL("https://site.com/post");
    expect(initialState({ settings, url })).toMatchSnapshot();
  });

  it("should return a valid initial link", () => {
    const url = new URL("https://site.com/category/nature/page/2");
    expect(initialState({ settings, url })).toMatchSnapshot();
  });

  it("should return a valid initial link with home", () => {
    const url = new URL("https://site.com");
    expect(initialState({ settings, url })).toMatchSnapshot();
  });

  it("should return a valid initial link with query", () => {
    const url = new URL("https://site.com/page/2?some=query");
    expect(initialState({ settings, url })).toMatchSnapshot();
  });

  it("should return a valid initial link with hash", () => {
    const url = new URL("https://site.com/page/2#some-hash");
    expect(initialState({ settings, url })).toMatchSnapshot();
  });

  it("should return a valid initial link with query and hash", () => {
    const url = new URL("https://site.com/page/2?some=query#some-hash");
    expect(initialState({ settings, url })).toMatchSnapshot();
  });
});
