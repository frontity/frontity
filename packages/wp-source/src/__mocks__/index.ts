import WpSource from "../..";
import state from "../state";
import { routeUtils } from "../libraries";

const wpSource = (): WpSource => ({
  name: "@frontity/wp-source",
  state: {
    source: {
      get: state.get,
      data: {},
      category: {},
      tag: {},
      post: {},
      page: {},
      author: {},
      attachment: {},
      api: "https://test.frontity.io",
      isWPCom: false
    }
  },
  actions: {
    source: {
      fetch: jest.fn(),
      init: jest.fn()
    }
  },
  libraries: {
    source: {
      resolver: {
        registered: [],
        init: jest.fn(),
        add: jest.fn(),
        match: jest.fn()
      },
      api: {
        api: "https://test.frontity.io",
        isWPCom: false,
        init: jest.fn(),
        getIdBySlug: jest.fn(),
        get: jest.fn()
      },
      populate: jest.fn(),
      ...routeUtils
    }
  }
});

export default wpSource;
