import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "@frontity/connect";
import { Html2React } from "../../src/libraries/component";
import Html2ReactPackage from "../../src";

const store = createStore(Html2ReactPackage);

jest.mock("@frontity/components/script", () => "mocked-script");

describe("Script processor", () => {
  it("should process a script with src", () => {
    const { container } = render(
      <Html2React html={'<script src="/some-js-file.js" />'} {...store} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should not process scripts with a non valid type", () => {
    const { container } = render(
      <Html2React html={'<script src="/" type="non-valid" />'} {...store} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should process a script with code", () => {
    const { container } = render(
      <Html2React html={'<script>const some = "code";</script>'} {...store} />
    );
    expect(container).toMatchSnapshot();
  });
});
