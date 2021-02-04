import { wpCom } from "../patterns";
import { getMatch } from "../get-match";
import * as handlers from "../handlers";

// Add handlers
const wpComHandlers = [...wpCom];

describe("getMatch (wp.com patterns)", () => {
  // pattern: "/",
  // handler: postArchive
  test("post archive", () => {
    const { func, params } = getMatch("/", wpComHandlers);
    expect(func).toBe(handlers.postArchive);
    expect(params).toMatchObject({});
  });

  // pattern: "/category/:slug",
  // handler: category
  test("category", () => {
    const { func, params } = getMatch("/category/nature", wpComHandlers);
    expect(func).toBe(handlers.category);
    expect(params).toMatchObject({ slug: "nature" });
  });

  // pattern: "/category/(.*)/:slug", // subcategories
  // handler: category
  test("subcategory", () => {
    const { func, params } = getMatch(
      "/category/nature/subcat/subsubcat",
      wpComHandlers
    );
    expect(func).toBe(handlers.category);
    expect(params).toMatchObject({ slug: "subsubcat" });
  });

  // pattern: "/tag/:slug",
  // handler: tag
  test("tag", () => {
    const { func, params } = getMatch("/tag/japan", wpComHandlers);
    expect(func).toBe(handlers.tag);
    expect(params).toMatchObject({ slug: "japan" });
  });

  // pattern: "/author/:slug",
  // handler: author
  test("author", () => {
    const { func, params } = getMatch("/author/luisherranz", wpComHandlers);
    expect(func).toBe(handlers.author);
    expect(params).toMatchObject({ slug: "luisherranz" });
  });

  // pattern: "/:year(\\d+)/:month(\\d+)?/:day(\\d+)?",
  // handler: date
  test("date (year)", () => {
    const { func, params } = getMatch("/2016", wpComHandlers);
    expect(func).toBe(handlers.date);
    expect(params).toMatchObject({ year: "2016" });
  });

  test("date (year) with slash", () => {
    const { func, params } = getMatch("/2016/", wpComHandlers);
    expect(func).toBe(handlers.date);
    expect(params).toMatchObject({ year: "2016" });
  });

  test("date (year/month)", () => {
    const { func, params } = getMatch("/2016/10", wpComHandlers);
    expect(func).toBe(handlers.date);
    expect(params).toMatchObject({ year: "2016", month: "10" });
  });

  test("date (year/month/day)", () => {
    const { func, params } = getMatch("/2016/10/25", wpComHandlers);
    expect(func).toBe(handlers.date);
    expect(params).toMatchObject({ year: "2016", month: "10", day: "25" });
  });

  // pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:slug", // day & name
  // handler: post
  test("post (day & name)", () => {
    const { func, params } = getMatch(
      "/2016/10/25/the-beauties-of-gullfoss",
      wpComHandlers
    );
    expect(func).toBe(handlers.post);
    expect(params).toMatchObject({ slug: "the-beauties-of-gullfoss" });
  });

  // pattern: ":slug", // page name
  // handler: page
  test("post name / page / attachment (without parent)", () => {
    const { func, params } = getMatch(
      "/post-or-page-or-attachment",
      wpComHandlers
    );
    expect(func).toBe(handlers.page);
    expect(params).toMatchObject({ slug: "post-or-page-or-attachment" });
  });

  // pattern: "/(.*)/:slug", // subpages
  // handler: page
  test("subpage / attachment", () => {
    const { func, params } = getMatch("/about-us/location", wpComHandlers);
    expect(func).toBe(handlers.page);
    expect(params).toMatchObject({ slug: "location" });
  });
});
