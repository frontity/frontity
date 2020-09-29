import snakeToCamel from "../snake-to-camel";

describe("snakeToCamel", () => {
  it("should work with underscores", () => {
    expect(snakeToCamel("some_thing")).toBe("someThing");
  });

  it("should work with hyphens", () => {
    expect(snakeToCamel("some-thing")).toBe("someThing");
  });

  it("should work with numbers", () => {
    expect(snakeToCamel("some_thing_0x_extra")).toBe("someThing0xExtra");
  });

  it("should work with points", () => {
    expect(snakeToCamel("some_.thing")).toBe("some.thing");
  });

  it("should work with ~", () => {
    expect(snakeToCamel("some_~thing")).toBe("some~thing");
  });
});
