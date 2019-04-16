import { IConfig, IContext, IAction } from "overmind";
import { namespaced } from "overmind/config";
import * as source from ".";

const settings = {
  actions: {},
  effects: {},
  state: {
    packages: {}
  }
};

const config = namespaced({ source, settings });

export type Config = IConfig<typeof config>;
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
