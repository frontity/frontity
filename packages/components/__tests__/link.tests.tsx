import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { create } from "react-test-renderer";
import { createStore, Provider } from "../../connect/src";
import Link from "../link";

let store;
let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  window.scrollTo = jest.fn();
  store = createStore({
    state: {},
    actions: {
      router: {
        set(link) {
          return link;
        },
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

    expect(LinkComponent.toJSON()).toMatchSnapshot();
  });

  test("should add classname if provided", () => {
    const LinkComponent = create(
      <Provider value={store}>
        <Link link="/" className="custom-classname">
          This is a link
        </Link>
      </Provider>
    );

    expect(LinkComponent.toJSON()).toMatchSnapshot();
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
});
