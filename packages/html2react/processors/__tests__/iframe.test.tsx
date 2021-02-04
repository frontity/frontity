import { render } from "@testing-library/react";
import Html2React from "../../src/libraries/component";
import iframe from "../iframe";

jest.mock("@frontity/components/iframe", () => "mocked-iframe");

describe("Iframe Processor", () => {
  it("should process iframes from src", () => {
    const { container } = render(
      <Html2React
        html="<iframe src='https://frontity.org' title='Frontity' width='500' />"
        processors={[iframe]}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should process iframes from data-src", () => {
    const { container } = render(
      <Html2React
        html="<iframe data-src='https://frontity.org' title='Frontity' width='500' />"
        processors={[iframe]}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
