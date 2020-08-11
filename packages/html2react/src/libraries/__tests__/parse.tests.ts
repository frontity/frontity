import parse from "../parse";
import htmlMock from "./mocks/html";
import { Element } from "../../../types";

describe("parse", () => {
  test("should return the right HTML tree", () => {
    const result = parse(htmlMock);
    expect(result).toMatchSnapshot();
  });

  test("decodes the characters in links correctly", () => {
    const result = parse(
      '<a href="https://test.com/?param1=1&amp;param2=2"> test link </a>'
    ) as Element[];

    expect(result[0].props.href).toBe("https://test.com/?param1=1&param2=2");
  });

  test("maps from HTML attributes to react props", () => {
    const result = parse(
      '<div class="test-class"> test </div> <label for="nothing"></label>'
    ) as Element[];

    expect((result[0].props as any).class).toBeUndefined();
    expect(result[0].props.className).toBe("test-class");
    expect((result[1].props as any).for).toBeUndefined();
    expect(result[1].props.htmlFor).toBe("nothing");
  });

  test("maps from SVG attributes to react props", () => {
    const resultOne = parse(
      '<svg viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"></svg>'
    ) as Element[];

    expect((resultOne[0].props as any)["xmlns:xlink"]).toBeUndefined();
    expect((resultOne[0].props as any).xmlnsXlink).toBe(
      "https://www.w3.org/1999/xlink"
    );

    const resultTwo = parse(
      '<g stroke-width="1" fill-rule="evenodd"></g>'
    ) as Element[];

    expect((resultTwo[0].props as any)["stroke-width"]).toBeUndefined();
    expect((resultTwo[0].props as any).strokeWidth).toBe("1");
    expect((resultTwo[0].props as any)["fill-rule"]).toBeUndefined();
    expect((resultTwo[0].props as any).fillRule).toBe("evenodd");
  });

  test("should not map data attributes as SVG attributes", () => {
    const result = parse(
      '<div data-src="https://frontity.org"></div>'
    ) as Element[];

    expect((result[0].props as any)["data-src"]).toBe("https://frontity.org");
    expect((result[0].props as any).dataSrc).toBeUndefined();
  });
});
