import { getMatch } from "../get-match";

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
    func: () => "/about-us/",
  },
  {
    name: "",
    priority: 10,
    pattern: "/posts/",
    func: () => "/",
  },
  {
    name: "",
    priority: 10,
    pattern: "/wp-cat/:subpath+",
    func: ({ subpath }) => `/category/${subpath}/`,
  },
  {
    name: "",
    priority: 10,
    pattern: "/category/(.*)",
    func: () => "",
  },
  {
    name: "",
    priority: 10,
    pattern: "/blog/:subpath*/",
    func: ({ subpath = "" }) => `/${subpath}${subpath ? "/" : ""}`,
  },
];

const redirect = (path, redirections) => {
  const match = getMatch(path, redirections);
  if (!match) return path;
  return match.func(match.params);
};

// Add redirects
describe("getMatch", () => {
  test("redirects different routes", async () => {
    expect(redirect("/", redirections)).toBe("/about-us/");
    expect(redirect("/about-us/", redirections)).toBe("/about-us/");
    expect(redirect("/posts/", redirections)).toBe("/");
    expect(redirect("/wp-cat/nature/", redirections)).toBe("/category/nature/");
    expect(redirect("/wp-cat/nature/forests", redirections)).toBe(
      "/category/nature/forests/"
    );
    expect(redirect("/category/nature", redirections)).toBe("");
    expect(redirect("/blog/", redirections)).toBe("/");
    expect(redirect("/blog/some-post/", redirections)).toBe("/some-post/");
  });
});
