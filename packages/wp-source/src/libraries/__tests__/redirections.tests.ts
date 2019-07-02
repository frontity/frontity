import { redirect } from "../redirect";

// Add redirects
describe("redirect", () => {
  test("redirects different routes (same priority)", () => {
    // Some redirections
    const redirections: {
      name: string;
      priority: number;
      pattern: string;
      func: (params: Record<string, string>) => string;
    }[] = [
      {
        name: "",
        priority: 10,
        pattern: "/",
        func: () => "/about-us/"
      },
      {
        name: "",
        priority: 10,
        pattern: "/posts/",
        func: () => "/"
      },
      {
        name: "",
        priority: 10,
        pattern: "/wp-cat/:subpath+",
        func: ({ subpath }) => `/category/${subpath}/`
      },
      {
        name: "",
        priority: 10,
        pattern: "/category/(.*)",
        func: () => ""
      }
    ];

    expect(redirect("/", redirections)).toBe("/about-us/");
    expect(redirect("/about-us/", redirections)).toBe("/about-us/");
    expect(redirect("/posts/", redirections)).toBe("/");
    expect(redirect("/wp-cat/nature/", redirections)).toBe("/category/nature/");
    expect(redirect("/wp-cat/nature/forests", redirections)).toBe(
      "/category/nature/forests/"
    );
    expect(redirect("/category/nature", redirections)).toBe("");
  });

  test("executes redirections in priority order", () => {
    // Some redirections
    const redirections: {
      name: string;
      priority: number;
      pattern: string;
      func: (params: Record<string, string>) => string;
    }[] = [
      {
        name: "",
        priority: 0,
        pattern: "/:mainpath+/amp/",
        func: ({ mainpath }) => `/${mainpath}/`
      },
      {
        name: "",
        priority: 0,
        pattern: "/(.*)",
        func: () => ""
      },
      {
        name: "",
        priority: 10,
        pattern: "/subdir/:subpath*",
        func: ({ subpath }) => (subpath ? `/${subpath}/` : "/")
      },
      {
        name: "",
        priority: 10,
        pattern: "/(.*)",
        func: () => ""
      },
      {
        name: "",
        priority: 20,
        pattern: "/wp-cat/:subpath+",
        func: ({ subpath }) => `/category/${subpath}/`
      },
      {
        name: "",
        priority: 20,
        pattern: "/category/(.*)",
        func: () => ""
      }
    ];
    expect(redirect("/", redirections)).toBe("");
    expect(redirect("/posts/", redirections)).toBe("");
    expect(redirect("/subdir/", redirections)).toBe("");
    expect(redirect("/amp/", redirections)).toBe("");
    expect(redirect("/subdir/amp/", redirections)).toBe("/");
    expect(redirect("/subdir/posts/amp/", redirections)).toBe("/posts/");
    expect(
      redirect("/subdir/the-beauties-of-gullfoss/amp/", redirections)
    ).toBe("/the-beauties-of-gullfoss/");
    expect(redirect("/subdir/wp-cat/nature/amp/", redirections)).toBe(
      "/category/nature/"
    );
    expect(redirect("/subdir/wp-cat/nature/forests/amp/", redirections)).toBe(
      "/category/nature/forests/"
    );
    expect(redirect("/subdir/category/nature/amp/", redirections)).toBe("");
  });
});
