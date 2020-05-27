import React from "react";
import { render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { useConnect } from "frontity";
import useInfiniteScroll from "../use-infinite-scroll";
import * as useArchiveInfiniteScroll from "../use-archive-infinite-scroll";

jest.mock("../use-infinite-scroll", () => ({
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

beforeEach(() => {
  container = document.createElement("div");
  container.id = "container";
  document.body.appendChild(container);
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
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {},
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
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
      infiniteScroll: {
        links: ["/"],
      },
    });
  });

  test("should update the browser state on mount (with existing state)", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {
            infiniteScroll: {
              limit: 2,
              links: ["/", "/page/2/", "/page/3/"],
            },
          },
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
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
      infiniteScroll: {
        limit: 2,
        links: ["/", "/page/2/", "/page/3/"],
      },
    });
  });

  test("should update the browser state on mount (with options)", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {},
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
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
      infiniteScroll: {
        limit: 3,
        links: ["/"],
      },
    });
  });

  test("should return the right object (without existing state)", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {},
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
      link: "/",
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
          isLastPage: true,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return the right object (with existing state)", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/page/2/",
          state: {
            infiniteScroll: {
              links: ["/", "/page/2/", "/page/3/"],
            },
          },
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
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
          isLastPage: false,
          Wrapper: expect.any(Function),
        },
        {
          key: "/page/2/",
          link: "/page/2/",
          isLastPage: false,
          Wrapper: expect.any(Function),
        },
        {
          key: "/page/3/",
          link: "/page/3/",
          isLastPage: true,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isLastPage` false when the last page is not ready", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/page/2/",
          state: {
            infiniteScroll: {
              links: ["/", "/page/2/", "/page/3/"],
            },
          },
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
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
          isLastPage: false,
          Wrapper: expect.any(Function),
        },
        {
          key: "/page/2/",
          link: "/page/2/",
          isLastPage: true,
          Wrapper: expect.any(Function),
        },
        {
          key: "/page/3/",
          link: "/page/3/",
          isLastPage: false,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isLimit` true when limit has been reached, there is next page, and it's not being fetched", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {
            infiniteScroll: {
              links: ["/"],
            },
          },
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
      link: "/",
      next: "/page/2/",
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
          isLastPage: true,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: true,
      isFetching: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isLimit` false and `isFetching` true when limit has been reached, there is next page but is already being fetched", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {
            infiniteScroll: {
              links: ["/", "/page/2/"],
            },
          },
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
      link: "/page/2/",
      next: "/page/3/",
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
          isLastPage: true,
          Wrapper: expect.any(Function),
        },
        {
          key: "/page/2/",
          link: "/page/2/",
          isLastPage: false,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: true,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isLimit` false when limit has been reached but there isn't a next page", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {},
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
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
          isLastPage: true,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isLimit` false when the limit has not been reached", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {},
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
      link: "/",
      next: "/page/2/",
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
          isLastPage: true,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: false,
      fetchNext: expect.any(Function),
    });
  });

  test("`fetchNext` should fetch next page if it's not ready and not fetching", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {},
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        source: { fetch: sourceFetch },
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
      link: "/",
      next: "/page/2/",
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<AppWithButton options={{ limit: 1 }} />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockReturnValueOnce({
      link: "/page/2/",
      isReady: false,
      isFetching: false,
    });

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: {
        links: ["/", "/page/2/"],
      },
    });
    expect(sourceFetch).toHaveBeenCalledTimes(1);
    expect(sourceFetch).toHaveBeenCalledWith("/page/2/");
  });

  test("`fetchNext` should not fetch next page if it's ready", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {},
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        source: { fetch: sourceFetch },
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
      link: "/",
      next: "/page/2/",
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<AppWithButton options={{ limit: 1 }} />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockReturnValueOnce({
      link: "/page/2/",
      isReady: true,
      isFetching: false,
    });

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: {
        links: ["/", "/page/2/"],
      },
    });
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("`fetchNext` should not fetch next page if it's fetching", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {},
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        source: { fetch: sourceFetch },
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
      link: "/",
      next: "/page/2/",
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<AppWithButton options={{ limit: 1 }} />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockReturnValueOnce({
      link: "/page/2/",
      isReady: false,
      isFetching: true,
    });

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: {
        links: ["/", "/page/2/"],
      },
    });
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("`fetchNext` should do nothing if there isn't next page", () => {
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {},
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        source: { fetch: sourceFetch },
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
      link: "/",
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<AppWithButton options={{ limit: 1 }} />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockReturnValueOnce({
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
    mockedUseConnect.mockReturnValue({
      state: {
        router: {
          link: "/",
          state: {
            infiniteScroll: { links: ["/page/2/", "/"] },
          },
        },
        source: {
          get: sourceGet,
        },
      },
      actions: {
        source: { fetch: sourceFetch },
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockReturnValueOnce({
      link: "/",
      next: "/page/2/",
      isReady: true,
      isFetching: false,
    });

    act(() => {
      render(<AppWithButton options={{ limit: 1 }} />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockReturnValueOnce({
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
});

describe("Wrapper", () => {
  test("should return children if IntersectionObserver is not supported", () => {
    const Wrapper = useArchiveInfiniteScroll.Wrapper("/") as any;

    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: {
          get: sourceGet,
        },
        router: { state: {} },
      },
      actions: {},
    });

    sourceGet.mockReturnValueOnce({
      isReady: true,
    });

    mockedUseInfiniteScroll.mockReturnValue({ supported: false });

    act(() => {
      render(
        <Wrapper>
          <div id="children" />
        </Wrapper>,
        container
      );
    });

    expect(mockedUseInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  test("should return null if the current element is not ready", () => {
    const Wrapper = useArchiveInfiniteScroll.Wrapper("/") as any;

    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: {
          get: sourceGet,
        },
        router: { state: {} },
      },
      actions: {},
    });

    sourceGet.mockReturnValueOnce({
      isReady: false,
    });

    mockedUseInfiniteScroll.mockReturnValue({ supported: false });

    act(() => {
      render(
        <Wrapper>
          <div id="children" />
        </Wrapper>,
        container
      );
    });

    expect(mockedUseInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  test("should return children inside a wrapper", () => {
    const Wrapper = useArchiveInfiniteScroll.Wrapper("/") as any;

    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: {
          get: sourceGet,
        },
        router: { state: { infiniteScroll: { limit: 1 } } },
      },
      actions: {},
    });

    sourceGet.mockReturnValueOnce({
      isReady: true,
    });

    mockedUseInfiniteScroll.mockReturnValue({
      supported: true,
      fetchRef: () => {},
      routeRef: () => {},
    } as any);

    act(() => {
      render(
        <Wrapper>
          <div id="children" />
        </Wrapper>,
        container
      );
    });

    expect(mockedUseInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  test("should return children and fetcher inside a wrapper", () => {
    const Wrapper = useArchiveInfiniteScroll.Wrapper("/") as any;

    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: {
          get: sourceGet,
        },
        router: { state: {} },
      },
      actions: {},
    });

    sourceGet.mockReturnValueOnce({
      isReady: true,
    });

    mockedUseInfiniteScroll.mockReturnValue({
      supported: true,
      fetchRef: () => {},
      routeRef: () => {},
    } as any);

    act(() => {
      render(
        <Wrapper>
          <div id="children" />
        </Wrapper>,
        container
      );
    });

    expect(mockedUseInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  test("should call `useInfiniteScroll` with `currentLink` and `nextLink`", () => {
    const Wrapper = useArchiveInfiniteScroll.Wrapper("/") as any;

    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: {
          get: sourceGet,
        },
        router: { state: {} },
      },
      actions: {},
    });

    sourceGet
      .mockReturnValueOnce({
        next: "/page/2/",
        isReady: true,
      })
      .mockReturnValueOnce({
        link: "/page/2/",
        isReady: false,
      });

    mockedUseInfiniteScroll.mockReturnValue({
      supported: true,
      fetchRef: () => {},
      routeRef: () => {},
    } as any);

    act(() => {
      render(
        <Wrapper>
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
