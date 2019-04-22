import { IConfig, IContext, IAction, IOnInitialize } from "overmind";
import { namespaced } from "overmind/config";
import * as source from ".";

const settings = {
  actions: {},
  effects: {},
  state: {
    packages: {
      source: {} as Settings
    }
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

export type OnInitialize = IOnInitialize<Config>;

export type Settings = {
  apiUrl: string;
  isCom: boolean;
};

// DATA TYPES

export type DataMap = {
  [name: string]: Data;
};

export type Data =
  | DataFetching
  | DataArchive
  | DataTaxonomy
  | DataCategory
  | DataTag
  | DataAuthor
  | DataPostTypeArchive
  | DataPostArchive
  | DataDate
  | DataPostType
  | DataPost
  | DataPage
  | DataAttachment
  | Data404;

// DATA FETCHING

export type DataFetching = {
  isFetching: boolean;
  isReady?: boolean;
};

// ARCHIVES

export type DataArchive = DataFetching & {
  isArchive: true;
  page: {
    type: string;
    id: number;
    link: string;
  }[];
};

export type DataTaxonomy = DataArchive & {
  type: string;
  id: number;
  isTaxonomy: true;
};

export type DataCategory = DataTaxonomy & {
  isCategory: true;
};

export type DataTag = DataTaxonomy & {
  isTag: true;
};

export type DataAuthor = DataArchive & {
  id: number;
  isAuthor: true;
};

export type DataPostTypeArchive = DataFetching & {
  type: string;
  isPostTypeArchive: true;
};

export type DataPostArchive = DataPostTypeArchive & {
  isPostArchive: true;
  isHome: boolean;
  isFrontPage?: boolean;
};

export type DataDate = DataFetching & {
  date: string;
  isDate: true;
};

// POST TYPES

export type DataPostType = DataFetching & {
  type: string;
  id: number;
  isPostType: true;
};

export type DataPost = DataPostType & {
  isPost: true;
};

export type DataPage = DataPostType & {
  isPage: true;
  isFrontPage?: boolean;
};

export type DataAttachment = DataPostType & {
  isAttachment: true;
  isMedia: true;
};

// NOT FOUND (OR ERROR)

export type Data404 = DataFetching & {
  is404: true;
};
