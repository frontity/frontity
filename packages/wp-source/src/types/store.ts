import {
  IConfig,
  IContext,
  IAction,
  IOnInitialize,
  IDerive,
  IState
} from "overmind";
import * as source from "../store";

const settings = {
  actions: {},
  effects: {},
  state: {
    packages: {
      source: {} as Settings
    }
  }
};

export interface Config
  extends IConfig<{
    state: {
      source: typeof source.state;
      settings: typeof settings.state;
    };
    actions: {
      source: typeof source.actions;
      settings: typeof settings.actions;
    };
    effects: {
      source: typeof source.effects;
      settings: typeof settings.effects;
    };
  }> {}

export interface Action<Input = void> extends IAction<Config, Input> {}

export interface OnInitialize extends IOnInitialize<Config> {}

export interface Derive<Parent extends IState, Output>
  extends IDerive<Config, Parent, Output> {}

export interface Context extends IContext<Config> {}

export type Handler = (
  context: Context,
  payload: {
    path: string;
    params: { [param: string]: any };
    page?: number;
    isPopulating?: boolean;
  }
) => Promise<void>;

export type Settings = {
  apiUrl: string;
  isCom: boolean;
};
