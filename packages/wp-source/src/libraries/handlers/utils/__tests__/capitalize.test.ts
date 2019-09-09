import capitalize from "../capitalize";

describe("capitalize", () => {
  test("should work with a single word", () => {
    expect(capitalize("word")).toBe("Word");
  });
  test("should work with words separated by ' '", () => {
    expect(capitalize("some word")).toBe("SomeWord");
  });
  test("should work with words separated by '-'", () => {
    expect(capitalize("other-some-word")).toBe("OtherSomeWord");
  });
  test("should work with words separated by '_'", () => {
    expect(capitalize("another_some_word")).toBe("AnotherSomeWord");
  });
  test("should work with words separated by any number of  ' ', '-' or '_'", () => {
    expect(capitalize("Some str---Cap _- test")).toBe("SomeStrCapTest");
  });
});
