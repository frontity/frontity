import { IConfig, IContext, IAction } from "overmind";
import { namespaced } from "overmind/config";
import { Key } from "path-to-regexp";
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

// Shared types
type Params = { [param: string]: any };

// Action types
export type Fetch = Action<{
  name: string;
  page?: number;
}>;

type Payload = {
  name: string;
  params: Params;
  page: number;
};

export type Handler = (context: Context, payload: Payload) => Promise<void>;

export type Register = Action<{
  pattern: string;
  handler: Handler;
}>;

export type Get = Action<{
  endpoint: string;
  params: Params;
}>;

export type Populate = Action<{
  response: any[] | any;
}>;

// Effects types
export type Api = {
  get: (props: {
    endpoint: string;
    params?: Params;
    siteUrl: string;
    isWpCom?: boolean;
  }) => Promise<Response>;
};

export type Registered = {
  pattern: string;
  handler: Handler;
  regexp: RegExp;
  keys: Key[];
}[];

export type Add = (pattern: string, handler: Handler) => void;

export type Match = (
  ctx: Context,
  params: {
    name: string;
    page: number;
  }
) => Promise<void>;

export type Resolver = {
  registered: Registered;
  add: Add;
  match: Match;
};

// Other types

export type Author = {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: { [size: string]: string }[];
  meta: any[];
};

type Post = {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "draft";
  type: "post";
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: "open" | "closed";
  ping_status: "closed";
  sticky: false;
  template: "";
  format: "standard";
  meta: any[];
  categories: number[];
  tags: number[];
};

type Page = {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: "publish" | "draft";
  type: "page";
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: "open" | "closed";
  ping_status: "open" | "closed";
  template: string;
  meta: [];
};

// export type Entity = Post | Page | Author;
export type Entity = any; // mock up entity type
