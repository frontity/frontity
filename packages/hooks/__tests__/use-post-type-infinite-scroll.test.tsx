import React from "react";
import { render } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { useConnect } from "frontity";
import useInfiniteScroll from "../use-infinite-scroll";
import * as usePostTypeInfiniteScroll from "../use-post-type-infinite-scroll";

jest.mock("../use-infinite-scroll", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("frontity", () => ({
  useConnect: jest.fn(),
  connect: jest.fn((fn) => fn),
  css: jest.fn(),
}));

const spiedUsePostTypeInfiniteScroll = jest.spyOn(
  usePostTypeInfiniteScroll,
  "default"
);
const mockedUseInfiniteScroll = useInfiniteScroll as jest.MockedFunction<
  typeof useInfiniteScroll
>;
const mockedUseConnect = useConnect as jest.MockedFunction<typeof useConnect>;
const sourceGet = jest.fn();
const sourceFetch = jest.fn();
const routerUpdateState = jest.fn();

const App = ({ options }: { options?: any }) => {
  usePostTypeInfiniteScroll.default(options);
  return <div />;
};

const AppWithButton = ({ options }: { options?: any }) => {
  const { fetchNext } = usePostTypeInfiniteScroll.default(options);
  return (
    <div>
      <button onClick={fetchNext}>Fetch Next</button>
    </div>
  );
};

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  container.id = "container";
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
  spiedUsePostTypeInfiniteScroll.mockClear();
  mockedUseInfiniteScroll.mockReset();
  mockedUseConnect.mockReset();
  sourceGet.mockReset();
  sourceFetch.mockReset();
  routerUpdateState.mockReset();
});

describe("usePostTypeInfiniteScroll", () => {
  test("should update the browser state on mount (whithout existing state)", () => {
    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: { get: sourceGet },
        router: { link: "/post-one/", state: {} },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: {
        archive: "/",
        pages: ["/"],
        links: ["/post-one/"],
      },
    });
  });

  test("should update the browser state on mount (with existing state)", () => {
    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: { get: sourceGet },
        router: {
          link: "/post-one/",
          state: {
            someOtherPackage: {},
            infiniteScroll: {
              limit: 3,
              archive: "/",
              links: ["/post-one/"],
              pages: ["/"],
            },
          },
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      someOtherPackage: {},
      infiniteScroll: {
        limit: 3,
        archive: "/",
        pages: ["/"],
        links: ["/post-one/"],
      },
    });
  });

  test("should update the browser state with `limit` options", () => {
    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: { get: sourceGet },
        router: {
          link: "/post-one/",
          state: {},
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
    }));

    act(() => {
      render(<App options={{ limit: 1 }} />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: {
        limit: 1,
        archive: "/",
        pages: ["/"],
        links: ["/post-one/"],
      },
    });
  });

  test("should update the browser state with `archive` set to the value in `options.archive`", () => {
    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: { get: sourceGet },
        router: {
          link: "/post-one/",
          state: {
            infiniteScroll: {
              archive: "/initial-archive/",
            },
          },
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
      isArchive: link.includes("archive"),
      items: link.includes("archive")
        ? [{ link: "/post-one/" }, { link: "/post-two/" }]
        : undefined,
    }));

    act(() => {
      render(<App options={{ archive: "@options-archive" }} />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: {
        archive: "@options-archive",
        pages: ["@options-archive"],
        links: ["/post-one/"],
      },
    });
  });

  test("should update the browser state with `archive` set to the value already in state", () => {
    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: { get: sourceGet },
        router: {
          link: "/post-one/",
          state: {
            infiniteScroll: {
              archive: "/initial-archive/",
            },
          },
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
      isArchive: link.includes("archive"),
      items: link.includes("archive")
        ? [{ link: "/post-one/" }, { link: "/post-two/" }]
        : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: {
        archive: "/initial-archive/",
        pages: ["/initial-archive/"],
        links: ["/post-one/"],
      },
    });
  });

  test("should update the browser state with `archive` set to the value in `state.router.previous` if that's an archive", () => {
    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: { get: sourceGet },
        router: {
          link: "/post-one/",
          previous: "/previous-archive/",
          state: {},
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
      isArchive: link.includes("archive"),
      items: link.includes("archive")
        ? [{ link: "/post-one/" }, { link: "/post-two/" }]
        : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: {
        archive: "/previous-archive/",
        pages: ["/previous-archive/"],
        links: ["/post-one/"],
      },
    });
  });

  test('should update the browser state with `archive` set to "/" if the value in `state.router.previous` is not an archive', () => {
    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: { get: sourceGet },
        router: {
          link: "/post-one/",
          previous: "/previous-archive/",
          state: {},
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: {
        archive: "/",
        pages: ["/"],
        links: ["/post-one/"],
      },
    });
  });

  test("should update the browser state with `archive` set to the value in `options.fallback`", () => {
    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: { get: sourceGet },
        router: {
          link: "/post-one/",
          state: {},
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
    }));

    act(() => {
      render(<App options={{ fallback: "@fallback-archive" }} />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: {
        archive: "@fallback-archive",
        pages: ["@fallback-archive"],
        links: ["/post-one/"],
      },
    });
  });

  test('should update the browser state with `archive` set to "/"', () => {
    mockedUseConnect.mockReturnValueOnce({
      state: {
        source: { get: sourceGet },
        router: {
          link: "/post-one/",
          state: {},
        },
      },
      actions: {
        router: { updateState: routerUpdateState },
      },
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      infiniteScroll: {
        archive: "/",
        pages: ["/"],
        links: ["/post-one/"],
      },
    });
  });
});

describe("Wrapper", () => {
  test.todo("should return children if IntersectionObserver is not supported");
});
