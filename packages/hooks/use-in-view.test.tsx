import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import useInView from "./use-in-view";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: jest.fn(),
  });
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const App = () => {
  useInView();
  return <div />;
};

test("useInView should show a deprecation warning", () => {
  console.warn = jest.fn();
  const warn = console.warn as jest.MockedFunction<typeof console.warn>;

  act(() => {
    ReactDOM.render(<App />, container);
  });

  expect(warn).toHaveBeenCalledTimes(1);
  expect(warn.mock.calls[0][0]).toMatch("is deprecated and will be removed");
});
