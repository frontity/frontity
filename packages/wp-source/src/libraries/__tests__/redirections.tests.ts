import Resolver from "../resolver";

// Some redirections
const redirects: {
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
  },
  {
    name: "",
    priority: 10,
    pattern: "/blog/:subpath*/",
    func: ({ subpath = "" }) => `/${subpath}${subpath ? "/" : ""}`
  }
];

// Add redirects
const resolver = new Resolver();
redirects.forEach(patternObj => {
  resolver.addRedirect(patternObj);
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
