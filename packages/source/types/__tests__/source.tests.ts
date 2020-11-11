/* eslint-disable @typescript-eslint/no-unused-vars */
import { Action, Derived, Settings, State } from "frontity/types";
import Source from "../../types";

// Source.
const source1 = (libraries: Source["libraries"]): Source => {
  const myInternalArray = [];

  return {
    state: {
      source: {
        get: ({ state }) => (link) => state.source.data[""],
        entity: ({ state }) => <T>(link) => state.source.post[1] as T,
        url: "https://test.frontity.org",
        data: {},
        category: {},
        tag: {},
        post: {},
        page: {},
        author: {},
        attachment: {},
        type: {},
        taxonomy: {},
      },
    },
    actions: {
      source: {
        fetch: ({ state }) => async (link) => {},
      },
    },
    libraries: {
      source: {
        parse: () => ({ path: "" }),
        stringify: () => "/route/",
        normalize: () => "/route/",
      },
    },
  };
};

// Extended Source.
interface MySource extends Source {
  name: "my-source-package";
  state: {
    source: Source["state"]["source"] & {
      // And other props.
      api: Derived<MySource, string> | string;
      myOwnProp: string;
    };
  };
  actions: Source["actions"] & {
    // And other actions.
    source: {
      myOwnAction: Action<MySource>;
    };
  };
}

const source2: MySource = {
  name: "my-source-package",
  state: {
    source: {
      url: ({ state }) => "https://test.frontity.org/",
      api: ({ state }) => state.source.url,
      get: ({ state }) => (link) => state.source.data[""],
      entity: ({ state }) => <T>(link) => state.source.post[1] as T,
      data: {},
      category: {},
      tag: {},
      post: {},
      page: {},
      author: {},
      attachment: {},
      myOwnProp: "some value",
      type: {},
      taxonomy: {},
    },
  },
  actions: {
    source: {
      fetch: ({ state }) => async (link) => {},
      myOwnAction: ({ state }) => {},
    },
  },
  libraries: {
    source: {
      parse: () => ({ path: "" }),
      stringify: () => "/route/",
      normalize: () => "/route/",
    },
  },
};

// Package settings from extended Source.
// -- No settings, no namespace;
const settings1: Settings<MySource> = {
  packages: [
    {
      name: "my-source-package",
    },
  ],
};
// -- No settings, only one namespace selected;
const settings2: Settings<MySource> = {
  packages: [
    {
      name: "my-source-package",
    },
  ],
};
// -- Settings;
const settings3: Settings<MySource> = {
  packages: [
    {
      name: "my-source-package",
      state: {
        source: {
          api: "https://tes.frontity.org/wp-json",
        },
      },
    },
  ],
};
// -- Settings;
const settings4: Settings<MySource> = {
  packages: [
    {
      name: "my-source-package",
      state: {
        source: {
          url: "https://tes.frontity.org",
        },
      },
    },
  ],
};

test("Types are fine!", () => {});
