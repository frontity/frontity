import { removeWPUrl } from "../utils";

describe("removeWPUrl", () => {
  it("removes wp url", () => {
    expect(
      removeWPUrl("http://backendurl.com/post-name-1", "https://backendurl.com")
    ).toEqual("/post-name-1");

    expect(
      removeWPUrl(
        "https://backendurl.com/post-name-1",
        "https://backendurl.com"
      )
    ).toEqual("/post-name-1");

    expect(
      removeWPUrl(
        "http://backendurl.com/post-name-1",
        "https://backendurl.com/"
      )
    ).toEqual("/post-name-1");

    expect(
      removeWPUrl(
        "http://backendurl.com/post-name-1?a=1&b=3&d=3",
        "https://backendurl.com/"
      )
    ).toEqual("/post-name-1?a=1&b=3&d=3");

    expect(
      removeWPUrl(
        "http://backendurl.com/post-name-1#id",
        "https://backendurl.com/"
      )
    ).toEqual("/post-name-1#id");
  });
});
