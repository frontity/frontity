import { IConfig, IContext, IAction, IOnInitialize } from "overmind";
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

export type Config = IConfig<{
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
}>;

export type Context = IContext<Config>;
export type Action<Input = void> = IAction<Config, Input>;

export type Handler = (
  context: Context,
  payload: {
    name: string;
    params: { [param: string]: any };
    page?: number;
    isPopulated?: boolean;
  }
) => Promise<void>;

export type OnInitialize = IOnInitialize<Config>;

export type Settings = {
  apiUrl: string;
  isCom: boolean;
};