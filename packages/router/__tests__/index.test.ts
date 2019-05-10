import Router from "..";

const router: Router = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      path: "/some-path",
      page: 2,
      url: state => state.router.path
    }
  },
  actions: {
    router: {
      init: state => {
        /* do something */
      },
      set: state => pathOrObj => {
        /* do something */
      }
    }
  }
};

test("Types are fine!", () => {});
