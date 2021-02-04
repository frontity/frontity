import React from "react";
import TestRenderer from "react-test-renderer";
import Component from "../component";
import parse from "../parse";
import htmlMock from "./mocks/html";

describe("Component", () => {
  test("works just fine", () => {
    const processors = [
      {
        name: "priority-15",
        priority: 15,
        test: () => false,
        processor: () => {},
      },
      {
        name: "priority-5",
        priority: 5,
        test: () => false,
        processor: () => {},
      },
      {
        name: "priority-none",
        test: () => false,
        processor: () => {},
      },
    ];

    const libraries = {
      html2react: {
        parse,
        processors,
      },
    };

    expect(libraries.html2react.processors[0].name).toBe("priority-15");
    expect(libraries.html2react.processors[1].name).toBe("priority-5");
    expect(libraries.html2react.processors[2].name).toBe("priority-none");

    const AnyComponent = Component as any;
    const result = TestRenderer.create(
      <AnyComponent html={htmlMock} libraries={libraries} />
    ).toJSON();

    expect(libraries.html2react.processors[0].name).toBe("priority-5");
    expect(libraries.html2react.processors[1].name).toBe("priority-none");
    expect(libraries.html2react.processors[2].name).toBe("priority-15");
    expect(result).toMatchSnapshot();
  });
});
