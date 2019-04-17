export interface Store {
  state: object;
}

export interface Namespace {
  Root?: React.Component | React.FunctionComponent;
  Fills?: React.Component | React.FunctionComponent;
  Components?: {
    [key: string]: React.Component | React.FunctionComponent;
  };
  Store: Store;
}
