import { Response } from "node-fetch";
import { getTotal, getTotalPages } from "../response-utils";

describe("response utils - getTotal", () => {
  test("retrives result from header", () => {
    const response = new Response();
    response.headers.get = jest.fn(() => "1");
    expect(getTotal(response, 0)).toBe(1);
  });
});
