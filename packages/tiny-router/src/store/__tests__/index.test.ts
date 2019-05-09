import actions from "../actions";
// import { createStore } from "@frontity/connect";
// import state from "../state";

// const config = {
//   state: {
//     router: state,
//     frontity: {
//       url: "https://example.com"
//     },
//   },
//   actions: {
//     router: actions,
//   }
// };

// let store: any;
// beforeEach(() => {
//   store = createStore(config);
// });

// describe("state", () => {
//   test.todo("addtests");
//   test("url without page", () => {
//     expect(store.state.router.url).toBe("https://example.com/");
//   });
//   test("url with page = 1", () => {
//     expect(store.state.router.url).toBe("https://example.com/");
//   });
//   test("url with page > 1", () => {
//     expect(store.state.router.url).toBe("https://example.com/");
//   });
// });

const state = {
  router: {
    path: "",
    page: null,
    url: "https://example.com",
  },
  frontity: {
    url: "https://example.com",
  }
}

describe("actions set", () => {
  // test("set", async () => {
  //   store.actions.router.set("/some-post");
  //   expect(store.state.router.url).toBe("https://example.com/some-post");
  // });
  test("set() should work just with a path", () => {
    actions.set(state)("/some-post");
    expect(state).toMatchSnapshot();
  });
  test("set() should work with path and page", () => {
    actions.set(state)({ path: "/category/some-category", page: 2 });
    expect(state).toMatchSnapshot();
  });
  test.todo("init() should add event listener to handle popstate events");
});
