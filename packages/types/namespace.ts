export interface Store {
  state: object;
}

export interface Namespace {
  Root?: React.ReactType;
  Fills?: React.ReactType;
  Components?: {
    [key: string]: React.ReactType;
  };
  Store?: Store;
}
