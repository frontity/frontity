import { Action, Settings } from "../../../types/src";
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
  name: "my-source-package";
  state: {
    source: Source["state"]["source"] & {
      // And other props.
      api: string;
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
      api: "https://site.com/api",
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
      name: "my-source-package"
    }
  ]
};
// -- Settings;
const settings3: Settings<MySource> = {
  packages: [
    {
      name: "my-source-package",
      state: {
        source: {
          api: "1"
        }
      }
    }
  ]
};

test("Types are fine!", () => {});
