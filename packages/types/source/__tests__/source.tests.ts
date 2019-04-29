import { Action, Settings } from "../..";
import Source from "..";

// Source.
const source1 = (libraries: Source["libraries"]): Source => {
  const myInternalArray = [];

  return {
    state: {
      source: {
        data: state => pathOrObj => state.source.dataMap[""],
        dataMap: {},
        category: {},
        tag: {},
        post: {},
        page: {},
        author: {},
        attachment: {}
      }
    },
    actions: {
      source: {
        fetch: state => pathOrObj => {
          libraries.router.myAction();
        }
      }
    },
    libraries: {
      source: {
        populate: () => {}
      }
    }
  };
};

// Extended Source.
interface MySource extends Source {
  name?: "my-source-package";
  namespaces?: ("source" | "other")[];
  state: {
    // Add some settings.
    settings: {
      source: {
        api: string;
      };
    };
    source: Source["state"]["source"] & {
      // And other props.
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
  state: {
    settings: {
      source: {
        api: "https://site.com/api"
      }
    },
    source: {
      data: state => pathOrObj => state.source.dataMap[""],
      dataMap: {},
      category: {},
      tag: {},
      post: {},
      page: {},
      author: {},
      attachment: {},
      myOwnProp: "some value"
    }
  },
  actions: {
    source: {
      fetch: state => pathOrObj => {},
      myOwnAction: state => {}
    }
  },
  libraries: {
    source: {
      populate: () => {}
    }
  }
};

// Package settings from extended Source.
// -- No settings, no namespace;
const settings1: Settings<MySource> = {
  packages: [
    {
      name: "my-source-package"
    }
  ]
};
// -- No settings, only one namespace selected;
const settings2: Settings<MySource> = {
  packages: [
    {
      name: "my-source-package",
      namespaces: ["source"]
    }
  ]
};
// -- Settings;
const settings3: Settings<MySource> = {
  packages: [
    {
      name: "my-source-package",
      namespaces: ["source", "other"],
      settings: {
        source: {
          api: "1"
        }
      }
    }
  ]
};

test("Types are fine!", () => {});
