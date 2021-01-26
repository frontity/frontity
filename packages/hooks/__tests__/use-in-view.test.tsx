import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import * as useInView from "../use-in-view";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.spyOn(useInView, "default");
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
  useInView.default();
  return <div />;
};

test("useInView should return the right values if IntersectionObserver is supported", () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  expect(useInView.default).toHaveReturnedWith({
    inView: expect.any(Boolean),
    ref: expect.any(Function),
    supported: true,
  });
});

test("useInView should return the right values if IntersectionObserver is not supported", () => {
  Object.defineProperty(window, "IntersectionObserver", { value: undefined });

  act(() => {
    ReactDOM.render(<App />, container);
  });

  expect(useInView.default).toHaveReturnedWith({
    inView: true,
    ref: undefined,
    supported: false,
  });
});
