import { State } from "../../type";

const state = {
  path: "/",
  page: null,
  url: (state: State): string =>
    `${new URL(state.frontity.url, state.router.path)}`
};

export default state;
