import decodeServer from "./server";
import decodeClient from "./client";
import * as he from "he";

jest.mock("he");

const mockedHe = he as jest.Mocked<typeof he>;

describe("decode", () => {
  beforeEach(() => {
    mockedHe.decode.mockReset();
    mockedHe.decode.mockImplementation(require.requireActual("he").decode);
  });

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

  test("handles different characters", () => {
    const result = decodeServer("&equiv; &gamma;");
    expect(result).toBe("≡ γ");
  });

  test("call he.decode if html contains a character that basic decode cannot not handle", () => {
    decodeServer("&nbsp; &Bscr;");
    expect(mockedHe.decode).toHaveBeenCalledTimes(1);
  });

  test("does not call he.decode if html contains a character that we can handle with basic decode", () => {
    const result = decodeServer(" &amp; &apos;");
    expect(result).toBe(" & '");

    expect(mockedHe.decode).toHaveBeenCalledTimes(0);
  });
});
