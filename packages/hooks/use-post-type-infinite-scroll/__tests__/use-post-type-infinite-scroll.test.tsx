import React from "react";
import { render } from "react-dom";
import clone from "clone-deep";
import { act, Simulate } from "react-dom/test-utils";
import { useConnect } from "frontity";
import useInfiniteScroll from "../../use-infinite-scroll";
import * as usePostTypeInfiniteScroll from "../";

jest.mock("../../use-infinite-scroll", () => ({
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

const browserState: { [key: string]: unknown; infiniteScroll?: unknown } = {
  someOtherPackage: {},
};
const initialStore = {
  state: {
    router: {
      link: "/post-one/",
      previous: null,
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
  spiedUsePostTypeInfiniteScroll.mockClear();
  mockedUseInfiniteScroll.mockReset();
  mockedUseConnect.mockReset();
  sourceGet.mockReset();
  sourceFetch.mockReset();
  routerUpdateState.mockReset();
});

describe("usePostTypeInfiniteScroll", () => {
  test("should update the browser state on mount (whithout existing state)", () => {
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
      someOtherPackage: {},
    });
  });

  test("should update the browser state on mount (with existing state)", () => {
    store.state.router.state.infiniteScroll = {
      limit: 3,
      archive: "/",
      links: ["/post-one/"],
      pages: ["/"],
    };

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
      someOtherPackage: {},
      infiniteScroll: {
        limit: 1,
        archive: "/",
        pages: ["/"],
        links: ["/post-one/"],
      },
    });
  });

  test("should update the browser state with `archive` set to the value in `options.archive`", () => {
    store.state.router.state.infiniteScroll = {
      archive: "/initial-archive/",
    };

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
      someOtherPackage: {},
      infiniteScroll: {
        archive: "@options-archive",
        pages: ["@options-archive"],
        links: ["/post-one/"],
      },
    });
  });

  test("should update the browser state with `archive` set to the value already in state", () => {
    store.state.router.state.infiniteScroll = {
      archive: "/initial-archive/",
    };

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
      someOtherPackage: {},
      infiniteScroll: {
        archive: "/initial-archive/",
        pages: ["/initial-archive/"],
        links: ["/post-one/"],
      },
    });
  });

  test("should update the browser state with `archive` set to the value in `state.router.previous` if that's an archive", () => {
    store.state.router.previous = "/previous-archive/";

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
      someOtherPackage: {},
      infiniteScroll: {
        archive: "/previous-archive/",
        pages: ["/previous-archive/"],
        links: ["/post-one/"],
      },
    });
  });

  test('should update the browser state with `archive` set to "/" if the value in `state.router.previous` is not an archive', () => {
    store.state.router.previous = "/previous-archive/";

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
        archive: "/",
        pages: ["/"],
        links: ["/post-one/"],
      },
    });
  });

  test("should update the browser state with `archive` set to the value in `options.fallback`", () => {
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
      someOtherPackage: {},
      infiniteScroll: {
        archive: "@fallback-archive",
        pages: ["@fallback-archive"],
        links: ["/post-one/"],
      },
    });
  });

  test('should update the browser state with `archive` set to "/"', () => {
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
        archive: "/",
        pages: ["/"],
        links: ["/post-one/"],
      },
    });
  });

  test("should not update the browser state if `options.active` is false", () => {
    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
    }));

    act(() => {
      render(<App options={{ active: false }} />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).not.toHaveBeenCalled();
  });

  test("should request the archive if not ready and not fetching", () => {
    sourceGet.mockImplementation((link) => ({
      link,
      isReady: link !== "/",
      isFetching: false,
      isArchive: true,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(sourceFetch).toHaveBeenCalledTimes(1);
    expect(sourceFetch).toHaveBeenCalledWith("/");
  });

  test("should not request the archive if `options.active` is false", () => {
    sourceGet.mockImplementation((link) => ({
      link,
      isReady: link !== "/",
      isFetching: false,
    }));

    act(() => {
      render(<App options={{ active: false }} />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("should not request the archive if it's ready", () => {
    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
      isArchive: true,
      items: [],
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("should not request the archive if it's fetching", () => {
    sourceGet.mockImplementation((link) => ({
      link,
      isReady: false,
      isFetching: true,
      isArchive: true,
      items: [],
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("should request next page on last item", () => {
    store.state.router.state.infiniteScroll = {
      archive: "/initial-archive/",
      pages: ["/initial-archive/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      next:
        link === "/initial-archive/" ? "/initial-archive/page/2/" : undefined,
      isReady: link !== "/initial-archive/page/2/",
      isFetching: false,
      isArchive: link.includes("archive"),
      items: link.includes("archive") ? [{ link: "/post-one/" }] : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(2);
    expect(routerUpdateState).toHaveBeenNthCalledWith(2, {
      someOtherPackage: {},
      infiniteScroll: {
        archive: "/initial-archive/",
        pages: ["/initial-archive/", "/initial-archive/page/2/"],
        links: ["/post-one/"],
      },
    });
    expect(sourceFetch).toHaveBeenCalledTimes(1);
    expect(sourceFetch).toHaveBeenCalledWith("/initial-archive/page/2/");
  });

  test("should not request next page on last item if `options.active` is false", () => {
    store.state.router.state.infiniteScroll = {
      archive: "/initial-archive/",
      pages: ["/initial-archive/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      next:
        link === "/initial-archive/" ? "/initial-archive/page/2/" : undefined,
      isReady: link !== "/initial-archive/page/2/",
      isFetching: false,
      isArchive: link.includes("archive"),
      items: link.includes("archive") ? [{ link: "/post-one/" }] : undefined,
    }));

    act(() => {
      render(<App options={{ active: false }} />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).not.toHaveBeenCalled();
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("should not request next page on last item if there isn't next page", () => {
    store.state.router.state.infiniteScroll = {
      archive: "/initial-archive/",
      pages: ["/initial-archive/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: link !== "/initial-archive/page/2/",
      isFetching: false,
      isArchive: link.includes("archive"),
      items: link.includes("archive") ? [{ link: "/post-one/" }] : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("should not request next page on last item if has reached limit", () => {
    store.state.router.state.infiniteScroll = {
      archive: "/initial-archive/",
      pages: ["/initial-archive/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      next:
        link === "/initial-archive/" ? "/initial-archive/page/2/" : undefined,
      isReady: link !== "/initial-archive/page/2/",
      isFetching: false,
      isArchive: link.includes("archive"),
      items: link.includes("archive") ? [{ link: "/post-one/" }] : undefined,
    }));

    act(() => {
      render(<App options={{ limit: 1 }} />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("should not request next page if it's not on last item", () => {
    store.state.router.state.infiniteScroll = {
      archive: "/initial-archive/",
      pages: ["/initial-archive/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      next:
        link === "/initial-archive/" ? "/initial-archive/page/2/" : undefined,
      isReady: link !== "/initial-archive/page/2/",
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
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("should not fetch next page if ready", () => {
    store.state.router.state.infiniteScroll = {
      archive: "/initial-archive/",
      pages: ["/initial-archive/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      next:
        link === "/initial-archive/" ? "/initial-archive/page/2/" : undefined,
      isReady: true,
      isFetching: false,
      isArchive: link.includes("archive"),
      items: link.includes("archive") ? [{ link: "/post-one/" }] : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(2);
    expect(routerUpdateState).toHaveBeenNthCalledWith(2, {
      someOtherPackage: {},
      infiniteScroll: {
        archive: "/initial-archive/",
        pages: ["/initial-archive/", "/initial-archive/page/2/"],
        links: ["/post-one/"],
      },
    });
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("should not fetch next page if fetching", () => {
    store.state.router.state.infiniteScroll = {
      archive: "/initial-archive/",
      pages: ["/initial-archive/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      next:
        link === "/initial-archive/" ? "/initial-archive/page/2/" : undefined,
      isReady: link !== "/initial-archive/page/2/",
      isFetching: link === "/initial-archive/page/2/",
      isArchive: link.includes("archive"),
      items: link.includes("archive") ? [{ link: "/post-one/" }] : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledTimes(2);
    expect(routerUpdateState).toHaveBeenNthCalledWith(2, {
      someOtherPackage: {},
      infiniteScroll: {
        archive: "/initial-archive/",
        pages: ["/initial-archive/", "/initial-archive/page/2/"],
        links: ["/post-one/"],
      },
    });
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("should return the right object", () => {
    store.state.router.state.infiniteScroll = {
      archive: "/initial-archive/",
      pages: ["/"],
      links: ["/post-one/", "/post-two/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
      isArchive: link === "/",
      items:
        link === "/"
          ? [{ link: "/post-one/" }, { link: "/post-two/" }]
          : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUsePostTypeInfiniteScroll).toHaveReturnedWith({
      posts: [
        {
          key: "/post-one/",
          link: "/post-one/",
          isLast: false,
          Wrapper: expect.any(Function),
        },
        {
          key: "/post-two/",
          link: "/post-two/",
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

  test("should return `isLast` true for second last link if last link is not ready", () => {
    store.state.router.link = "/post-two/";
    store.state.router.state.infiniteScroll = {
      archive: "/initial-archive/",
      pages: ["/"],
      links: ["/post-one/", "/post-two/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: link !== "/post-two/",
      isFetching: false,
      isArchive: link === "/",
      items:
        link === "/"
          ? [{ link: "/post-one/" }, { link: "/post-two/" }]
          : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUsePostTypeInfiniteScroll).toHaveReturnedWith({
      posts: [
        {
          key: "/post-one/",
          link: "/post-one/",
          isLast: true,
          Wrapper: expect.any(Function),
        },
        {
          key: "/post-two/",
          link: "/post-two/",
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

  test("should return `isLimit` true if has reached limit and there is next item and is not fetching", () => {
    store.state.router.link = "/post-two/";
    store.state.router.state.infiniteScroll = {
      archive: "/",
      limit: 2,
      pages: ["/"],
      links: ["/post-one/", "/post-two/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
      isArchive: link === "/",
      items:
        link === "/"
          ? [
              { link: "/post-one/" },
              { link: "/post-two/" },
              { link: "/post-three/" },
            ]
          : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUsePostTypeInfiniteScroll).toHaveReturnedWith({
      posts: [
        {
          key: "/post-one/",
          link: "/post-one/",
          isLast: false,
          Wrapper: expect.any(Function),
        },
        {
          key: "/post-two/",
          link: "/post-two/",
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

  test("should return `isLimit` false and `isFetching` true if next item is fetching", () => {
    store.state.router.link = "/post-two/";
    store.state.router.state.infiniteScroll = {
      archive: "/",
      limit: 2,
      pages: ["/"],
      links: ["/post-one/", "/post-two/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: link !== "/post-three/",
      isFetching: link === "/post-three/",
      isArchive: link === "/",
      items:
        link === "/"
          ? [
              { link: "/post-one/" },
              { link: "/post-two/" },
              { link: "/post-three/" },
            ]
          : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUsePostTypeInfiniteScroll).toHaveReturnedWith({
      posts: [
        {
          key: "/post-one/",
          link: "/post-one/",
          isLast: false,
          Wrapper: expect.any(Function),
        },
        {
          key: "/post-two/",
          link: "/post-two/",
          isLast: true,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: true,
      isError: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isLimit` false and `isFetching` true if next page is fetching", () => {
    store.state.router.link = "/post-two/";
    store.state.router.state.infiniteScroll = {
      archive: "/",
      limit: 2,
      pages: ["/", "/page/2/"],
      links: ["/post-one/", "/post-two/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: link === "/page/2/",
      isArchive: !link.includes("post"),
      items: !link.includes("post")
        ? [{ link: link + "post-one/" }, { link: link + "post-two/" }]
        : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUsePostTypeInfiniteScroll).toHaveReturnedWith({
      posts: [
        {
          key: "/post-one/",
          link: "/post-one/",
          isLast: false,
          Wrapper: expect.any(Function),
        },
        {
          key: "/post-two/",
          link: "/post-two/",
          isLast: true,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: true,
      isError: false,
      fetchNext: expect.any(Function),
    });
  });

  test("should return `isLimit` false if there isn't a next item", () => {
    store.state.router.link = "/post-two/";
    store.state.router.state.infiniteScroll = {
      archive: "/",
      limit: 2,
      pages: ["/"],
      links: ["/post-one/", "/post-two/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
      isArchive: link === "/",
      items:
        link === "/"
          ? [{ link: "/post-one/" }, { link: "/post-two/" }]
          : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUsePostTypeInfiniteScroll).toHaveReturnedWith({
      posts: [
        {
          key: "/post-one/",
          link: "/post-one/",
          isLast: false,
          Wrapper: expect.any(Function),
        },
        {
          key: "/post-two/",
          link: "/post-two/",
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

  test("should return `isLimit` false if limit hasn't been reached", () => {
    store.state.router.link = "/post-two/";
    store.state.router.state.infiniteScroll = {
      archive: "/",
      limit: 2,
      pages: ["/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
      isArchive: link === "/",
      items:
        link === "/"
          ? [{ link: "/post-one/" }, { link: "/post-two/" }]
          : undefined,
    }));

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUsePostTypeInfiniteScroll).toHaveReturnedWith({
      posts: [
        {
          key: "/post-one/",
          link: "/post-one/",
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

  test("should return `isError` true when current post is unavailable", () => {
    store.state.router.link = "/post-one/";
    store.state.router.state.infiniteScroll = {
      archive: "/",
      limit: 3,
      pages: ["/"],
      links: ["/post-one/", "/post-two/"],
    };

    sourceGet.mockImplementation((link) => {
      if (link === "/post-one/") {
        return {
          link: "/post-one/",
          next: "/post-two",
          isReady: true,
          isFetching: false,
          isError: false,
        };
      }

      if (link === "/post-two/") {
        return {
          isReady: true,
          isFetching: false,
          isError: true,
        };
      }

      return {
        link,
        isReady: true,
        isFetching: false,
        isArchive: link === "/",
        items:
          link === "/"
            ? [{ link: "/post-one/" }, { link: "/post-two/" }]
            : undefined,
      };
    });

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUsePostTypeInfiniteScroll).toHaveReturnedWith({
      posts: [
        {
          key: "/post-one/",
          link: "/post-one/",
          isLast: true,
          Wrapper: expect.any(Function),
        },
        {
          key: "/post-two/",
          link: "/post-two/",
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

  test("should return `isError` true when current page is unavailable", () => {
    store.state.router.link = "/post-one/";
    store.state.router.state.infiniteScroll = {
      archive: "/",
      limit: 2,
      pages: ["/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => {
      if (link === "/") {
        return {
          isReady: true,
          isFetching: false,
          isError: true,
        };
      }

      return {
        link,
        isReady: true,
        isFetching: false,
        items:
          link === "/"
            ? [{ link: "/post-one/" }, { link: "/post-two/" }]
            : undefined,
      };
    });

    act(() => {
      render(<App />, container);
    });

    expect(spiedUsePostTypeInfiniteScroll).toHaveBeenCalledTimes(1);
    expect(spiedUsePostTypeInfiniteScroll).toHaveReturnedWith({
      posts: [
        {
          key: "/post-one/",
          link: "/post-one/",
          isLast: true,
          Wrapper: expect.any(Function),
        },
      ],
      isLimit: false,
      isFetching: false,
      isError: true,
      fetchNext: expect.any(Function),
    });
  });

  test("`fetchNext` should fetch next item", () => {
    store.state.router.link = "/post-one/";
    store.state.router.state.infiniteScroll = {
      limit: 1,
      archive: "/page-one/",
      pages: ["/page-one/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: link !== "/post-two/",
      isFetching: false,
      isArchive: link === "/page-one/",
      items:
        link === "/page-one/"
          ? [{ link: "/post-one/" }, { link: "/post-two/" }]
          : undefined,
    }));

    act(() => {
      render(<AppWithButton />, container);
    });

    routerUpdateState.mockClear();

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      someOtherPackage: {},
      infiniteScroll: {
        limit: 1,
        archive: "/page-one/",
        pages: ["/page-one/"],
        links: ["/post-one/", "/post-two/"],
      },
    });
    expect(sourceFetch).toHaveBeenCalledTimes(1);
    expect(sourceFetch).toHaveBeenCalledWith("/post-two/");
  });

  test("`fetchNext` should fetch next page and next item", async () => {
    store.state.router.link = "/post-one/";
    store.state.router.state.infiniteScroll = {
      limit: 1,
      archive: "/page-one/",
      pages: ["/page-one/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      next: link === "/page-one/" ? "/page-two/" : undefined,
      isReady: !link.includes("two"),
      isFetching: false,
      isArchive: link.includes("page"),
      items:
        link === "/page-one/"
          ? [{ link: "/post-one/" }]
          : link === "/page-two/"
          ? [{ link: "/post-two/" }]
          : undefined,
    }));

    act(() => {
      render(<AppWithButton />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockImplementation((link) => ({
      link,
      next: link === "/page-one/" ? "/page-two/" : undefined,
      isReady: link !== "/post-two/",
      isFetching: false,
      isArchive: link.includes("page"),
      items:
        link === "/page-one/"
          ? [{ link: "/post-one/" }]
          : link === "/page-two/"
          ? [{ link: "/post-two/" }]
          : undefined,
    }));

    const fetchNext = act(async () => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(routerUpdateState).toHaveBeenCalledWith({
      someOtherPackage: {},
      infiniteScroll: {
        limit: 1,
        archive: "/page-one/",
        pages: ["/page-one/", "/page-two/"],
        links: ["/post-one/"],
      },
    });
    expect(sourceFetch).toHaveBeenCalledTimes(1);
    expect(sourceFetch).toHaveBeenCalledWith("/page-two/");

    await fetchNext;

    expect(routerUpdateState).toHaveBeenCalledTimes(2);
    expect(routerUpdateState).toHaveBeenNthCalledWith(2, {
      someOtherPackage: {},
      infiniteScroll: {
        limit: 1,
        archive: "/page-one/",
        pages: ["/page-one/", "/page-two/"],
        links: ["/post-one/", "/post-two/"],
      },
    });
    expect(sourceFetch).toHaveBeenCalledTimes(2);
    expect(sourceFetch).toHaveBeenNthCalledWith(2, "/post-two/");
  });

  test("`fetchNext` should not fetch next page if it's ready", () => {
    store.state.router.link = "/post-one/";
    store.state.router.state.infiniteScroll = {
      limit: 1,
      archive: "/page-one/",
      pages: ["/page-one/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      next: link === "/page-one/" ? "/page-two/" : undefined,
      isReady: link !== "/post-two/",
      isFetching: false,
      isArchive: link.includes("page"),
      items:
        link === "/page-one/"
          ? [{ link: "/post-one/" }]
          : link === "/page-two/"
          ? [{ link: "/post-two/" }]
          : undefined,
    }));

    act(() => {
      render(<AppWithButton />, container);
    });

    routerUpdateState.mockClear();

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).toHaveBeenCalledTimes(2);
    expect(sourceFetch).toHaveBeenCalledTimes(1);
    expect(sourceFetch).toHaveBeenCalledWith("/post-two/");
  });

  test("`fetchNext` should not fetch next page if it's fetching", () => {
    store.state.router.link = "/post-one/";
    store.state.router.state.infiniteScroll = {
      limit: 1,
      archive: "/page-one/",
      pages: ["/page-one/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      next: link === "/page-one/" ? "/page-two/" : undefined,
      isReady: !link.includes("two"),
      isFetching: link === "/page-two/",
      isArchive: link.includes("page"),
      items:
        link === "/page-one/"
          ? [{ link: "/post-one/" }]
          : link === "/page-two/"
          ? [{ link: "/post-two/" }]
          : undefined,
    }));

    act(() => {
      render(<AppWithButton />, container);
    });

    routerUpdateState.mockClear();

    sourceGet.mockImplementation((link) => ({
      link,
      next: link === "/page-one/" ? "/page-two/" : undefined,
      isReady: link !== "/post-two/",
      isFetching: false,
      isArchive: link.includes("page"),
      items:
        link === "/page-one/"
          ? [{ link: "/post-one/" }]
          : link === "/page-two/"
          ? [{ link: "/post-two/" }]
          : undefined,
    }));

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).toHaveBeenCalledTimes(2);
    expect(sourceFetch).toHaveBeenCalledTimes(1);
    expect(sourceFetch).toHaveBeenCalledWith("/post-two/");
  });

  test("`fetchNext` should not fetch next item if it's ready or fetching", () => {
    store.state.router.link = "/post-one/";
    store.state.router.state.infiniteScroll = {
      limit: 1,
      archive: "/page-one/",
      pages: ["/page-one/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
      isArchive: link.includes("page"),
      items:
        link === "/page-one/"
          ? [{ link: "/post-one/" }, { link: "/post-two/" }]
          : undefined,
    }));

    act(() => {
      render(<AppWithButton />, container);
    });

    routerUpdateState.mockClear();

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(sourceFetch).not.toHaveBeenCalled();

    routerUpdateState.mockClear();

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: link !== "/post-two/",
      isFetching: link === "/post-two/",
    }));

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).toHaveBeenCalledTimes(1);
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("`fetchNext` should do nothing if `options.active` is false", () => {
    store.state.router.link = "/post-one/";
    store.state.router.state.infiniteScroll = {
      limit: 1,
      archive: "/page-one/",
      pages: ["/page-one/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
      isArchive: link.includes("page"),
      items:
        link === "/page-one/"
          ? [{ link: "/post-one/" }, { link: "/post-two/" }]
          : undefined,
    }));

    act(() => {
      render(<AppWithButton options={{ active: false }} />, container);
    });

    routerUpdateState.mockClear();

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).not.toHaveBeenCalled();
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("`fetchNext` should do nothing if there isn't a next item and there isn't a next page", () => {
    store.state.router.link = "/post-one/";
    store.state.router.state.infiniteScroll = {
      limit: 1,
      archive: "/page-one/",
      pages: ["/page-one/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
      isArchive: link.includes("page"),
      items: link === "/page-one/" ? [{ link: "/post-one/" }] : undefined,
    }));

    act(() => {
      render(<AppWithButton />, container);
    });

    routerUpdateState.mockClear();

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).not.toHaveBeenCalled();
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("`fetchNext` should do nothing if next item is already in links", () => {
    store.state.router.link = "/post-one/";
    store.state.router.state.infiniteScroll = {
      limit: 1,
      archive: "/page-one/",
      pages: ["/page-one/"],
      links: ["/post-one/", "/post-two/"],
    };

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isFetching: false,
      isArchive: link.includes("page"),
      items:
        link === "/page-one/"
          ? [{ link: "/post-one/" }, { link: "/post-two/" }]
          : undefined,
    }));

    act(() => {
      render(<AppWithButton />, container);
    });

    routerUpdateState.mockClear();

    act(() => {
      Simulate.click(container.querySelector("button"));
    });

    expect(routerUpdateState).not.toHaveBeenCalled();
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  test("`fetchNext` should request the last page if `isError` is true", () => {
    store.state.router.link = "/post-one/";
    store.state.router.state.infiniteScroll = {
      limit: 1,
      archive: "/page-one/",
      pages: ["/page-one/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => {
      if (link === "/page-one/") {
        return {
          isReady: true,
          isFetching: false,
          isError: true,
        };
      }

      return {
        link,
        isReady: link !== "/post-two/",
        isFetching: false,
        isArchive: link === "/page-one/",
        items:
          link === "/page-one/"
            ? [{ link: "/post-one/" }, { link: "/post-two/" }]
            : undefined,
      };
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

  test("`fetchNext` should request the last post if `isError` is true", () => {
    store.state.router.link = "/post-one/";
    store.state.router.state.infiniteScroll = {
      limit: 1,
      archive: "/page-one/",
      pages: ["/page-one/"],
      links: ["/post-one/"],
    };

    sourceGet.mockImplementation((link) => {
      if (link === "/post-one/") {
        return {
          isReady: true,
          isFetching: false,
          isError: true,
        };
      }

      return {
        link,
        isReady: link !== "/post-two/",
        isFetching: false,
        isArchive: link === "/page-one/",
        items:
          link === "/page-one/"
            ? [{ link: "/post-one/" }, { link: "/post-two/" }]
            : undefined,
      };
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
    expect(sourceFetch).toHaveBeenCalledWith("/post-one/", { force: true });
  });
});

describe("Wrapper", () => {
  test("should return children if IntersectionObserver is not supported", () => {
    const Wrapper = usePostTypeInfiniteScroll.wrapperGenerator({
      link: "/post-one/",
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isArchive: link === "/",
      items: link === "/" ? [{ link: "/post-one/" }] : undefined,
    }));

    mockedUseInfiniteScroll.mockReturnValueOnce({
      supported: false,
    });

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
    const Wrapper = usePostTypeInfiniteScroll.wrapperGenerator({
      link: "/post-one/",
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: link !== "/post-one/",
      isArchive: link === "/",
      items: link === "/" ? [{ link: "/post-one/" }] : undefined,
    }));

    mockedUseInfiniteScroll.mockReturnValueOnce({
      supported: true,
      fetchRef: jest.fn(),
      routeRef: jest.fn(),
      fetchInView: false,
      routeInView: false,
    });

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
    const Wrapper = usePostTypeInfiniteScroll.wrapperGenerator({
      link: "/post-one/",
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isArchive: link === "/",
      items: link === "/" ? [{ link: "/post-one/" }] : undefined,
    }));

    mockedUseInfiniteScroll.mockReturnValueOnce({
      supported: true,
      fetchRef: jest.fn(),
      routeRef: jest.fn(),
      fetchInView: false,
      routeInView: false,
    });

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

  test("should return only children inside the wrapper if limit reached", () => {
    store.state.router.state.infiniteScroll = { limit: 1 };
    const Wrapper = usePostTypeInfiniteScroll.wrapperGenerator({
      link: "/post-one/",
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isArchive: link === "/",
      items: link === "/" ? [{ link: "/post-one/" }] : undefined,
    }));

    mockedUseInfiniteScroll.mockReturnValue({
      supported: true,
      fetchRef: jest.fn(),
      routeRef: jest.fn(),
      fetchInView: false,
      routeInView: false,
    });

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
    store.state.router.state.infiniteScroll = { pages: ["/"] };
    const Wrapper = usePostTypeInfiniteScroll.wrapperGenerator({
      link: "/post-one/",
    });

    sourceGet.mockImplementation((link) => ({
      link,
      isReady: true,
      isArchive: link === "/",
      items:
        link === "/"
          ? [{ link: "/post-one/" }, { link: "/post-two/" }]
          : undefined,
    }));

    mockedUseInfiniteScroll.mockReturnValueOnce({
      supported: true,
      fetchRef: jest.fn(),
      routeRef: jest.fn(),
      fetchInView: false,
      routeInView: false,
    });

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
      currentLink: "/post-one/",
      nextLink: "/post-two/",
    });
  });
});
