import Html2React from "@frontity/html2react/src/libraries/component";
import amphtmlValidator, { Validator } from "amphtml-validator";
import ampTemplate from "../amp-template";
import { render } from "@testing-library/react";

import processors from "../processors";

let validator: Validator;

beforeEach(async () => {
  validator = await amphtmlValidator.getInstance();
});

test("Validate amp-img", async () => {
  const { container } = render(
    <Html2React html="<img src='test.img'></img>" processors={processors} />
  );

  expect(container).toMatchInlineSnapshot(`
    <div>
      <amp-img
        src="test.img"
      />
    </div>
  `);

  const result = validator.validateString(
    ampTemplate({ content: container.toString() })
  );

  expect(result.status).toBe("PASS");
});
