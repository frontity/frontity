import Router from "..";

const router: Router = {
  state: {
    router: {
      path: "/some-path",
      page: 2,
      query: {
        k1: "v1"
      }
    }
  },
  actions: {
    router: {
      set: state => routeOrParams => {
        /* do something */
      }
    }
  }
};

test("Types are fine!", () => {});
