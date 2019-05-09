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


const stateMock = {
  router: {
    path: "",
    page: null,
    url: "https://example.com",
  },
  frontity: {
    url: "https://example.com",
  }
}

describe("state", () => {
  test.todo("url without page should work");
  test.todo("url with page = 1 should work");
  test.todo("url with page > 1 should work");
});

describe("actions", () => {
  test("set() should work just with a path", () => {
    actions.set(stateMock)("/some-post");
    expect(stateMock).toMatchSnapshot();
  });
  test("set() should work with path and page", () => {
    actions.set(stateMock)({ path: "/category/some-category", page: 2 });
    expect(stateMock).toMatchSnapshot();
  });
  test.todo("init() should add event listener to handle popstate events");
});
