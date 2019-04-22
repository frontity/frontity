import { IConfig, IContext, IAction, IOnInitialize } from "overmind";
// import { namespaced } from "overmind/config";
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

// const config = namespaced({ source, settings })

// type TConfig = typeof config;

// export type Config = IConfig<TConfig>;

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
    page: number;
  }
) => Promise<void>;

// export type OnInitialize = IOnInitialize<Config>;

export type Settings = {
  apiUrl: string;
  isCom: boolean;
};