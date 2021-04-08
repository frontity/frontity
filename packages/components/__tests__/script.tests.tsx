import * as React from "react";
import { create } from "react-test-renderer";
import Script from "../script";

describe("Script", () => {
  test("should work with some random prop", () => {
    const ScriptComponent = create(
      <Script
        randomProp="random"
        otherRandomProp="otherRandom"
        src="//cdnjs.cloudflare.com/ajax/libs/typescript/4.2.4/typescript.min.js"
      />
    );

    expect(ScriptComponent.toJSON()).toMatchSnapshot();
  });

  test("should work with className", () => {
    const ScriptComponent = create(
      <Script
        className="someClassName"
        src="//cdnjs.cloudflare.com/ajax/libs/typescript/4.2.4/typescript.min.js"
      />
    );

    expect(ScriptComponent.toJSON()).toMatchSnapshot();
  });

  test("should work with data attributes", () => {
    const ScriptComponent = create(
      <Script
        data-value="3"
        src="//cdnjs.cloudflare.com/ajax/libs/typescript/4.2.4/typescript.min.js"
      />
    );

    expect(ScriptComponent.toJSON()).toMatchSnapshot();
  });

  test("should work with onLoad prop", () => {
    const ScriptComponent = create(
      <Script
        onLoad={() => {
          console.log("Scipt Loaded");
        }}
        src="//cdnjs.cloudflare.com/ajax/libs/typescript/4.2.4/typescript.min.js"
      />
    );

    expect(ScriptComponent.toJSON()).toMatchSnapshot();
  });
});
