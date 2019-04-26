import { IAction } from "overmind";

export type RootState = {
  settings: any;
  router: State;
};

export type State = {
  path: string;
  page: null | number;
  url: (state: State, rootState: RootState) => string;
};

export interface Action<Input = void> extends IAction<Store, Input> {}

type Set = Action<string | { path: string; page: number }>;

export type Actions = {
  set: Set;
};

export type Store = {
  state: State;
  actions: Actions;
};
