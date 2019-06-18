import Resolver from "../resolver";

// Some redirections
const redirects = [
  {
    pattern: "/",
    redirect: () => "/about-us/"
  },
  {
    pattern: "/posts/",
    redirect: () => "/"
  },
  {
    pattern: "/wp-cat/:subpath+",
    redirect: ({ subpath }) => `/category/${subpath}/`
  },
  {
    pattern: "/category/(.*)",
    redirect: () => ""
  },
  {
    pattern: "/blog/:subpath*/",
    redirect: ({ subpath = "" }) => `/${subpath}${subpath ? "/" : ""}`
  }
];

// Add redirects
const resolver = new Resolver();
redirects.forEach(({ pattern, redirect }) => {
  resolver.addRedirect({ pattern, redirect });
});

describe("resolver", () => {
  test("redirects different routes", async () => {
    expect(resolver.redirect("/")).toBe("/about-us/");
    expect(resolver.redirect("/about-us/")).toBe("/about-us/");
    expect(resolver.redirect("/posts/")).toBe("/");
    expect(resolver.redirect("/wp-cat/nature/")).toBe("/category/nature/");
    expect(resolver.redirect("/wp-cat/nature/forests")).toBe(
      "/category/nature/forests/"
    );
    expect(resolver.redirect("/category/nature")).toBe("");
    expect(resolver.redirect("/blog/")).toBe("/");
    expect(resolver.redirect("/blog/some-post/")).toBe("/some-post/");
  });
});
