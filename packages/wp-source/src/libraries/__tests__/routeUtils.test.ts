import { normalize, routeToParams, paramsToRoute } from "../routeUtils";

describe("route utils - normalize", () => {
  test("normalizes path (w/ slash)", () => {
    expect(normalize("/some/path/")).toBe("/some/path/");
  });
  test("normalizes path (w/out slash)", () => {
    expect(normalize("/some/path")).toBe("/some/path/");
  });
  test("normalizes path and page (w/ slash)", () => {
    expect(normalize("/some/path/page/2/")).toBe("/some/path/page/2/");
  });
  test("normalizes path and page (w/out slash)", () => {
    expect(normalize("/some/path/page/2")).toBe("/some/path/page/2/");
  });
  test("normalizes path and query", () => {
    expect(normalize("/some/path?k1=v1&k2=v2")).toBe("/some/path/?k1=v1&k2=v2");
  });
  test("normalizes path, page and query", () => {
    expect(normalize("/some/path/page/2?k1=v1&k2=v2")).toBe(
      "/some/path/page/2/?k1=v1&k2=v2"
    );
  });
  test("extracts path from URL", () => {
    expect(
      normalize("https://test.frontity.io/some/path/page/2?k1=v1&k2=v2")
    ).toBe("/some/path/page/2/?k1=v1&k2=v2");
  });
});

describe("route utils - routeToParams", () => {
  test("extracts params (w/out domain)", () => {
    expect(routeToParams("/some/path/page/2?k1=v1&k2=v2")).toMatchObject({
      path: "/some/path/",
      page: 2,
      query: "?k1=v1&k2=v2"
    });
  });
  test("extracts params (w/ domain)", () => {
    expect(
      routeToParams("https://test.frontity.io/some/path/page/2?k1=v1&k2=v2")
    ).toMatchObject({
      path: "/some/path/",
      page: 2,
      query: "?k1=v1&k2=v2"
    });
  });
});

describe("route utils - paramsToRoute", () => {
  test("converts to route (path)", () => {
    expect(
      paramsToRoute({
        path: "/some/path/"
      })
    ).toBe("/some/path/");
  });
  test("converts to route (path, page)", () => {
    expect(
      paramsToRoute({
        path: "/some/path/",
        page: 2
      })
    ).toBe("/some/path/page/2/");
  });
  test("converts to route (path, query)", () => {
    expect(
      paramsToRoute({
        path: "/some/path/",
        query: "?k1=v1&k2=v2"
      })
    ).toBe("/some/path/?k1=v1&k2=v2");
  });
  test("converts to route (path, page, query)", () => {
    expect(
      paramsToRoute({
        path: "/some/path/",
        page: 2,
        query: "?k1=v1&k2=v2"
      })
    ).toBe("/some/path/page/2/?k1=v1&k2=v2");
  });
});
