import Resolver from "../resolver";
import { Handler } from "../../..";
import patterns from "../patterns/wp-org";
import * as handlers from "../handlers";

// Mock handlers from patterns
const routes: { [type: string]: { pattern: string; handler: Handler } } = {};
Object.keys(patterns).forEach(
  type =>
    (routes[type] = {
      pattern: patterns[type],
      handler: jest.fn(() => Promise.resolve())
    })
);

// Add handlers
const resolver = new Resolver();
patterns.forEach(patternObj => {
  resolver.addHandler(patternObj);
});

describe("resolver (wp.org patterns)", () => {
  // pattern: "/",
  // handler: postArchive
  test("post archive", () => {
    const { handler, params } = resolver.match("/");
    expect(handler).toBe(handlers.postArchive);
    expect(params).toMatchObject({});
  });

  // pattern: "/category/:slug",
  // handler: category
  test("category", () => {
    const { handler, params } = resolver.match("/category/nature");
    expect(handler).toBe(handlers.category);
    expect(params).toMatchObject({ slug: "nature" });
  });

  // pattern: "/category/(.*)/:slug", // subcategories
  // handler: category
  test("subcategory", () => {
    const { handler, params } = resolver.match(
      "/category/nature/subcat/subsubcat"
    );
    expect(handler).toBe(handlers.category);
    expect(params).toMatchObject({ slug: "subsubcat" });
  });

  // pattern: "/tag/:slug",
  // handler: tag
  test("category", () => {
    const { handler, params } = resolver.match("/tag/japan");
    expect(handler).toBe(handlers.tag);
    expect(params).toMatchObject({ slug: "japan" });
  });

  // pattern: "/author/:slug",
  // handler: author
  test("author", () => {
    const { handler, params } = resolver.match("/author/luisherranz");
    expect(handler).toBe(handlers.author);
    expect(params).toMatchObject({ slug: "luisherranz" });
  });

  // pattern: "/:year(\\d+)/:month(\\d+)?/:day(\\d+)?",
  // handler: date
  test("date (year)", () => {
    const { handler, params } = resolver.match("/2016");
    expect(handler).toBe(handlers.date);
    expect(params).toMatchObject({ year: "2016" });
  });

  test("date (year)", () => {
    const { handler, params } = resolver.match("/2016/");
    expect(handler).toBe(handlers.date);
    expect(params).toMatchObject({ year: "2016" });
  });

  test("date (year/month)", () => {
    const { handler, params } = resolver.match("/2016/10");
    expect(handler).toBe(handlers.date);
    expect(params).toMatchObject({ year: "2016", month: "10" });
  });

  test("date (year/month/day)", () => {
    const { handler, params } = resolver.match("/2016/10/25");
    expect(handler).toBe(handlers.date);
    expect(params).toMatchObject({ year: "2016", month: "10", day: "25" });
  });

  // pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:slug", // day & name
  // handler: post
  test("post (day & name)", () => {
    const { handler, params } = resolver.match(
      "/2016/10/25/the-beauties-of-gullfoss"
    );
    expect(handler).toBe(handlers.post);
    expect(params).toMatchObject({ slug: "the-beauties-of-gullfoss" });
  });

  // pattern: "/:year(\\d+)/:month(\\d+)/:slug", // month & name
  // handler: post
  test("post (month & name)", () => {
    const { handler, params } = resolver.match(
      "/2016/10/the-beauties-of-gullfoss"
    );
    expect(handler).toBe(handlers.post);
    expect(params).toMatchObject({ slug: "the-beauties-of-gullfoss" });
  });

  // pattern: "/archives/:id", // numeric
  // handler: post
  test("post (numeric)", () => {
    const { handler, params } = resolver.match("/archives/60");
    expect(handler).toBe(handlers.post);
    expect(params).toMatchObject({ id: "60" });
  });

  // pattern: ":slug", // post name or page name
  // handler: postType
  test("post name / page / attachment (without parent)", () => {
    const { handler, params } = resolver.match("/post-or-page-or-attachment");
    expect(handler).toBe(handlers.postType);
    expect(params).toMatchObject({ slug: "post-or-page-or-attachment" });
  });

  // pattern: "/(.*)/:slug", // subpages
  // handler: page
  test("subpage / attachment", () => {
    const { handler, params } = resolver.match("/about-us/location");
    expect(handler).toBe(handlers.postType);
    expect(params).toMatchObject({ slug: "location" });
  });

  // pattern: "/:year(\\d+)/:month(\\d+)/:day(\\d+)/:postSlug/:slug", // day & name
  // handler: attachment
  test("attachment (day & name)", () => {
    const { handler, params } = resolver.match(
      "/2016/10/25/the-beauties-of-gullfoss/attachment-1"
    );
    expect(handler).toBe(handlers.attachment);
    expect(params).toMatchObject({ slug: "attachment-1" });
  });

  // pattern: "/:year(\\d+)/:month(\\d+)/:postSlug/:slug", // month & name
  // handler: attachment
  test("attachment (month & name)", () => {
    const { handler, params } = resolver.match(
      "/2016/10/the-beauties-of-gullfoss/attachment-2"
    );
    expect(handler).toBe(handlers.attachment);
    expect(params).toMatchObject({ slug: "attachment-2" });
  });

  // pattern: "/archives/:postId/:slug", // numeric
  // handler: attachment
  test("attachment (numeric)", () => {
    const { handler, params } = resolver.match("/archives/60/attachment-3");
    expect(handler).toBe(handlers.attachment);
    expect(params).toMatchObject({ slug: "attachment-3" });
  });
});
