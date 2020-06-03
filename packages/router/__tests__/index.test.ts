/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
import Router from "../types";

const router: Router = {
  state: {
    router: {
      link: "/some-path/page/2/?k1=v1",
      state: {
        initial: "/some-path/",
        pages: [1, 2],
      },
    },
  },
  actions: {
    router: {
      set: (state) => (link, options) => {
        /* do something */
      },
      updateState: (state) => (browserState) => {
        /* do something */
      },
    },
  },
};

test("Types are fine!", () => {});
