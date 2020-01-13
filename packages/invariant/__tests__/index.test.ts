import { invariant } from "..";

describe("@frontity/invariant", () => {
  test("In development, throw the full message", () => {
    try {
      invariant(false, "This is wrong");
    } catch (err) {
      expect(err.message).toEqual(
        "Visit https://community.frontity.org for help! 🙂\nThis is wrong"
      );
      expect(err.name).toEqual("Invariant failed");
    }
  });

  test("In production, the msg argument is stripped out ", () => {
    const errorMessage =
      "Minified exception occurred; use the non-minified dev environment " +
      "for the full error message and additional helpful warnings.";
    try {
      // It's too much hassle actualy simulating the production env in a test, so I just pass undefined as the second argument. Babel will transpile the invariant according to https://www.npmjs.com/package/babel-plugin-dev-expression
      invariant(false, undefined);
    } catch (err) {
      expect(err.message).toEqual(errorMessage);
      expect(err.name).toEqual("Invariant failed");
    }
  });
});
