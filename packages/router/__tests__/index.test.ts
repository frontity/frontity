import Router from "..";

const router: Router = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      path: "/some-path",
      page: 2,
      location: state => new URL(state.router.path)
    }
  },
  actions: {
    router: {
      set: state => pathOrObj => {
        /* do something */
      }
    }
  }
};

test("Types are fine!", () => {});
