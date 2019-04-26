type State = {
  frontity: {
    name?: string;
    mode?: string;
  };
};

type Store = {
  state: {
    settings: State;
  };
};

type StoreWithSettings = Store & {
  settings: any;
};

export type Settings = {
  state: State;
  onInitialize?: (store: Store) => void;
  actions?: {
    addSettings: (_, store: StoreWithSettings) => void;
  };
};
