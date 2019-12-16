import { FrontityError } from "..";

describe("FrontityError", () => {
  test("should output an error message in the correct format", () => {
    const error = new FrontityError("Something bad happend!");

    expect(error.toString()).toMatchSnapshot();
    expect(() => {
      throw error;
    }).toThrowErrorMatchingSnapshot();
  });
});
