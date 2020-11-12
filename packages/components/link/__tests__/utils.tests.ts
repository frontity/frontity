import { removeSourceUrl } from "../utils";

describe("removeSourceUrl", () => {
  it("removes source url", () => {
    expect(
      removeSourceUrl(
        "http://backendurl.com/post-name-1",
        "https://backendurl.com"
      )
    ).toEqual("/post-name-1");

    expect(
      removeSourceUrl(
        "https://backendurl.com/post-name-1/",
        "http://backendurl.com"
      )
    ).toEqual("/post-name-1/");

    expect(
      removeSourceUrl(
        "https://backendurl.com/post-name-1",
        "https://backendurl.com"
      )
    ).toEqual("/post-name-1");

    expect(
      removeSourceUrl(
        "http://backendurl.com/post-name-1",
        "https://backendurl.com/"
      )
    ).toEqual("/post-name-1");

    expect(
      removeSourceUrl(
        "http://backendurl.com/post-name-1?a=1&b=3&d=3",
        "https://backendurl.com/"
      )
    ).toEqual("/post-name-1?a=1&b=3&d=3");

    expect(
      removeSourceUrl(
        "http://backendurl.com/post-name-1#id",
        "https://backendurl.com/"
      )
    ).toEqual("/post-name-1#id");
  });

  it("removes source url when the backend url contains a folder", () => {
    expect(
      removeSourceUrl(
        "http://backendurl.com/folder/post-name-1",
        "https://backendurl.com/folder"
      )
    ).toEqual("/folder/post-name-1");

    expect(
      removeSourceUrl(
        "http://backendurl.com/folder/post-name-1/",
        "https://backendurl.com/folder"
      )
    ).toEqual("/folder/post-name-1/");

    expect(
      removeSourceUrl(
        "https://backendurl.com/folder/post-name-1",
        "https://backendurl.com/folder"
      )
    ).toEqual("/folder/post-name-1");

    expect(
      removeSourceUrl(
        "http://backendurl.com/folder/post-name-1",
        "https://backendurl.com/folder/"
      )
    ).toEqual("/folder/post-name-1");

    expect(
      removeSourceUrl(
        "http://backendurl.com/folder/post-name-1?a=1&b=3&d=3",
        "https://backendurl.com/folder"
      )
    ).toEqual("/folder/post-name-1?a=1&b=3&d=3");

    expect(
      removeSourceUrl(
        "http://backendurl.com/folder/post-name-1#id",
        "https://backendurl.com/folder/"
      )
    ).toEqual("/folder/post-name-1#id");
  });
});
