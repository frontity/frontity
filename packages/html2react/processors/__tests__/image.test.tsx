import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "@frontity/connect";
import { Html2React } from "../../src/libraries/component";
import image from "../image";
import Html2ReactPackage from "../../src";

const store = createStore(Html2ReactPackage);
store.libraries.html2react.processors.push(image);

jest.mock("@frontity/components/image", () => "mocked-img");

describe("Image Processor", () => {
  it("should process images from src", () => {
    const { container } = render(
      <Html2React
        html="<img src='https://frontity.org/logo.png' alt='Frontity' width='500' />"
        {...store}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should process images from data-src", () => {
    const { container } = render(
      <Html2React
        html="<img data-src='https://frontity.org/logo.png' alt='Frontity' width='500' />"
        {...store}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
