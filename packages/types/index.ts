export interface Store {
  state: {
    [namespace: string]: {
      [prop: string]: any;
    };
  };
  actions: {
    [namespace: string]: {
      [action: string]:
        | ((state: Store["state"]) => void)
        | ((state: Store["state"]) => (input: any) => void);
    };
  };
  reactions: {
    [namespace: string]: {
      [reaction: string]: any;
    };
  };
}

export type Action<S extends Store, I = null> = [I] extends [null]
  ? (state: S["state"]) => void
  : (state: S["state"]) => (input: I) => void;

export type Derived<S extends Store, IorO, O = null> = [O] extends [null]
  ? (state: S["state"]) => IorO
  : (state: S["state"]) => (input: IorO) => O;
