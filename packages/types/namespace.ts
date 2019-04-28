export interface Store {
  state: object;
}

export interface Namespace {
  root?: React.ReactType;
  fills?: React.ReactType;
  store?: Store;
  exports?: object;
}

export default Namespace;
