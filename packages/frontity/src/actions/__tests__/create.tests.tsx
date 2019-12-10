import React from "react";
import { render } from "ink-testing-library";
import { Create } from "../create";

describe("Create", () => {
  test("should get the name of the app if any is passed", () => {
    const { lastFrame } = render(<Create initialName="test" />);
    expect(lastFrame()).toContain("Name of the app: test");
  });
  test("should allow to chnage the name of the app", () => {
    const { lastFrame, stdin } = render(<Create initialName="test" />);
    stdin.write("-app");
    expect(lastFrame()).toContain("Name of the app: test-app");
  });
});
