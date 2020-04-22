/* eslint-disable @typescript-eslint/no-unused-vars */
import Router from "../types";

const router: Router = {
  state: {
    router: {
      link: "/some-path/page/2/?k1=v1",
      method: "push",
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
    },
  },
};

test("Types are fine!", () => ({}));
