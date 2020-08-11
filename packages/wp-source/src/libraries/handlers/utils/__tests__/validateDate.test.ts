import validateDate from "../../utils/validateDate";

describe("validate date", () => {
  test("2020/01/01", () => {
    validateDate(2020, 1, 1);
  });

  test("2019 is not a leap year", () => {
    expect(() => {
      validateDate(2019, 2, 29);
    }).toThrowErrorMatchingInlineSnapshot(`"29 is a wrong day number"`);
  });

  test("2020 is a leap year", () => {
    validateDate(2020, 2, 29);
  });

  test("Invalid year", () => {
    expect(() => {
      validateDate(2222, 2, 2);
    }).toThrowErrorMatchingInlineSnapshot(`"2222 is a wrong year number"`);
  });

  test("Invalid month", () => {
    expect(() => {
      validateDate(2019, 0, 15);
    }).toThrowErrorMatchingInlineSnapshot(`"0 is a wrong month number"`);
  });

  test("Invalid day", () => {
    expect(() => {
      validateDate(2019, 2, 0);
    }).toThrowErrorMatchingInlineSnapshot(`"0 is a wrong day number"`);
  });
});
