import React from "react";
import { create } from "react-test-renderer";
import { createStore, Provider } from "../../connect";
import Link from "../link";

let store;

beforeEach(() => {
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

  test("calls action.router.set", () => {
    const LinkComponent = create(
      <Provider value={store}>
        <Link link="/">This is a link</Link>
      </Provider>
    );
  });
});
