import React from "react";
import { render } from "react-dom";
import clone from "clone-deep";
import { act, Simulate } from "react-dom/test-utils";
import { useConnect } from "frontity";
import useInfiniteScroll from "../../use-infinite-scroll";
import * as useArchiveInfiniteScroll from "../";

jest.mock("../../use-infinite-scroll", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("frontity", () => ({
  useConnect: jest.fn(),
  connect: jest.fn((fn) => fn),
  css: jest.fn(),
}));

const App = ({ options }: { options?: any }) => {
  useArchiveInfiniteScroll.default(options);
  return <div />;
};

const AppWithButton = ({ options }: { options?: any }) => {
  const { fetchNext } = useArchiveInfiniteScroll.default(options);
  return (
    <div>
      <button onClick={fetchNext}>Fetch Next</button>
    </div>
  );
};

let container: HTMLDivElement;

const spiedUseArchiveInfiniteScroll = jest.spyOn(
  useArchiveInfiniteScroll,
  "default"
);
const mockedUseInfiniteScroll = useInfiniteScroll as jest.MockedFunction<
  typeof useInfiniteScroll
>;
const mockedUseConnect = useConnect as jest.MockedFunction<typeof useConnect>;
const sourceGet = jest.fn();
const sourceFetch = jest.fn();
const routerUpdateState = jest.fn();

const browserState: { [key: string]: unknown; infiniteScroll?: unknown } = {
  someOtherPackage: {},
};
const initialStore = {
  state: {
    router: {
      link: "/",
      state: browserState,
    },
    source: {
      get: sourceGet,
    },
  },
  actions: {
    source: { fetch: sourceFetch },
    router: { updateState: routerUpdateState },
  },
};
let store = initialStore;

beforeEach(() => {
  store = clone(initialStore);
  container = document.createElement("div");
  container.id = "container";
  document.body.appendChild(container);
  mockedUseConnect.mockReturnValue(store);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
  spiedUseArchiveInfiniteScroll.mockClear();
  mockedUseInfiniteScroll.mockReset();
  mockedUseConnect.mockReset();
  sourceGet.mockReset();
  sourceFetch.mockReset();
  routerUpdateState.mockReset();
});

describe("useArchiveInfiniteScroll", () => {
  test("should update the browser state on mount (without existing state)", () => {
    sourceGet.mockReturnValue({
      link: "/",
      isReady: false,
      isFetching: false,
    });

    act(() => {
      render(<App />, container);
    });

    expect(spiedUseArchiveInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      someOtherPackage: {},
      infiniteScroll: {
        links: ["/"],
      },
    });
  });

  test("should update the browser state on mount (with existing state)", () => {
    store.state.router.state.infiniteScroll = {
      limit: 2,
      links: ["/", "/page/2/", "/page/3/"],
    };

    sourceGet.mockReturnValue({
      link: "/page/3/",
      isReady: false,
      isFetching: false,
    });

    act(() => {
      render(<App />, container);
    });

    expect(spiedUseArchiveInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      someOtherPackage: {},
      infiniteScroll: {
        limit: 2,
        links: ["/", "/page/2/", "/page/3/"],
      },
    });
  });

  test("should update the browser state on mount (with options)", () => {
    sourceGet.mockReturnValue({
      link: "/",
      isReady: false,
      isFetching: false,
    });

    act(() => {
      render(<App options={{ limit: 3 }} />, container);
    });

    expect(spiedUseArchiveInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      someOtherPackage: {},
      infiniteScroll: {
        limit: 3,
        links: ["/"],
      },
    });
  });

  test("should not update the browser state if `options.active` is false", () => {
    sourceGet.mockReturnValue({
      link: "/",
      isReady: false,
      isFetching: false,
    });

    act(() => {
      render(<App options={{ active: false }} />, container);
    });

    expect(spiedUseArchiveInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).not.toHaveBeenCalled();
  });

  test("should return the right object", () => {
    store.state.router.link = "/page/2/";
    store.state.router.state.infiniteScroll = {
      links: ["/", "/page/2/", "/page/3/"],
    };

    sourceGet.mockReturnValue({
      link: "/page/3/",
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<App />, container);
    });

    expect(spiedUseArchiveInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUseArchiveInfiniteScroll).toHaveReturnedWith({
      pages: [
        {
          key: "/",
          link: "/",
          isLast: false,
          Wrapper: expect.any(Function),
        },
        {
          key: "/page/2/",
          link: "/page/2/",
          isLast: false,
          Wrapper: expect.any(Function),
        },
        {
          key: "/page/3/",
          link: "/page/3/",
          isLast: true,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: false,
      isError: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isLast` false when the last page is not ready", () => {
    store.state.router.link = "/page/2/";
    store.state.router.state.infiniteScroll = {
      links: ["/", "/page/2/", "/page/3/"],
    };

    sourceGet.mockReturnValue({
      link: "/page/3/",
      isReady: false,
      isFetching: false,
    });

    act(() => {
      render(<App />, container);
    });

    expect(spiedUseArchiveInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUseArchiveInfiniteScroll).toHaveReturnedWith({
      pages: [
        {
          key: "/",
          link: "/",
          isLast: false,
          Wrapper: expect.any(Function),
        },
        {
          key: "/page/2/",
          link: "/page/2/",
          isLast: true,
          Wrapper: expect.any(Function),
        },
        {
          key: "/page/3/",
          link: "/page/3/",
          isLast: false,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: false,
      isError: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isLimit` true when limit has been reached, there is next page, and it's not being fetched", () => {
    store.state.router.state.infiniteScroll = { links: ["/"] };

    sourceGet.mockReturnValue({
      link: "/",
      next: "/page/2/",
      isArchive: true,
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<App options={{ limit: 1 }} />, container);
    });

    expect(spiedUseArchiveInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUseArchiveInfiniteScroll).toHaveReturnedWith({
      pages: [
        {
          key: "/",
          link: "/",
          isLast: true,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: true,
      isFetching: false,
      isError: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isLimit` false and `isFetching` true when limit has been reached, there is next page but is already being fetched", () => {
    store.state.router.state.infiniteScroll = { links: ["/", "/page/2/"] };

    sourceGet.mockReturnValue({
      link: "/page/2/",
      next: "/page/3/",
      isArchive: true,
      isReady: false,
      isFetching: true,
    });

    act(() => {
      render(<App options={{ limit: 1 }} />, container);
    });

    expect(spiedUseArchiveInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUseArchiveInfiniteScroll).toHaveReturnedWith({
      pages: [
        {
          key: "/",
          link: "/",
          isLast: true,
          Wrapper: expect.any(Function),
        },
        {
          key: "/page/2/",
          link: "/page/2/",
          isLast: false,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: true,
      isError: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isLimit` false when limit has been reached but there isn't a next page", () => {
    sourceGet.mockReturnValue({
      link: "/",
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<App options={{ limit: 1 }} />, container);
    });

    expect(spiedUseArchiveInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUseArchiveInfiniteScroll).toHaveReturnedWith({
      pages: [
        {
          key: "/",
          link: "/",
          isLast: true,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: false,
      isError: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isLimit` false when the limit has not been reached", () => {
    sourceGet.mockReturnValue({
      link: "/",
      next: "/page/2/",
      isArchive: true,
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<App options={{ limit: 3 }} />, container);
    });

    expect(spiedUseArchiveInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUseArchiveInfiniteScroll).toHaveReturnedWith({
      pages: [
        {
          key: "/",
          link: "/",
          isLast: true,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: false,
      isError: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isError` true when current page is unavailable", () => {
    store.state.router.state.infiniteScroll = { links: ["/", "/page/2/"] };

    sourceGet.mockReturnValue({
      isReady: true,
      isError: true,
      isFetching: false,
    });

    act(() => {
      render(<App />, container);
    });

    expect(spiedUseArchiveInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUseArchiveInfiniteScroll).toHaveReturnedWith({
      pages: [
        {
          key: "/",
          link: "/",
          isLast: true,
          Wrapper: expect.any(Function),
        },
        {
          key: "/page/2/",
          link: "/page/2/",
          isLast: false,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: false,
      isError: true,
      fetchNext: expect.any(Function),
    });
  });

  test("`fetchNext` should fetch next page if it's not ready and not fetching", () => {
    sourceGet.mockReturnValue({
      link: "/",
      next: "/page/2/",
      isArchive: true,
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<AppWithButton options={{ limit: 1 }} />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockReturnValue({
      link: "/page/2/",
      isReady: false,
      isFetching: false,
    });

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      someOtherPackage: {},
      infiniteScroll: {
        links: ["/", "/page/2/"],
      },
    });
    expect(sourceFetch).toHaveBeenCalledTimes(1);
    expect(sourceFetch).toHaveBeenCalledWith("/page/2/");
  });

  test("`fetchNext` should not fetch next page if it's ready", () => {
    sourceGet.mockReturnValue({
      link: "/",
      next: "/page/2/",
      isArchive: true,
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<AppWithButton options={{ limit: 1 }} />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockReturnValue({
      link: "/page/2/",
      isReady: true,
      isFetching: false,
    });

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      someOtherPackage: {},
      infiniteScroll: {
        links: ["/", "/page/2/"],
      },
    });
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("`fetchNext` should not fetch next page if it's fetching", () => {
    sourceGet.mockReturnValue({
      link: "/",
      next: "/page/2/",
      isArchive: true,
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<AppWithButton options={{ limit: 1 }} />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockReturnValue({
      link: "/page/2/",
      isReady: false,
      isFetching: true,
    });

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      someOtherPackage: {},
      infiniteScroll: {
        links: ["/", "/page/2/"],
      },
    });
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("`fetchNext` should do nothing if there isn't next page", () => {
    sourceGet.mockReturnValue({
      link: "/",
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<AppWithButton options={{ limit: 1 }} />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockReturnValue({
      link: "/page/2/",
      isReady: false,
      isFetching: false,
    });

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).not.toHaveBeenCalled();
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("`fetchNext` should do nothing if the next page is already in the links", () => {
    store.state.router.state.infiniteScroll = {
      links: ["/page/2/", "/"],
    };

    sourceGet.mockReturnValue({
      link: "/",
      next: "/page/2/",
      isArchive: true,
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<AppWithButton options={{ limit: 1 }} />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockReturnValue({
      link: "/page/2/",
      isReady: false,
      isFetching: false,
    });

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).not.toHaveBeenCalled();
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("`fetchNext` should do nothing if `options.active` is false", () => {
    store.state.router.link = "/page-one/";

    sourceGet.mockReturnValue({
      link: "/page-one/",
      next: "/page-two/",
      isArchive: true,
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<AppWithButton options={{ active: false }} />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockReturnValue({
      link: "/page-two/",
      isReady: false,
      isFetching: false,
    });

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).not.toHaveBeenCalled();
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("`fetchNext` should request the last page if `isError` is true", () => {
    store.state.router.link = "/page-one/";

    sourceGet.mockReturnValue({
      isReady: true,
      isFetching: false,
      isError: true,
    });

    act(() => {
      render(<AppWithButton />, container);
    });

    routerUpdateState.mockClear();

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).not.toHaveBeenCalled();
    expect(sourceFetch).toHaveBeenCalledTimes(1);
    expect(sourceFetch).toHaveBeenCalledWith("/page-one/", { force: true });
  });
});

describe("Wrapper", () => {
  test("should return children if IntersectionObserver is not supported", () => {
    const Wrapper = useArchiveInfiniteScroll.wrapperGenerator({ link: "/" });

    sourceGet.mockReturnValue({
      isReady: true,
    });

    mockedUseInfiniteScroll.mockReturnValue({ supported: false });

    act(() => {
      render(
        <Wrapper key="fake-key">
          <div id="children" />
        </Wrapper>,
        container
      );
    });

    expect(mockedUseInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  test("should return null if the current element is not ready", () => {
    const Wrapper = useArchiveInfiniteScroll.wrapperGenerator({ link: "/" });

    sourceGet.mockReturnValue({
      isReady: false,
    });

    mockedUseInfiniteScroll.mockReturnValue({ supported: false });

    act(() => {
      render(
        <Wrapper key="fake-key">
          <div id="children" />
        </Wrapper>,
        container
      );
    });

    expect(mockedUseInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  test("should return children inside a wrapper", () => {
    store.state.router.state.infiniteScroll = { limit: 1 };
    const Wrapper = useArchiveInfiniteScroll.wrapperGenerator({ link: "/" });

    sourceGet.mockReturnValue({ isReady: true });

    mockedUseInfiniteScroll.mockReturnValue({
      supported: true,
      fetchRef: jest.fn(),
      routeRef: jest.fn(),
    } as any);

    act(() => {
      render(
        <Wrapper key="fake-key">
          <div id="children" />
        </Wrapper>,
        container
      );
    });

    expect(mockedUseInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  test("should return children and fetcher inside a wrapper", () => {
    const Wrapper = useArchiveInfiniteScroll.wrapperGenerator({ link: "/" });

    sourceGet.mockReturnValue({ isReady: true });

    mockedUseInfiniteScroll.mockReturnValue({
      supported: true,
      fetchRef: jest.fn(),
      routeRef: jest.fn(),
    } as any);

    act(() => {
      render(
        <Wrapper key="fake-key">
          <div id="children" />
        </Wrapper>,
        container
      );
    });

    expect(mockedUseInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  test("should call `useInfiniteScroll` with `currentLink` and `nextLink`", () => {
    const Wrapper = useArchiveInfiniteScroll.wrapperGenerator({ link: "/" });

    const firstData = {
      next: "/page/2/",
      isArchive: true,
      isReady: true,
    };
    const secondData = {
      link: "/page/2/",
      isReady: false,
    };

    sourceGet
      // The first state.source.get() of the ArchiveWrapper, which needs it to
      // check if there is a next page.
      .mockReturnValueOnce(firstData)
      // The second state.source.get() of the ArchiveWrapper, which needs it to
      // get the link of the next page.
      .mockReturnValueOnce(secondData)
      // The state.source.get() of the InternalWrapper, which needs it to see if
      // the current link is ready or is an error.
      .mockReturnValueOnce(firstData);

    mockedUseInfiniteScroll.mockReturnValue({
      supported: true,
      fetchRef: jest.fn(),
      routeRef: jest.fn(),
    } as any);

    act(() => {
      render(
        <Wrapper key="fake-key">
          <div id="children" />
        </Wrapper>,
        container
      );
    });

    expect(mockedUseInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(mockedUseInfiniteScroll).toHaveBeenCalledWith({
      currentLink: "/",
      nextLink: "/page/2/",
    });
  });
});
