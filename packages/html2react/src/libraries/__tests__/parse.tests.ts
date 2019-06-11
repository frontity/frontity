import parse from "../parse";
import htmlMock from "./mocks/html";

describe("parse", () => {
  test("should return the right HTML tree", () => {
    const result = parse(htmlMock, (text: string): string => text);
    expect(result).toMatchSnapshot();
  });
});
