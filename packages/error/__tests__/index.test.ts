import { warn, error } from "..";

describe("@frontity/error", () => {
  test("In development, throw the full message", () => {
    console.error = jest.fn();
    error("This is wrong");

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenLastCalledWith(
      "This is wrong\nVisit https://community.frontity.org for help! 🙂"
    );
  });
});
