import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "@frontity/connect";
import { Html2React } from "../../src/libraries/component";
import Html2ReactPackage from "../../src";

const store = createStore(Html2ReactPackage);

jest.mock("@frontity/components/iframe", () => "mocked-iframe");

describe("Iframe Processor", () => {
  it("should process iframes", () => {
    const { container } = render(
      <Html2React
        html={
          <iframe src="https://frontity.org" title="Frontity" width="500" />
        }
        {...store}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
