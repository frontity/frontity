import React from "react";
import TestRenderer from "react-test-renderer";
import Component from "../component";
import parse from "../parse";
import decode from "../decode/client";

describe("Component", () => {
  test("works just fine", () => {
    const html = `
      <!-- This is a comment -->
      <p id="paragraph">This is an html <span>example</span> for testing purposes.</p>

      <!-- [class] attribute -->
      <div class="hello">
        <img src="http://example.com/img.jpg">
      </div>
      
      <!-- [autoplay] standalone attribute ([key/value] should be [autoPlay/true] -->
      <audio autoplay>
        <source src="example.ogg" type="audio/ogg">
      </div>
    `;

    const processors = [
      {
        name: "priority-15",
        priority: 15,
        test: () => false
      },
      {
        name: "priority-5",
        priority: 5,
        test: () => false
      },
      {
        name: "priority-none",
        test: () => false
      }
    ];

    const libraries = {
      html2react: {
        parse,
        decode,
        processors
      }
    };

    expect(libraries.html2react.processors[0].name).toBe("priority-15");
    expect(libraries.html2react.processors[1].name).toBe("priority-5");
    expect(libraries.html2react.processors[2].name).toBe("priority-none");

    const AnyComponent = Component as any;
    const result = TestRenderer.create(
      <AnyComponent html={html} libraries={libraries} />
    ).toJSON();

    expect(libraries.html2react.processors[0].name).toBe("priority-5");
    expect(libraries.html2react.processors[1].name).toBe("priority-none");
    expect(libraries.html2react.processors[2].name).toBe("priority-15");
    expect(result).toMatchSnapshot();
  });
});
