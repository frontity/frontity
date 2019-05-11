import Router from "..";

const router: Router = {
  name: "@frontity/tiny-router",
  state: {
    router: {
      path: "/some-path",
      page: 2
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
