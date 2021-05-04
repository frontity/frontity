import { isExternalUrl, removeSourceUrl } from "../utils";

describe("removeSourceUrl", () => {
  it("removes source url", () => {
    expect(
      removeSourceUrl({
        link: "http://backendurl.com/post-name-1",
        sourceUrl: "https://backendurl.com",
      })
    ).toEqual("/post-name-1");

    expect(
      removeSourceUrl({
        link: "https://backendurl.com/post-name-1/",
        sourceUrl: "http://backendurl.com",
      })
    ).toEqual("/post-name-1/");

    expect(
      removeSourceUrl({
        link: "https://backendurl.com/post-name-1",
        sourceUrl: "https://backendurl.com",
      })
    ).toEqual("/post-name-1");

    expect(
      removeSourceUrl({
        link: "http://backendurl.com/post-name-1",
        sourceUrl: "https://backendurl.com/",
      })
    ).toEqual("/post-name-1");

    expect(
      removeSourceUrl({
        link: "http://backendurl.com/post-name-1?a=1&b=3&d=3",
        sourceUrl: "https://backendurl.com/",
      })
    ).toEqual("/post-name-1?a=1&b=3&d=3");

    expect(
      removeSourceUrl({
        link: "http://backendurl.com/post-name-1#id",
        sourceUrl: "https://backendurl.com/",
      })
    ).toEqual("/post-name-1#id");
  });

  it("removes source url when the backend url contains a folder", () => {
    expect(
      removeSourceUrl({
        link: "http://backendurl.com/folder/post-name-1",
        sourceUrl: "https://backendurl.com/folder",
      })
    ).toEqual("/post-name-1");

    expect(
      removeSourceUrl({
        link: "http://backendurl.com/folder/post-name-1/",
        sourceUrl: "https://backendurl.com/folder",
      })
    ).toEqual("/post-name-1/");

    expect(
      removeSourceUrl({
        link: "https://backendurl.com/folder/post-name-1",
        sourceUrl: "https://backendurl.com/folder",
      })
    ).toEqual("/post-name-1");

    expect(
      removeSourceUrl({
        link: "http://backendurl.com/folder/post-name-1",
        sourceUrl: "https://backendurl.com/folder/",
      })
    ).toEqual("/post-name-1");

    expect(
      removeSourceUrl({
        link: "http://backendurl.com/folder/post-name-1?a=1&b=3&d=3",
        sourceUrl: "https://backendurl.com/folder",
      })
    ).toEqual("/post-name-1?a=1&b=3&d=3");

    expect(
      removeSourceUrl({
        link: "http://backendurl.com/folder/post-name-1#id",
        sourceUrl: "https://backendurl.com/folder/",
      })
    ).toEqual("/post-name-1#id");
  });

  it("adds subdirectory if frontity url contains it", () => {
    expect(
      removeSourceUrl({
        link: "http://backendurl.com/folder/post-name-1",
        sourceUrl: "https://backendurl.com/folder",
        frontityUrl: "https://frontityurl.com/subdir/",
      })
    ).toEqual("/subdir/post-name-1");

    expect(
      removeSourceUrl({
        link: "http://backendurl.com/folder/post-name-1/",
        sourceUrl: "https://backendurl.com/folder",
        frontityUrl: "http://frontityurl.com/subdir/",
      })
    ).toEqual("/subdir/post-name-1/");

    expect(
      removeSourceUrl({
        link: "https://backendurl.com/folder/post-name-1",
        sourceUrl: "https://backendurl.com/folder",
        frontityUrl: "https://frontityurl.com/subdir",
      })
    ).toEqual("/subdir/post-name-1");

    expect(
      removeSourceUrl({
        link: "http://backendurl.com/folder/post-name-1",
        sourceUrl: "https://backendurl.com/folder/",
        frontityUrl: "http://frontityurl.com/subdir",
      })
    ).toEqual("/subdir/post-name-1");

    expect(
      removeSourceUrl({
        link: "http://backendurl.com/folder/post-name-1?a=1&b=3&d=3",
        sourceUrl: "https://backendurl.com/folder",
        frontityUrl: "https://frontityurl.com/subdir/",
      })
    ).toEqual("/subdir/post-name-1?a=1&b=3&d=3");

    expect(
      removeSourceUrl({
        link: "http://backendurl.com/folder/post-name-1#id",
        sourceUrl: "https://backendurl.com/folder/",
        frontityUrl: "http://frontityurl.com/subdir/",
      })
    ).toEqual("/subdir/post-name-1#id");
  });
});

describe("isExternalUrl", () => {
  it("checks for mailto links", () => {
    expect(isExternalUrl("mailto:email@domain.com")).toBe(true);
    expect(
      isExternalUrl(
        "mailto:email@domain.com?subject=The%20subject&body=This%20is%20a%20message%20body"
      )
    ).toBe(true);
    expect(isExternalUrl("mailto:name1@mail.com,name2@mail.com")).toBe(true);
  });

  it("checks for tel and sms links", () => {
    expect(isExternalUrl("tel:1-562-867-5309")).toBe(true);
    expect(
      isExternalUrl(
        "sms:+18664504185&body=Hi%2520there%252C%2520I%2527d%2520like%2520to%2520place%2520an%2520order%2520for..."
      )
    ).toBe(true);
  });

  it("checks for absolute urls", () => {
    expect(isExternalUrl("http://url.com")).toBe(true);
    expect(isExternalUrl("https://url.com")).toBe(true);
  });

  it("returns false for relative (internal) urls", () => {
    expect(isExternalUrl("/post-name")).toBe(false);
    expect(isExternalUrl("/page-name")).toBe(false);
  });
});
