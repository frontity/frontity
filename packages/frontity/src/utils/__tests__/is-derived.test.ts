import isDerived from "../is-derived";
import { createStore } from "../../";

/**
 * A mocked package implementation.
 */
const packageImpl = {
  state: {
    theme: {
      prop: "regular prop",
      derived: ({ state }) => `not a ${state.theme.prop}!`,
    },
  },
};

describe("isDerived", () => {
  it("should return `true` for derived props", () => {
    const { state } = createStore(packageImpl);
    expect(isDerived(state.theme, "derived")).toBe(true);
  });

  it("should return `false` for non-derived props", () => {
    const { state } = createStore(packageImpl);
    expect(isDerived(state.theme, "prop")).toBe(false);
  });

  it("should return `false` for derived props that were overwritten", () => {
    const { state } = createStore(packageImpl);
    state.theme.derived = "not anymore";
    expect(isDerived(state.theme, "derived")).toBe(false);
  });
});
