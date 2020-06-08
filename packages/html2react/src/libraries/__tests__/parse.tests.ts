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
});
