import { parse, stringify } from "../route-utils";

describe("route utils - parse", () => {
  test("from params (fixes path)", () => {
    expect(parse({ path: "/some/path" })).toEqual({
      path: "/some/path/",
      page: 1,
      query: {}
    });
  });
  test("from params (path is a name)", () => {
    expect(parse({ path: "custom-list" })).toEqual({
      path: "custom-list/",
      page: 1,
      query: {}
    });
  });
  test("from params (path, page)", () => {
    expect(parse({ path: "/some/path/", page: 2 })).toEqual({
      path: "/some/path/",
      page: 2,
      query: {}
    });
  });
  test("from params (path, page, query)", () => {
    expect(
      parse({
        path: "/some/path",
        page: 2,
        query: {
          k1: "v1",
          k2: "v2"
        }
      })
    ).toEqual({
      path: "/some/path/",
      page: 2,
      query: {
        k1: "v1",
        k2: "v2"
      }
    });
  });
  test("from params (root, page, query)", () => {
    expect(
      parse({
        path: "/",
        page: 2,
        query: {
          k1: "v1",
          k2: "v2"
        }
      })
    ).toEqual({
      path: "/",
      page: 2,
      query: {
        k1: "v1",
        k2: "v2"
      }
    });
  });
  test("from path", () => {
    expect(parse("/some/path/")).toEqual({
      path: "/some/path/",
      page: 1,
      query: {}
    });
  });
  test("from path (contains 'page')", () => {
    expect(parse("/some-page/page/2")).toEqual({
      path: "/some-page/",
      page: 2,
      query: {}
    });
  });
  test("from path (fixes path)", () => {
    expect(parse("/some/path")).toEqual({
      path: "/some/path/",
      page: 1,
      query: {}
    });
  });
  test("from path and page", () => {
    expect(parse("/some/path/page/2/")).toEqual({
      path: "/some/path/",
      page: 2,
      query: {}
    });
  });
  test("from path and query", () => {
    expect(parse("/some/path/?k1=v1&k2=v2")).toEqual({
      path: "/some/path/",
      page: 1,
      query: {
        k1: "v1",
        k2: "v2"
      }
    });
  });
  test("from path, page and query", () => {
    expect(parse("/some/path/page/2?k1=v1&k2=v2")).toEqual({
      path: "/some/path/",
      page: 2,
      query: {
        k1: "v1",
        k2: "v2"
      }
    });
  });
  test("from root path", () => {
    expect(parse("/")).toEqual({
      path: "/",
      page: 1,
      query: {}
    });
  });
  test("from root path and page", () => {
    expect(parse("/page/2/")).toEqual({
      path: "/",
      page: 2,
      query: {}
    });
  });
  test("from root path, page and query", () => {
    expect(parse("/page/2?k1=v1&k2=v2")).toEqual({
      path: "/",
      page: 2,
      query: {
        k1: "v1",
        k2: "v2"
      }
    });
  });
  test("from full URL", () => {
    expect(parse("https://test.frontity.org/some/path/?k1=v1&k2=v2")).toEqual({
      path: "/some/path/",
      page: 1,
      query: {
        k1: "v1",
        k2: "v2"
      }
    });
  });
  test("from name", () => {
    expect(parse("custom-list")).toEqual({
      path: "custom-list/",
      page: 1,
      query: {}
    });
  });
  test("from name (page)", () => {
    expect(parse("custom-list/page/2")).toEqual({
      path: "custom-list/",
      page: 2,
      query: {}
    });
  });
});

describe("route utils - stringify", () => {
  test("from params (fixes path)", () => {
    expect(stringify({ path: "/some/path" })).toBe("/some/path/");
  });
  test("from params (path is a name)", () => {
    expect(stringify({ path: "custom-list" })).toBe("custom-list/");
  });
  test("from params (path, page)", () => {
    expect(stringify({ path: "/some/path/", page: 2 })).toBe(
      "/some/path/page/2/"
    );
  });
  test("from params (path, page, query)", () => {
    expect(
      stringify({
        path: "/some/path",
        page: 2,
        query: {
          k1: "v1",
          k2: "v2"
        }
      })
    ).toBe("/some/path/page/2/?k1=v1&k2=v2");
  });
  test("from params (root, page, query)", () => {
    expect(
      stringify({
        path: "/",
        page: 2,
        query: {
          k1: "v1",
          k2: "v2"
        }
      })
    ).toBe("/page/2/?k1=v1&k2=v2");
  });
  test("from path", () => {
    expect(stringify("/some/path/")).toBe("/some/path/");
  });
  test("from path (contains 'page')", () => {
    expect(stringify("/some-page/")).toBe("/some-page/");
  });
  test("from path (fixes path)", () => {
    expect(stringify("/some/path")).toBe("/some/path/");
  });
  test("from path and page", () => {
    expect(stringify("/some/path/page/2/")).toBe("/some/path/page/2/");
  });
  test("from path and query", () => {
    expect(stringify("/some/path/?k1=v1&k2=v2")).toBe(
      "/some/path/?k1=v1&k2=v2"
    );
  });
  test("from path, page and query", () => {
    expect(stringify("/some/path/page/2?k1=v1&k2=v2")).toBe(
      "/some/path/page/2/?k1=v1&k2=v2"
    );
  });

  test("from root path", () => {
    expect(stringify("/")).toEqual("/");
  });
  test("from root path and page", () => {
    expect(stringify("/page/2")).toEqual("/page/2/");
  });
  test("from root path, page and query", () => {
    expect(stringify("/page/2?k1=v1&k2=v2")).toEqual("/page/2/?k1=v1&k2=v2");
  });
  test("from full URL", () => {
    expect(
      stringify("https://test.frontity.org/some/path/page/2?k1=v1&k2=v2")
    ).toBe("/some/path/page/2/?k1=v1&k2=v2");
  });
  test("from name", () => {
    expect(stringify("custom-list")).toBe("custom-list/");
  });
  test("from name (page)", () => {
    expect(stringify("custom-list/page/2/")).toBe("custom-list/page/2/");
  });
});
