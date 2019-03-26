import normalizeSettings from "../normalizeSettings";
import * as validateSettings from "../validateSettings";
import mockedMonoSettings from "./mocks/normalizeSettings/monoSettings.json";
import mockedMultiSettings from "./mocks/normalizeSettings/multiSettings.json";
import expectedMono from "./mocks/normalizeSettings/expectedMono.json";
import expectedMulti from "./mocks/normalizeSettings/expectedMulti.json";

jest.mock("../validateSettings");

describe("normalizeSettings", () => {
  test("should work when param `settings` is an object", () => {
    const result = normalizeSettings(mockedMonoSettings);
    expect(validateSettings.default).toHaveBeenCalled();
    expect(result).toEqual(expectedMono);
  });

  test("should work when param `settings` is an array", () => {
    const result = normalizeSettings(mockedMultiSettings);
    expect(validateSettings.default).toHaveBeenCalled();
    expect(result).toEqual(expectedMulti);
  });
});
