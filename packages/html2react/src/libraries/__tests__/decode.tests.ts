import decodeServer from "../decode/server";
import decodeClient from "../decode/client";

describe("decode", () => {
  test("works on server", () => {
    const result = decodeServer("&amp;");
    expect(result).toBe("&");
  });

  test("works on client", () => {
    const result = decodeClient("&amp;");
    expect(result).toBe("&");
  });
});
