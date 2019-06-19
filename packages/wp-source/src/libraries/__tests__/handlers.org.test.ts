import { wpOrg } from "../patterns";
import { getMatch } from "../get-match";
import * as handlers from "../handlers";

// Add handlers
const wpOrgHandlers = [...wpOrg];

describe("getMatch (wp.org patterns)", () => {
  // pattern: "/",
  // handler: postArchive
  test("post archive", () => {
    const { func, params } = getMatch("/", wpOrgHandlers);
    expect(func).toBe(handlers.postArchive);
    expect(params).toMatchObject({});
  });

  // pattern: "/category/:slug",
  // handler: category
  test("category", () => {
    const { func, params } = getMatch("/category/nature", wpOrgHandlers);
    expect(func).toBe(handlers.category);
    expect(params).toMatchObject({ slug: "nature" });
  });

  // pattern: "/category/(.*)/:slug", // subcategories
  // handler: category
  test("subcategory", () => {
    const { func, params } = getMatch(
      "/category/nature/subcat/subsubcat",
      wpOrgHandlers
    );
    expect(func).toBe(handlers.category);
    expect(params).toMatchObject({ slug: "subsubcat" });
  });

  // pattern: "/tag/:slug",
  // handler: tag
  test("category", () => {
    const { func, params } = getMatch("/tag/japan", wpOrgHandlers);
    expect(func).toBe(handlers.tag);
    expect(params).toMatchObject({ slug: "japan" });
  });

  // pattern: "/author/:slug",
  // handler: author
  test("author", () => {
    const { func, params } = getMatch("/author/luisherranz", wpOrgHandlers);
    expect(func).toBe(handlers.author);
    expect(params).toMatchObject({ slug: "luisherranz" });
  });

  // pattern: "/:year(\\d+)/:month(\\d+)?/:day(\\d+)?",
  // handler: date
  test("date (year)", () => {
    const { func, params } = getMatch("/2016", wpOrgHandlers);
    expect(func).toBe(handlers.date);
    expect(params).toMatchObject({ year: "2016" });
  });

  test("date (year)", () => {
    const { func, params } = getMatch("/2016/", wpOrgHandlers);
    expect(func).toBe(handlers.date);
    expect(params).toMatchObject({ year: "2016" });
  });

  test("date (year/month)", () => {
    const { func, params } = getMatch("/2016/10", wpOrgHandlers);
    expect(func).toBe(handlers.date);
    expect(params).toMatchObject({ year: "2016", month: "10" });
  });

  test("date (year/month/day)", () => {
    const { func, params } = getMatch("/2016/10/25", wpOrgHandlers);
    expect(func).toBe(handlers.date);
    expect(params).toMatchObject({ year: "2016", month: "10", day: "25" });
  });

  // pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:slug", // day & name
  // handler: post
  test("post (day & name)", () => {
    const { func, params } = getMatch(
      "/2016/10/25/the-beauties-of-gullfoss",
      wpOrgHandlers
    );
    expect(func).toBe(handlers.post);
    expect(params).toMatchObject({ slug: "the-beauties-of-gullfoss" });
  });

  // pattern: "/:year(\\d+)/:month(\\d+)/:slug", // month & name
  // handler: post
  test("post (month & name)", () => {
    const { func, params } = getMatch(
      "/2016/10/the-beauties-of-gullfoss",
      wpOrgHandlers
    );
    expect(func).toBe(handlers.post);
    expect(params).toMatchObject({ slug: "the-beauties-of-gullfoss" });
  });

  // pattern: "/archives/:id", // numeric
  // handler: post
  test("post (numeric)", () => {
    const { func, params } = getMatch("/archives/60", wpOrgHandlers);
    expect(func).toBe(handlers.post);
    expect(params).toMatchObject({ id: "60" });
  });

  // pattern: ":slug", // post name or page name
  // handler: postType
  test("post name / page / attachment (without parent)", () => {
    const { func, params } = getMatch(
      "/post-or-page-or-attachment",
      wpOrgHandlers
    );
    expect(func).toBe(handlers.postType);
    expect(params).toMatchObject({ slug: "post-or-page-or-attachment" });
  });

  // pattern: "/(.*)/:slug", // subpages
  // handler: page
  test("subpage / attachment", () => {
    const { func, params } = getMatch("/about-us/location", wpOrgHandlers);
    expect(func).toBe(handlers.postType);
    expect(params).toMatchObject({ slug: "location" });
  });

  // pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:postSlug/:slug", // day & name
  // handler: attachment
  test("attachment (day & name)", () => {
    const { func, params } = getMatch(
      "/2016/10/25/the-beauties-of-gullfoss/attachment-1",
      wpOrgHandlers
    );
    expect(func).toBe(handlers.attachment);
    expect(params).toMatchObject({ slug: "attachment-1" });
  });

  // pattern: "/:year(\\d+)/:month(\\d+)/:postSlug/:slug", // month & name
  // handler: attachment
  test("attachment (month & name)", () => {
    const { func, params } = getMatch(
      "/2016/10/the-beauties-of-gullfoss/attachment-2",
      wpOrgHandlers
    );
    expect(func).toBe(handlers.attachment);
    expect(params).toMatchObject({ slug: "attachment-2" });
  });

  // pattern: "/archives/:postId/:slug", // numeric
  // handler: attachment
  test("attachment (numeric)", () => {
    const { func, params } = getMatch(
      "/archives/60/attachment-3",
      wpOrgHandlers
    );
    expect(func).toBe(handlers.attachment);
    expect(params).toMatchObject({ slug: "attachment-3" });
  });
});
