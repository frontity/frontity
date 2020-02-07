import decodeServer from "./server";
import decodeClient from "./client";

describe("decode", () => {
  test("works on server", () => {
    const result = decodeServer("&amp;");
    expect(result).toBe("&");
  });

  test("works on client", () => {
    const result = decodeClient("&amp;");
    expect(result).toBe("&");
  });

  test("client preserves the whitespace", () => {
    const result = decodeClient("  &amp; ");
    expect(result).toBe("  & ");
  });

  test("server preserves the whitespace", () => {
    const result = decodeServer("  &amp; ");
    expect(result).toBe("  & ");
  });
});
