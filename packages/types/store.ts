type Action =
  | ((state: Store["state"]) => void)
  | ((state: Store["state"]) => (input: any) => void);

export interface Store {
  state: {
    [namespace: string]: {
      [prop: string]: any;
    };
  };
  actions: {
    [namespace: string]: {
      [action: string]: Action;
    };
  };
  reactions: {
    [namespace: string]: {
      [reaction: string]: any;
    };
  };
}

export default Store;
