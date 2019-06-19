import WpSource from "../..";
import state from "../state";
import { routeUtils } from "../libraries";
import Api from "../libraries/api";

jest.mock("../libraries/api");

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
      isWpCom: () => false,
      subdirectory: "",
      homepage: "",
      postsPage: "",
      categoryBase: "",
      tagBase: ""
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
      api: new Api(),
      handlers: [],
      redirections: [],
      populate: jest.fn(),
      ...routeUtils
    }
  }
});

export default wpSource;
