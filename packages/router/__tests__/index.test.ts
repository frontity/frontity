/* eslint-disable @typescript-eslint/no-unused-vars */
import Router from "../types";

const router: Router = {
  state: {
    router: {
      link: "/some-path/page/2/?k1=v1"
    }
  },
  actions: {
    router: {
      set: state => link => {
        /* do something */
      }
    }
  }
};

test("Types are fine!", () => {});
