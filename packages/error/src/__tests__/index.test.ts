import { warn, error } from "..";

beforeEach(() => {
  process.env.NODE_ENV = "test";
});

describe("error", () => {
  test("In development, throw the full message", () => {
    expect(() => error("This is wrong")).toThrow(
      new Error(
        "This is wrong\nVisit https://community.frontity.org for help! 🙂\n"
      )
    );
  });

  test("In production, throw the short message", () => {
    process.env.NODE_ENV = "production";
    expect(() => error("This is wrong")).toThrow(new Error("This is wrong"));
  });

  test("In development, console.error the full message", () => {
    console.error = jest.fn();
    expect(() => error("This is wrong", { throw: false })).not.toThrow();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenLastCalledWith(
      "This is wrong\nVisit https://community.frontity.org for help! 🙂\n"
    );
  });

  test("In production, console.error the short message", () => {
    process.env.NODE_ENV = "production";
    console.error = jest.fn();
    expect(() => error("This is wrong", { throw: false })).not.toThrow();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenLastCalledWith("This is wrong");
  });
});

describe("warn", () => {
  test("In development, warn the full message", () => {
    console.warn = jest.fn();
    warn("This is a warning");
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      "This is a warning\nVisit https://community.frontity.org for help! 🙂\n"
    );
  });

  test("In production, do not warn", () => {
    process.env.NODE_ENV = "production";
    console.warn = jest.fn();
    warn("This is a warning");
    expect(console.warn).toHaveBeenCalledTimes(0);
  });
});
