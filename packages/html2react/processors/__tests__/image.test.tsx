import React from "react";
import { render } from "@testing-library/react";
import Html2React from "../../src/libraries/component";
import image from "../image";

jest.mock("@frontity/components/image", () => "mocked-img");

describe("Image Processor", () => {
  it("should process images from src", () => {
    const { container } = render(
      <Html2React
        html="<img src='https://frontity.org/logo.png' alt='Frontity' width='500' />"
        processors={[image]}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should process images from data-src", () => {
    const { container } = render(
      <Html2React
        html="<img data-src='https://frontity.org/logo.png' alt='Frontity' width='500' />"
        processors={[image]}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
