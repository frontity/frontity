import React from "react";
import { render } from "react-dom";
import clone from "clone-deep";
import { act } from "react-dom/test-utils";
import { useConnect } from "frontity";
import useInView from "../../use-in-view";
import * as useInfiniteScroll from "../../use-infinite-scroll";

jest.mock("../../use-in-view", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("frontity", () => ({
  useConnect: jest.fn(),
}));

const App = ({
  currentLink,
  nextLink = undefined,
  fetchInViewOptions = undefined,
  routeInViewOptions = undefined,
}) => {
  useInfiniteScroll.default({
    currentLink,
    nextLink,
    fetchInViewOptions,
    routeInViewOptions,
  });
  return <div />;
};

let container: HTMLDivElement;

const spiedUseInfiniteScroll = jest.spyOn(useInfiniteScroll, "default");
const mockedUseInView = useInView as jest.MockedFunction<typeof useInView>;
const mockedUseConnect = useConnect as jest.MockedFunction<typeof useConnect>;
const sourceGet = jest.fn();
const sourceFetch = jest.fn();
const routerSet = jest.fn();
const routerUpdateState = jest.fn();

const browserState: { [key: string]: unknown; infiniteScroll?: unknown } = {
  someOtherPackage: {},
};
const initialStore = {
  state: {
    source: { get: sourceGet },
    router: { link: "/", state: browserState },
  },
  actions: {
    source: { fetch: sourceFetch },
    router: { set: routerSet, updateState: routerUpdateState },
  },
};
let store = initialStore;

beforeEach(() => {
  store = clone(initialStore);
  container = document.createElement("div");
  document.body.appendChild(container);
  mockedUseConnect.mockReturnValue(store);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
  spiedUseInfiniteScroll.mockClear();
  mockedUseInView.mockReset();
  mockedUseConnect.mockReset();
  sourceGet.mockReset();
  sourceFetch.mockReset();
  routerSet.mockReset();
  routerUpdateState.mockReset();
});

describe("useInfiniteScroll", () => {
  test("should return supported false if IntersectionObserver is not supported.", () => {
    mockedUseInView.mockReturnValue({
      ref: undefined,
      inView: true,
      supported: false,
    });

    act(() => {
      render(<App currentLink="/" nextLink="/page/2" />, container);
    });

    expect(spiedUseInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(mockedUseInView).toHaveBeenCalledTimes(2);
    expect(spiedUseInfiniteScroll).toHaveReturnedWith({ supported: false });
  });

  test("should use default values for `fetchInViewOptions` and `routeInViewOptions`", () => {
    mockedUseInView.mockReturnValue({
      ref: undefined,
      inView: true,
      supported: false,
    });

    act(() => {
      render(<App currentLink="/" nextLink="/page/2" />, container);
    });

    expect(mockedUseInView).toHaveBeenCalledTimes(2);
    expect(mockedUseInView).toHaveBeenNthCalledWith(1, {
      rootMargin: "400px 0px",
      triggerOnce: true,
    });
    expect(mockedUseInView).toHaveBeenNthCalledWith(2, {
      rootMargin: "-80% 0% -19.9999% 0%",
    });
  });

  test("should use `fetchInViewOptions` if passed as parameter", () => {
    mockedUseInView.mockReturnValue({
      ref: undefined,
      inView: true,
      supported: false,
    });

    const fetchInViewOptions = {
      rootMargin: "200px",
      triggetOnce: false,
    };

    act(() => {
      render(
        <App
          currentLink="/"
          nextLink="/page/2"
          fetchInViewOptions={fetchInViewOptions}
        />,
        container
      );
    });

    expect(mockedUseInView).toHaveBeenCalledTimes(2);
    expect(mockedUseInView).toHaveBeenNthCalledWith(1, fetchInViewOptions);
  });

  test("should use `routeInViewOptions` if passed as parameter", () => {
    mockedUseInView.mockReturnValue({
      ref: undefined,
      inView: true,
      supported: false,
    });

    const routeInViewOptions = {
      rootMargin: "-50% 0% -49.9999% 0%",
    };

    act(() => {
      render(
        <App
          currentLink="/"
          nextLink="/page/2"
          routeInViewOptions={routeInViewOptions}
        />,
        container
      );
    });

    expect(mockedUseInView).toHaveBeenCalledTimes(2);
    expect(mockedUseInView).toHaveBeenNthCalledWith(2, routeInViewOptions);
  });

  test("should fetch the current link if not ready/fetching on mount", () => {
    mockedUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
      supported: true,
    });

    sourceGet.mockReturnValue({
      isReady: false,
      isFetching: false,
    });

    act(() => {
      render(<App currentLink="/" />, container);
    });

    expect(sourceGet).toHaveBeenCalledWith("/");
    expect(sourceFetch).toHaveBeenCalledWith("/");
  });

  test("should not fetch if `nextLink` is undefined", () => {
    mockedUseInView
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: true,
        supported: true,
      })
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: false,
        supported: true,
      });

    sourceGet.mockReturnValue({
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<App currentLink="/" />, container);
    });

    expect(sourceGet).toHaveBeenCalledTimes(1);
    expect(sourceGet).toHaveBeenCalledWith("/");
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("should fetch `nextLink` if first reference is in view", () => {
    mockedUseInView
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: true,
        supported: true,
      })
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: false,
        supported: true,
      });

    sourceGet
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
        link: "/",
      })
      .mockReturnValueOnce({
        isReady: false,
        isFetching: false,
        link: "/page/2/",
      });

    act(() => {
      render(<App currentLink="/" nextLink="/page/2/" />, container);
    });

    expect(sourceGet).toHaveBeenCalledTimes(2);
    expect(sourceGet).toHaveBeenNthCalledWith(1, "/");
    expect(sourceGet).toHaveBeenNthCalledWith(2, "/page/2/");
    expect(sourceFetch).toHaveBeenCalledWith("/page/2/");
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: { links: ["/"] },
      someOtherPackage: {},
    });
  });

  test("should update browser state if first reference is in view and it's ready", () => {
    mockedUseInView
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: true,
        supported: true,
      })
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: false,
        supported: true,
      });

    sourceGet
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
        link: "/",
      })
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
        link: "/page/2/",
      });

    act(() => {
      render(<App currentLink="/" nextLink="/page/2/" />, container);
    });

    expect(sourceGet).toHaveBeenCalledTimes(2);
    expect(sourceGet).toHaveBeenNthCalledWith(1, "/");
    expect(sourceGet).toHaveBeenNthCalledWith(2, "/page/2/");
    expect(routerUpdateState).toHaveBeenCalledWith({
      someOtherPackage: {},
      infiniteScroll: { links: ["/", "/page/2/"] },
    });
  });

  test("should not fetch `nextLink` nor update browser state if `nextLink` is already in links", () => {
    store.state.router.state.infiniteScroll = {
      links: ["/post-3/", "/post-1/", "/post-2/"],
    };

    mockedUseInView
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: true,
        supported: true,
      })
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: false,
        supported: true,
      });

    sourceGet
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
        link: "/post-2/",
      })
      .mockReturnValueOnce({
        isReady: false,
        isFetching: false,
        link: "/post-3/",
      });

    act(() => {
      render(<App currentLink="/post-2/" nextLink="/post-3/" />, container);
    });

    expect(sourceFetch).not.toHaveBeenCalled();
    expect(routerUpdateState).not.toHaveBeenCalled();
  });

  test("should not fetch `nextLink` if it's already fetching", () => {
    mockedUseInView
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: true,
        supported: true,
      })
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: false,
        supported: true,
      });

    sourceGet
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
        link: "/",
      })
      .mockReturnValueOnce({
        isReady: false,
        isFetching: true,
        link: "/page/2/",
      });

    act(() => {
      render(<App currentLink="/" nextLink="/page/2/" />, container);
    });

    expect(sourceFetch).not.toHaveBeenCalled();
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: { links: ["/"] },
      someOtherPackage: {},
    });
  });

  test("should not fetch `nextLink` if it's already ready", () => {
    store.state.router.state.infiniteScroll = { links: ["/"] };

    mockedUseInView
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: true,
        supported: true,
      })
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: false,
        supported: true,
      });

    sourceGet
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
        link: "/",
      })
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
        link: "/page/2/",
      });

    act(() => {
      render(<App currentLink="/" nextLink="/page/2/" />, container);
    });

    expect(sourceFetch).not.toHaveBeenCalled();
    expect(routerUpdateState).toHaveBeenCalledWith({
      someOtherPackage: {},
      infiniteScroll: { links: ["/", "/page/2/"] },
    });
  });

  test("should change route if second reference is in view", () => {
    store.state.router.link = "/page/2/";
    store.state.router.state.infiniteScroll = { links: ["/", "/page/2/"] };

    mockedUseInView
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: false,
        supported: true,
      })
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: true,
        supported: true,
      });

    sourceGet
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
      })
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
      });

    act(() => {
      render(<App currentLink="/" nextLink="/page/2/" />, container);
    });

    expect(routerSet).toHaveBeenCalledTimes(1);
    expect(routerSet).toHaveBeenCalledWith("/", {
      method: "replace",
      state: {
        someOtherPackage: {},
        infiniteScroll: { links: ["/", "/page/2/"] },
      },
    });
  });

  test("should not change route if `currentLink` is equal to the current url", () => {
    store.state.router.link = "/";
    store.state.router.state.infiniteScroll = { links: ["/", "/page/2/"] };

    mockedUseInView
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: false,
        supported: true,
      })
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: true,
        supported: true,
      });

    sourceGet
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
      })
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
      });

    act(() => {
      render(<App currentLink="/" nextLink="/page/2/" />, container);
    });

    expect(routerSet).not.toHaveBeenCalled();
  });

  test("should return the right object if `IntersectionObserver` is supported", () => {
    mockedUseInView
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: false,
        supported: true,
      })
      .mockReturnValueOnce({
        ref: jest.fn(),
        inView: false,
        supported: true,
      });

    sourceGet
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
      })
      .mockReturnValueOnce({
        isReady: true,
        isFetching: false,
      });

    act(() => {
      render(<App currentLink="/" nextLink="/page/2/" />, container);
    });

    expect(spiedUseInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUseInfiniteScroll).toHaveReturnedWith({
      supported: true,
      routeRef: expect.any(Function),
      fetchRef: expect.any(Function),
      routeInView: false,
      fetchInView: false,
    });
  });
});
