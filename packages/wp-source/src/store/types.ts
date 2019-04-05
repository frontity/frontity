import { IConfig, IContext, IAction } from "overmind";
import { namespaced } from "overmind/config";
import { Key } from "path-to-regexp";
import * as source from ".";

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
  pattern: string;
  handler: Handler;
}>;

// Effects types
export type Registered = {
  pattern: string;
  handler: Handler;
  regexp: RegExp;
  keys: Key[];
}[];

export type Add = (pattern: string, handler: Handler) => void;

export type Match = (
  name: string
) => { handler?: Handler; params: { [param: string]: string } };

export type Resolver = {
  registered: Registered;
  add: Add;
  match: Match;
}
