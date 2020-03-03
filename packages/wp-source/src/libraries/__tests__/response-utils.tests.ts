import { Response as NodeResponse } from "node-fetch";
import { getTotal } from "../response-utils";

describe("response utils - getTotal", () => {
  test("retrives result from header", () => {
    const response = (new NodeResponse() as any) as Response;
    response.headers.get = jest.fn(() => "1");
    expect(getTotal(response, 0)).toBe(1);
  });
});
