import msg from "..";

describe("msg", () => {
  test("should output a string in the correct format", () => {
    expect(msg("Something bad happened!")).toMatchSnapshot();
  });
});
