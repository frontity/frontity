import { IConfig, IContext, IAction } from 'overmind';
import { namespaced } from 'overmind/config';
import * as source from '.';

const config = namespaced({ source });

export type Config = IConfig<typeof config>;
export type Context = IContext<Config>;
export type Action<Input = void> = IAction<Config, Input>;


// Action types
export type Fetch = Action<{
  name: string;
  page?: number;
}>;

type Payload = {
  name: string;
  params: { [param: string]: string };
  page: number;
};

export type Handler = (context: Context, payload: Payload) => Promise<void>;

export type Register = Action<{
  pattern: string | RegExp;
  handler: Handler;
}>;

// Effects types

export type IsMatch = (name: string, pattern: string) => boolean;
export type Exec = (name: string, pattern: string) => { [param: string]: string }