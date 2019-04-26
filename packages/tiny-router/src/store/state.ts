import { State } from "./types";

const state: State = {
  path: "/",
  page: null,
  url: (_, state) => state.settings.frontity.url + state.router.path
};

export default state;
