import { render } from "@testing-library/react";
import Html2React from "../../src/libraries/component";
import gutenbergSlot from "../slot-block";

jest.mock("frontity", () => ({
  Slot: jest.fn(({ name }) => <slot name={name}>mocked slot</slot>),
  connect: jest.fn((comp) => comp),
  decode: jest.fn((str) => str),
  warn: jest.fn(),
}));

describe("Slot Block processor", () => {
  it("should process an slot created with Gutenberg", () => {
    const { container } = render(
      <Html2React
        html='<div class="wp-block-frontity-frontity-slot" data-frontity-slot-name="Some Slot Name"></div>'
        processors={[gutenbergSlot]}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <slot
          name="Some Slot Name"
        >
          mocked slot
        </slot>
      </div>
    `);
  });

  it("should ignore an slot without name", () => {
    const { container } = render(
      <Html2React
        html='<div class="wp-block-frontity-frontity-slot"></div>'
        processors={[gutenbergSlot]}
      />
    );

    expect(container).toMatchInlineSnapshot(`<div />`);
  });
});
