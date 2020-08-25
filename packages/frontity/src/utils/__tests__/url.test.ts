import FrontityURL from "../url";

describe("URL", () => {
  it("should work like the built-in URL", () => {
    const url = "https://domain.com/path?query=a";
    expect(new FrontityURL(url)).toEqual(new URL(url));
  });

  it("should warn with the deprecation message", () => {
    const warn = jest.spyOn(global.console, "warn");
    new FrontityURL("http://domain.com");
    expect(warn).toHaveBeenCalledTimes(1);
  });
});
