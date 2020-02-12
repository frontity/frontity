import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "@frontity/connect";
import { Html2React } from "../../src/libraries/component";
import image from "../image";
import Html2ReactPackage from "../../src";

const store = createStore(Html2ReactPackage);
store.libraries.html2react.processors.push(image);

jest.mock("@frontity/components/image", () => "mocked-image");

describe("Image Processor", () => {
  it.skip("should process iframes from src", () => {
    const { container } = render(
      <Html2React
        html="<iframe src='https://frontity.org' title='Frontity' width='500' />"
        {...store}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it.skip("should process iframes from data-src", () => {
    const { container } = render(
      <Html2React
        html="<iframe data-src='https://frontity.org' title='Frontity' width='500' />"
        {...store}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
