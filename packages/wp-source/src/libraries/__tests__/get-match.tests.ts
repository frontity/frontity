/* eslint-disable @typescript-eslint/no-empty-function */
import { getMatch } from "../get-match";

describe("getMatch", () => {
  describe("pattern", () => {
    it("should match a normal pattern", () => {
      expect(
        getMatch({ route: "/" }, [
          {
            pattern: "/",
            name: "home",
            func: () => {},
            priority: 10,
          },
        ]).name
      ).toBe("home");
    });

    it("should respect priorities", () => {
      expect(
        getMatch({ route: "/" }, [
          {
            pattern: "/",
            name: "home",
            func: () => {},
            priority: 10,
          },
          {
            pattern: "/",
            name: "home-with-higher-priority",
            func: () => {},
            priority: 9,
          },
        ]).name
      ).toBe("home-with-higher-priority");
    });

    it("should match complex patterns", () => {
      expect(
        getMatch({ route: "/category/nature" }, [
          {
            pattern: "/",
            name: "home",
            func: () => {},
            priority: 10,
          },
          {
            pattern: "/category/:slug",
            name: "category",
            func: () => {},
            priority: 20,
          },
        ]).name
      ).toBe("category");
    });

    it("should return parameters", () => {
      expect(
        getMatch({ route: "/some-post" }, [
          {
            pattern: "/:slug",
            name: "post",
            func: () => {},
            priority: 10,
          },
        ]).params.slug
      ).toBe("some-post");
    });

    it("should return nested parameters", () => {
      expect(
        getMatch({ route: "/some-category/some-post" }, [
          {
            pattern: "/(.*)?/:slug",
            name: "post",
            func: () => {},
            priority: 10,
          },
        ]).params.slug
      ).toBe("some-post");
    });

    it("should return null if there's no match", () => {
      expect(
        getMatch({ route: "/some-post" }, [
          {
            pattern: "/",
            name: "home",
            func: () => {},
            priority: 10,
          },
        ])
      ).toBe(null);
    });

    it("should ignore queries when using pattern", () => {
      expect(
        getMatch({ route: "/some-post/" }, [
          {
            pattern: "/(.*)?/:slug",
            name: "post",
            func: () => {},
            priority: 10,
          },
        ]).name
      ).toBe("post");
    });

    it("should match the correct handler and not be confused by the query", () => {
      expect(
        getMatch({ route: "/some-type/some-post" }, [
          {
            pattern: "/some-type/:postSlug/:attachmentSlug",
            name: "some-type attachment",
            func: () => {},
            priority: 10,
          },
          {
            pattern: "/some-type/:slug",
            name: "some-type",
            func: () => {},
            priority: 10,
          },
        ]).name
      ).toBe("some-type");
    });
  });

  describe("regexp", () => {
    it("should work with regexps", () => {
      expect(
        getMatch({ link: "/some-post" }, [
          {
            pattern: "RegExp:/some-post",
            name: "post",
            func: () => {},
            priority: 10,
          },
        ]).name
      ).toBe("post");
    });

    it("should work with queries", () => {
      expect(
        getMatch({ link: "/some-post/?some-query=some-value" }, [
          {
            pattern: "RegExp:(\\?|&)some-query=",
            name: "post",
            func: () => {},
            priority: 10,
          },
        ]).name
      ).toBe("post");
    });

    it("should return named capture groups", () => {
      expect(
        getMatch(
          { link: "/some-post/?some-query=some-value&other-query=other-value" },
          [
            {
              pattern: "RegExp:(\\?|&)some-query=(?<someQuery>[^&$]+)",
              name: "post",
              func: () => {},
              priority: 10,
            },
          ]
        ).params.someQuery
      ).toBe("some-value");
    });
  });

  describe("combined", () => {
    it("should work with queries", () => {
      expect(
        getMatch(
          { link: "/some-post/?some-query=some-value", route: "/some-post/" },
          [
            {
              pattern: "RegExp:(\\?|&)some-query=",
              name: "post by regexp",
              func: () => {},
              priority: 10,
            },
            {
              pattern: "/some-post/",
              name: "post by path",
              func: () => {},
              priority: 10,
            },
          ]
        ).name
      ).toBe("post by regexp");
    });
  });
});
