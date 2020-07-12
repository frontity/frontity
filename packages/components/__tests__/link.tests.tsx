import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";
import { createStore, Provider } from "../../connect/src";
import Link from "../link";

let store;
let container;
let fetch: jest.Mock;
let get: jest.Mock;

beforeEach(() => {
  fetch = jest.fn();
  get = jest.fn();
  jest.useFakeTimers();
  container = document.createElement("div");
  document.body.appendChild(container);
  window.scrollTo = jest.fn();
  store = createStore({
    state: {
      theme: {
        autoPrefetch: "hover",
      },
      source: {
        get: () => get,
      },
    },
    actions: {
      router: {
        set(link) {
          return link;
        },
      },
      source: {
        fetch: () => fetch,
      },
    },
  });
});

afterEach(() => {
  unmountComponentAtNode(container);
  window.scrollTo = null;
  container.remove();
  container = null;
});

describe("Link", () => {
  test("should render a regular link", () => {
    const LinkComponent = create(
      <Provider value={store}>
        <Link link="/">This is a link</Link>
      </Provider>
    );

    expect(LinkComponent.toJSON()).toMatchInlineSnapshot(`
      <a
        href="/"
        onClick={[Function]}
        target="_self"
      >
        This is a link
      </a>
    `);
  });

  test("should add classname if provided", () => {
    const LinkComponent = create(
      <Provider value={store}>
        <Link link="/" className="custom-classname">
          This is a link
        </Link>
      </Provider>
    );

    expect(LinkComponent.toJSON()).toMatchInlineSnapshot(`
      <a
        className="custom-classname"
        href="/"
        onClick={[Function]}
        target="_self"
      >
        This is a link
      </a>
    `);
  });

  test("clicking a link works as expected", () => {
    const onClick = jest.fn();
    const linkUrl = "/my-page";

    act(() => {
      render(
        <Provider value={store}>
          <Link link={linkUrl} className="my-link" onClick={onClick}>
            This is a link
          </Link>
        </Provider>,
        container
      );
    });

    jest.spyOn(store.actions.router, "set");

    const anchor = document.querySelector("a.my-link");

    act(() => {
      anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(store.actions.router.set).toHaveBeenCalledWith(linkUrl);
  });

  test("clicking a link without scrolling", () => {
    const linkUrl = "/my-page";

    act(() => {
      render(
        <Provider value={store}>
          <Link link={linkUrl} scroll={false} className="my-link">
            This is a link
          </Link>
        </Provider>,
        container
      );
    });

    jest.spyOn(store.actions.router, "set");

    const anchor = document.querySelector("a.my-link");

    act(() => {
      anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(store.actions.router.set).toHaveBeenCalledWith(linkUrl);
  });

  test("clicking a link with target=_blank does not do anything", () => {
    const linkUrl = "/my-page";

    act(() => {
      render(
        <Provider value={store}>
          <Link link={linkUrl} target="_blank" className="my-link">
            This is a link
          </Link>
        </Provider>,
        container
      );
    });

    jest.spyOn(store.actions.router, "set");

    const anchor = document.querySelector("a.my-link");

    act(() => {
      anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(store.actions.router.set).not.toHaveBeenCalledWith(linkUrl);
  });

  test("clicking a link that starts with http does not do anything", () => {
    const linkUrl = "https://externallink.com";

    act(() => {
      render(
        <Provider value={store}>
          <Link link={linkUrl} className="my-link">
            This is a link
          </Link>
        </Provider>,
        container
      );
    });

    jest.spyOn(store.actions.router, "set");

    const anchor = document.querySelector("a.my-link");

    act(() => {
      anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(store.actions.router.set).not.toHaveBeenCalledWith(linkUrl);
  });

  test("forcing a link to open in a new tab/window works", () => {
    const linkUrl = "/my-link";

    act(() => {
      render(
        <Provider value={store}>
          <Link link={linkUrl} className="my-link">
            This is a link
          </Link>
        </Provider>,
        container
      );
    });

    jest.spyOn(store.actions.router, "set");

    const anchor = document.querySelector("a.my-link");

    act(() => {
      // ctrl + click
      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, ctrlKey: true })
      );
    });

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(store.actions.router.set).not.toHaveBeenCalledWith(linkUrl);

    act(() => {
      // shift + click
      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, shiftKey: true })
      );
    });

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(store.actions.router.set).not.toHaveBeenCalledWith(linkUrl);

    act(() => {
      // cmd + click
      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, metaKey: true })
      );
    });

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(store.actions.router.set).not.toHaveBeenCalledWith(linkUrl);

    act(() => {
      // middle mouse button
      anchor.dispatchEvent(
        new MouseEvent("click", { bubbles: true, button: 1 })
      );
    });

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(store.actions.router.set).not.toHaveBeenCalledWith(linkUrl);
  });
});

describe("Link prefetching", () => {
  test("disabling works", () => {
    const linkUrl1 = "/post-name";
    const linkUrl2 = "/post-name-2";
    const storeAllMode = { ...store };
    storeAllMode.state.theme.autoPrefetch = "all";

    get.mockReturnValue({ isReady: false, isFetching: false });
    jest.spyOn(store.actions.source, "fetch");

    act(() => {
      render(
        <Provider value={storeAllMode}>
          <Link link={linkUrl1} prefetch={false} className="my-link">
            This is a link
          </Link>
          <Link link={linkUrl2} className="my-link-2">
            This is a link
          </Link>
        </Provider>,
        container
      );
    });

    jest.runAllTimers();

    expect(store.actions.source.fetch).toHaveBeenCalledTimes(1);
    expect(store.actions.source.fetch).not.toHaveBeenCalledWith(linkUrl1);
    expect(store.actions.source.fetch).toHaveBeenCalledWith(linkUrl2);
  });

  test("does not run on slow connections", () => {
    const linkUrl1 = "/post-name";
    const storeAllMode = { ...store };
    storeAllMode.state.theme.autoPrefetch = "all";

    get.mockReturnValue({ isReady: false, isFetching: false });
    jest.spyOn(store.actions.source, "fetch");
    // simulate save data mode
    (navigator as Navigator & { connection }).connection = { saveData: true };
    act(() => {
      render(
        <Provider value={storeAllMode}>
          <Link link={linkUrl1} className="my-link">
            This is a link
          </Link>
        </Provider>,
        container
      );
    });

    expect(store.actions.source.fetch).toHaveBeenCalledTimes(0);
    expect(store.actions.source.fetch).not.toHaveBeenCalledWith(linkUrl1);

    (navigator as Navigator & { connection }).connection = { saveData: false };
  });

  test("all mode works", () => {
    const linkUrl1 = "/post-name-all-1";
    const linkUrl2 = "/post-name-all-2";
    const linkUrl3 = "/post-name-all-3";
    const linkUrl4 = "/post-name-all-4";
    const linkUrl5 = "/post-name-all-5";
    const storeAllMode = { ...store };
    storeAllMode.state.theme.autoPrefetch = "all";

    get.mockReturnValue({ isReady: false, isFetching: false });
    jest.spyOn(store.actions.source, "fetch");

    act(() => {
      render(
        <Provider value={storeAllMode}>
          <Link link={linkUrl1} className="my-link">
            This is a link
          </Link>
          <Link link={linkUrl2} className="my-link-2">
            This is a link
          </Link>
          <Link link={linkUrl3} className="my-link">
            This is a link
          </Link>
          <Link link={linkUrl4} className="my-link-2">
            This is a link
          </Link>
          <Link link={linkUrl5} className="my-link-2">
            This is a link
          </Link>
          <Link link={linkUrl1} className="my-link-3">
            This is a link
          </Link>
          <Link link={linkUrl2} className="my-link-4">
            This is a link
          </Link>
        </Provider>,
        container
      );
    });

    jest.runAllTimers();

    expect(store.actions.source.fetch).toHaveBeenCalledTimes(5);
    expect(store.actions.source.fetch).toHaveBeenCalledWith(linkUrl1);
    expect(store.actions.source.fetch).toHaveBeenCalledWith(linkUrl2);
    expect(store.actions.source.fetch).toHaveBeenCalledWith(linkUrl3);
    expect(store.actions.source.fetch).toHaveBeenCalledWith(linkUrl4);
    expect(store.actions.source.fetch).toHaveBeenCalledWith(linkUrl5);
  });

  test("hover mode works", () => {
    const linkUrl = "/post-name-hover-1";
    const linkUrlNoPrefetch = "/post-name-hover-2";

    act(() => {
      render(
        <Provider value={store}>
          <Link link={linkUrl} className="my-link">
            This is a link
          </Link>
          <Link link={linkUrl} className="my-link-2">
            This is a link
          </Link>
          <Link link={linkUrlNoPrefetch} className="my-link-3">
            This is a link
          </Link>
        </Provider>,
        container
      );
    });

    jest.spyOn(store.actions.source, "fetch");
    get.mockReturnValue({ isReady: false, isFetching: false });

    const anchor = document.querySelector("a.my-link");

    act(() => {
      anchor.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    });
    jest.runAllTimers();
    expect(store.actions.source.fetch).toHaveBeenCalledWith(linkUrl);

    // if data is already avaliable no need to prefetch again.
    get.mockReturnValue({ isReady: true, isFetching: false });

    act(() => {
      anchor.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    });
    jest.runAllTimers();

    const anchor2 = document.querySelector("a.my-link-2");

    act(() => {
      anchor2.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    });

    jest.runAllTimers();
    // a link that was not prefetched should not call fetch, it should go through the router instead
    const anchor3 = document.querySelector("a.my-link-3");

    act(() => {
      anchor3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(store.actions.source.fetch).toHaveBeenCalledTimes(1);
  });
});
