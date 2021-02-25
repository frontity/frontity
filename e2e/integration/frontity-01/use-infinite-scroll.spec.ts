// Add the experimental fetch polyfill only for these tests. The new
// `cy.intercept` API doesn't allow to change the response of a given URL once
// it has been set, so we need to still use `cy.server` and `cy.router` here for
// some tests.
//
// See https://github.com/cypress-io/cypress/issues/9302.
//
// There is a PR that will address this issue:
// https://github.com/cypress-io/cypress/pull/14513.
Cypress.config({
  experimentalFetchPolyfill: true,
} as any);

/**
 * Add a spy on the `actions.source.fetch` function.
 *
 * @returns Cypress chainable.
 */
const spyOnFetch = () =>
  cy.window().then((w: any) => cy.spy(w.frontity.actions.source, "fetch"));

/**
 * Get the `actions.source.fetch` function. Useful to make assertions after
 * using the `spyOnFetch` helper.
 *
 * @returns Cypress chainable that yields the `actions.source.fetch` function.
 */
const getFetchSpy = () =>
  cy.window().then((w: any) => w.frontity.actions.source.fetch);

describe("useArchiveInfiniteScroll", () => {
  it("should load next page", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2",
      response: "fixture:use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageTwo");

    // Changes url to `/`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.wait("@pageOne");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.wait("@pageTwo");
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/page/2/");

    // Scrolls back to top.
    cy.scrollTo("top");
    cy.location("href").should("eq", "http://localhost:3001/");
  });

  it("should return `isError` true", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2",
      status: 503,
      response: {},
      delay: 300,
    }).as("pageTwo");

    // Changes url to `/`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.wait("@pageOne");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.get("[data-test='error']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/");

    // Try fetching again.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetch']").should("not.exist");
    cy.get("[data-test='fetching']").should("exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='error']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/");

    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2",
      response: "fixture:use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageTwo");

    // Try one more time.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/page/2/");
  });

  it("should do nothing if deactivated", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2",
      response: "fixture:use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageTwo");

    // Deactivates the infinite scroll hooks.
    cy.get("[data-test=toggle-infinite-scroll]").should("exist").click();

    // Changes url to `/`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.wait("@pageOne");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    spyOnFetch();

    // Scrolls to bottom, the next page should not be fetched. We wait here a
    // short period of time just to be sure the request for the next page was
    // not made.

    // The request (if made) is made asynchronously right after the bottom
    // element is visible, so it's not important the amount of time.

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.scrollTo("bottom").wait(300);

    getFetchSpy().should("not.have.been.called");

    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.location("href").should("eq", "http://localhost:3001/");
  });

  it("should fetch pages until the limit is reached", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 21,
        "x-wp-totalpages": 3,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2",
      response: "fixture:use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": 21,
        "x-wp-totalpages": 3,
      },
      delay: 300,
    }).as("pageTwo");
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=3",
      response: "fixture:use-infinite-scroll/page-3.json",
      headers: {
        "x-wp-total": 21,
        "x-wp-totalpages": 3,
      },
      delay: 300,
    }).as("pageThree");

    // Set the infinite scroll limit to two pages.
    cy.get("[data-test=limit-infinite-scroll]").should("exist").click();

    // Changes url to `/`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.wait("@pageOne");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/page/2/");

    spyOnFetch();

    // Scrolls to bottom, the next page should not be fetched. We wait here a
    // short period of time just to be sure the request for the next page was
    // not made.

    // The request (if made) is made asynchronously right after the bottom
    // element is visible, so it's not important the amount of time.

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.scrollTo("bottom").wait(300);

    getFetchSpy().should("not.have.been.called");

    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-3']").should("not.exist");
    cy.location("href").should("eq", "http://localhost:3001/page/2/");

    // Fetching it manually after the limit is reached should work as expected.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-3']").should("not.exist");
    cy.wait("@pageThree");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-3']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/page/3/");
  });

  it("should fetch pages until the last one is fetched", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 21,
        "x-wp-totalpages": 3,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2",
      response: "fixture:use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": 21,
        "x-wp-totalpages": 3,
      },
      delay: 300,
    }).as("pageTwo");
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=3",
      response: "fixture:use-infinite-scroll/page-3.json",
      headers: {
        "x-wp-total": 21,
        "x-wp-totalpages": 3,
      },
      delay: 300,
    }).as("pageThree");

    // Changes url to `/`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.wait("@pageOne");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/page/2/");

    // Scrolls to bottom to fetch last page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-3']").should("not.exist");
    cy.wait("@pageThree");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-3']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/page/3/");

    spyOnFetch();

    // Scrolls to bottom, no more pages should be fetched. We wait here a short
    // period of time just to be sure the request for the next page was not
    // made.

    // The request (if made) is made asynchronously right after the bottom
    // element is visible, so it's not important the amount of time.

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.scrollTo("bottom").wait(300);

    getFetchSpy().should("not.have.been.called");

    cy.get("[data-test='last']").should("exist");
    cy.location("href").should("eq", "http://localhost:3001/page/3/");
  });

  it("should keep fetched pages when going back and forward", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 21,
        "x-wp-totalpages": 3,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2",
      response: "fixture:use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": 21,
        "x-wp-totalpages": 3,
      },
      delay: 300,
    }).as("pageTwo");
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=3",
      response: "fixture:use-infinite-scroll/page-3.json",
      headers: {
        "x-wp-total": 21,
        "x-wp-totalpages": 3,
      },
      delay: 300,
    }).as("pageThree");

    // Changes url to `/`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.wait("@pageOne");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/page/2/");

    // Scrolls to bottom to fetch last page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-3']").should("not.exist");
    cy.wait("@pageThree");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-3']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/page/3/");

    // Go to a post.
    cy.get("[data-test='post-21-link']").should("exist").click();
    cy.get("[data-test='post-21']").should("exist");

    // Then, go back.
    cy.go("back");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='page-2']").should("exist");
    cy.get("[data-test='page-3']").should("exist").should("be.visible");
    cy.location("href").should("eq", "http://localhost:3001/page/3/");

    // Go back again.
    cy.go("back");
    cy.get("[data-test='page-1']").should("not.exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.get("[data-test='page-3']").should("not.exist");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Go forward this time.
    cy.go("forward");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='page-2']").should("exist");
    cy.get("[data-test='page-3']").should("exist").should("be.visible");
    cy.location("href").should("eq", "http://localhost:3001/page/3/");
  });

  it("should create a new infinite scroll context when going directly to a ready archive", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2",
      response: "fixture:use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageTwo");
    cy.server();
    cy.route({
      url:
        "https://domain.com/wp-json/wp/v2/posts?_embed=true&categories=2&page=2",
      response: "fixture:use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("categoryPageTwo");

    // Changes url to `/`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.wait("@pageOne");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // // Scrolls to bottom to fetch next page.
    // cy.scrollTo("bottom");
    // cy.get("[data-test='fetching']").should("exist");
    // cy.get("[data-test='page-2']").should("not.exist");
    // cy.wait("@pageTwo");
    // cy.get("[data-test='fetching']").should("not.exist");
    // cy.get("[data-test='page-2']").should("exist").scrollIntoView();
    // cy.location("href").should("eq", "http://localhost:3001/page/2/");

    // // Go directly to "/category/two/"
    // cy.get("[data-test='to-category-two']").should("exist").click();
    // cy.get("[data-test='fetching']").should("not.exist");
    // cy.get("[data-test='page-1']").should("exist");
    // cy.location("href").should("eq", "http://localhost:3001/category/two/");

    // // Scrolls to bottom to fetch next page.
    // cy.scrollTo("bottom");
    // cy.get("[data-test='fetching']").should("exist");
    // cy.get("[data-test='page-2']").should("not.exist");
    // cy.wait("@categoryPageTwo");
    // cy.get("[data-test='fetching']").should("not.exist");
    // cy.get("[data-test='page-2']").should("exist").scrollIntoView();
    // cy.location("href").should(
    //   "eq",
    //   "http://localhost:3001/category/two/page/2/"
    // );

    // // Go back, the link should point to "/page/2/"
    // cy.go("back");
    // cy.get("[data-test='fetching']").should("not.exist");
    // cy.get("[data-test='page-2']").should("exist").should("be.visible");
    // cy.location("href").should("eq", "http://localhost:3001/page/2/");
  });
});

describe("usePostTypeInfiniteScroll", () => {
  it("should load next post", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:use-infinite-scroll/post-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postOne");

    // Changes url to `/post-type`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
    cy.wait("@postOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-2/");

    // Scrolls back to top.
    cy.scrollTo("top");
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
  });

  it("should return `isError` true", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-10",
      response: "fixture:use-infinite-scroll/post-last.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("lastPost");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2",
      status: 503,
      response: {},
      delay: 300,
    }).as("pageTwo");

    // Changes url to `/post-type`.
    cy.get("[data-test='to-last-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-10/");
    cy.wait("@lastPost");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-10']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='post-11']").should("not.exist");
    cy.get("[data-test='error']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-10/");

    // Try fetching again.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetch']").should("not.exist");
    cy.get("[data-test='fetching']").should("exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='error']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-10/");

    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2",
      response: "fixture:use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delay: 300,
    }).as("pageTwo");

    // Try one more time.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='post-11']").should("not.exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='post-11']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-11/");
  });

  it("should do nothing if deactivated", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-10",
      response: "fixture:use-infinite-scroll/post-last.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("lastPost");

    // Deactivate the infinite scroll hooks.
    cy.get("[data-test=toggle-infinite-scroll]").should("exist").click();

    // Go to post last post of page 1.
    cy.get("[data-test='to-last-post'").should("exist").click();

    cy.location("href").should("eq", "http://localhost:3001/post-10/");
    cy.wait("@lastPost");
    cy.get("[data-test='post-10']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Spy on `actions.source.fetch` and then scroll down.
    spyOnFetch();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.scrollTo("bottom").wait(300);

    // The next page should not be requested.
    getFetchSpy().should("have.not.been.called");
    cy.get("[data-test='fetching']").should("not.exist");
    // The next post should not be rendered.
    cy.get("[data-test='post-11']").should("not.exist");
    cy.location("href").should("eq", "http://localhost:3001/post-10/");
  });

  it("should render posts until the limit is reached", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:use-infinite-scroll/post-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postOne");

    // Limit posts to 2.
    cy.get("[data-test=limit-infinite-scroll]").should("exist").click();

    // Changes url to `/post-type`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
    cy.wait("@postOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-2/");

    // Scrolls to bottom to fetch next post.
    spyOnFetch();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.scrollTo("bottom").wait(300);

    // The next page should not be requested.
    getFetchSpy().should("have.not.been.called");
    cy.get("[data-test='post-2']").should("exist");
    cy.location("href").should("eq", "http://localhost:3001/post-2/");

    // Fetching it manually after the limit is reached should work as expected.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='post-3']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-3/");
  });

  it("should fetch the next page of post if needed", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-10",
      response: "fixture:use-infinite-scroll/post-last.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("lastPost");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2",
      response: "fixture:use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delay: 300,
    }).as("pageTwo");

    // Changes url to `/post-type`.
    cy.get("[data-test='to-last-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-10/");
    cy.wait("@lastPost");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-10']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='post-11']").should("not.exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='post-11']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-11/");
  });

  it("should keep rendered posts when going back and forward", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:use-infinite-scroll/post-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postOne");

    // Changes url to `/post-type`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
    cy.wait("@postOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-2/");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-3']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-3/");

    // Go directly to the posts page.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Then, go back.
    cy.go("back");
    cy.get("[data-test='archive']").should("not.exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='post-2']").should("exist");
    cy.get("[data-test='post-3']").should("exist").should("be.visible");
    cy.location("href").should("eq", "http://localhost:3001/post-3/");

    // Go back again.
    cy.go("back");
    cy.get("[data-test='archive']").should("not.exist");
    cy.get("[data-test='post-1']").should("not.exist");
    cy.get("[data-test='post-2']").should("not.exist");
    cy.get("[data-test='post-3']").should("not.exist");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Go forward this time.
    cy.go("forward");
    cy.get("[data-test='archive']").should("not.exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='post-2']").should("exist");
    cy.get("[data-test='post-3']").should("exist").should("be.visible");
    cy.location("href").should("eq", "http://localhost:3001/post-3/");
  });

  it("should render posts from the previous archive", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/categories?slug=one",
      response: "fixture:use-infinite-scroll/category-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("categoryOne");
    cy.route({
      url: "/wp-json/wp/v2/posts?_embed=true&categories=1&page=1",
      response: "fixture:use-infinite-scroll/category-page-1.json",
      headers: {
        "x-wp-total": "2",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("categoryPageOne");

    // Changes url to `/category/one`.
    cy.get("[data-test='to-category-one']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/category/one/");
    cy.wait("@categoryPageOne");

    // Go to the first post of the category.
    cy.get("[data-test='post-1-link'").should("exist").click();
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom. The next post of the category ("post-7") should be
    // rendered.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-7']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-7/");

    // The second post of the post archive (the posts page) should not exist.
    cy.get("[data-test='post-2']").should("not.exist");

    // Scroll to bottom. No more pages should be fetched.
    spyOnFetch();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.scrollTo("bottom").wait(300);

    // The next page should not be requested.
    getFetchSpy().should("have.not.been.called");
    cy.get("[data-test='last'").should("exist");
  });

  it("should render posts from the specified archive", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/categories?slug=one",
      response: "fixture:use-infinite-scroll/category-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("categoryOne");
    cy.route({
      url: "/wp-json/wp/v2/posts?_embed=true&categories=1&page=1",
      response: "fixture:use-infinite-scroll/category-page-1.json",
      headers: {
        "x-wp-total": "2",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("categoryPageOne");

    // Specify the archive source as `/category/one`.
    cy.get("[data-test='set-archive']").should("exist").click();

    // Changes url to `/`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.wait("@pageOne");

    // Go to the first post of the category.
    cy.get("[data-test='post-1-link'").should("exist").click();
    cy.wait("@categoryPageOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom. The next post of the category ("post-7") should be
    // rendered.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-7']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-7/");

    // The second post of the post archive (the posts page) should not exist.
    cy.get("[data-test='post-2']").should("not.exist");
  });

  it("should render posts from the posts page ('/')", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:use-infinite-scroll/post-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postOne");

    spyOnFetch();

    // Changes url to `/post-type`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
    cy.wait("@postOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    getFetchSpy().should("have.been.calledWith", "/");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-2/");
  });

  it("should render posts from the posts page  ('/blog/')", () => {
    cy.visit(
      "http://localhost:3001/test/?frontity_name=use-infinite-scroll&frontity_posts_page=/blog/"
    );
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:use-infinite-scroll/post-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postOne");

    spyOnFetch();

    // Changes url to `/post-type`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
    cy.wait("@postOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    getFetchSpy().should("have.been.calledWith", "/blog/");
    getFetchSpy().should("have.not.been.calledWith", "/");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-2/");

    // Scrolls back to top.
    cy.scrollTo("top");
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
  });

  it("should render posts from the posts page ('blog')", () => {
    cy.visit(
      "http://localhost:3001/test/?frontity_name=use-infinite-scroll&frontity_posts_page=blog"
    );
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:use-infinite-scroll/post-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postOne");

    spyOnFetch();

    // Changes url to `/post-type`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
    cy.wait("@postOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    getFetchSpy().should("have.been.calledWith", "/blog/");
    getFetchSpy().should("have.not.been.calledWith", "/");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-2/");

    // Scrolls back to top.
    cy.scrollTo("top");
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
  });

  it("should render posts from the previous archive (w/ subdir)", () => {
    cy.visit(
      "http://localhost:3001/subdir/test/?frontity_name=use-infinite-scroll&frontity_subdirectory=/subdir"
    );
    cy.location("href").should("eq", "http://localhost:3001/subdir/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/categories?slug=one",
      response: "fixture:use-infinite-scroll/category-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("categoryOne");
    cy.route({
      url: "/wp-json/wp/v2/posts?_embed=true&categories=1&page=1",
      response: "fixture:use-infinite-scroll/category-page-1.json",
      headers: {
        "x-wp-total": "2",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("categoryPageOne");

    // Changes url to `/category/one`.
    cy.get("[data-test='to-category-one']").should("exist").click();
    cy.location("href").should(
      "eq",
      "http://localhost:3001/subdir/category/one/"
    );
    cy.wait("@categoryPageOne");

    // Go to the first post of the category.
    cy.get("[data-test='post-1-link'").should("exist").click();
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom. The next post of the category ("post-7") should be
    // rendered.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-7']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/subdir/post-7/");

    // The second post of the post archive (the posts page) should not exist.
    cy.get("[data-test='post-2']").should("not.exist");

    // Scroll to bottom. No more pages should be fetched.
    spyOnFetch();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.scrollTo("bottom").wait(300);

    // The next page should not be requested.
    getFetchSpy().should("have.not.been.called");
    cy.get("[data-test='last'").should("exist");
  });

  it("should render posts from the specified archive (w/ subdir)", () => {
    cy.visit(
      "http://localhost:3001/subdir/test/?frontity_name=use-infinite-scroll&frontity_subdirectory=/subdir"
    );
    cy.location("href").should("eq", "http://localhost:3001/subdir/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/categories?slug=one",
      response: "fixture:use-infinite-scroll/category-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("categoryOne");
    cy.route({
      url: "/wp-json/wp/v2/posts?_embed=true&categories=1&page=1",
      response: "fixture:use-infinite-scroll/category-page-1.json",
      headers: {
        "x-wp-total": "2",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("categoryPageOne");

    // Specify the archive source as `/category/one`.
    cy.get("[data-test='set-archive']").should("exist").click();

    // Changes url to `/subdir/`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/subdir/");
    cy.wait("@pageOne");

    // Go to the first post of the category.
    cy.get("[data-test='post-1-link'").should("exist").click();
    cy.wait("@categoryPageOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom. The next post of the category ("post-7") should be
    // rendered.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-7']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/subdir/post-7/");

    // The second post of the post archive (the posts page) should not exist.
    cy.get("[data-test='post-2']").should("not.exist");
  });

  it("should render posts from the posts page ('/', w/ subdir)", () => {
    cy.visit(
      "http://localhost:3001/subdir/test/?frontity_name=use-infinite-scroll&frontity_subdirectory=/subdir"
    );
    cy.location("href").should("eq", "http://localhost:3001/subdir/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:use-infinite-scroll/post-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postOne");

    spyOnFetch();

    // Changes url to `/post-type`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/subdir/post-1/");
    cy.wait("@postOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    getFetchSpy().should("have.been.calledWith", "/subdir/");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/subdir/post-2/");
  });

  it("should render posts from the posts page  ('/blog/', w/ subdir)", () => {
    cy.visit(
      "http://localhost:3001/subdir/test/?frontity_name=use-infinite-scroll&frontity_posts_page=/blog/&frontity_subdirectory=/subdir"
    );
    cy.location("href").should("eq", "http://localhost:3001/subdir/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:use-infinite-scroll/post-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postOne");

    spyOnFetch();

    // Changes url to `/post-type`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/subdir/post-1/");
    cy.wait("@postOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    getFetchSpy().should("have.been.calledWith", "/subdir/blog/");
    getFetchSpy().should("have.not.been.calledWith", "/");
    getFetchSpy().should("have.not.been.calledWith", "/subdir/");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/subdir/post-2/");

    // Scrolls back to top.
    cy.scrollTo("top");
    cy.location("href").should("eq", "http://localhost:3001/subdir/post-1/");
  });

  it("should render posts from the posts page ('blog', w/ subdir)", () => {
    cy.visit(
      "http://localhost:3001/subdir/test/?frontity_name=use-infinite-scroll&frontity_posts_page=blog&frontity_subdirectory=/subdir"
    );
    cy.location("href").should("eq", "http://localhost:3001/subdir/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:use-infinite-scroll/post-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postOne");

    spyOnFetch();

    // Changes url to `/post-type`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/subdir/post-1/");
    cy.wait("@postOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    getFetchSpy().should("have.been.calledWith", "/subdir/blog/");
    getFetchSpy().should("have.not.been.calledWith", "/");
    getFetchSpy().should("have.not.been.calledWith", "/subdir/");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/subdir/post-2/");

    // Scrolls back to top.
    cy.scrollTo("top");
    cy.location("href").should("eq", "http://localhost:3001/subdir/post-1/");
  });

  it("should ignore redirected links", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1-with-redirections.json",
      headers: {
        "x-wp-total": 4,
        "x-wp-totalpages": 1,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=some-post",
      response: "fixture:use-infinite-scroll/some-post.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("somePost");

    // Changes url to `/some-post`.
    cy.get("[data-test='to-some-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/some-post/");
    cy.wait("@somePost");
    cy.wait("@pageOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next post. As redirections are ignored, the
    // next rendered post should be the post 4 (last-post).
    cy.scrollTo("bottom");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='post-2']").should("not.exist"); // Internal redirect.
    cy.get("[data-test='post-3']").should("not.exist"); // External redirect.
    cy.get("[data-test='post-4']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/last-post/");

    // Changes url to `/`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.location("href").should("eq", "http://localhost:3001/");

    // Then, go back. The last post should be visible.
    cy.go("back");

    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='post-2']").should("not.exist");
    cy.get("[data-test='post-3']").should("not.exist");
    cy.get("[data-test='post-4']").should("exist").should("be.visible");
    cy.location("href").should("eq", "http://localhost:3001/last-post/");
  });

  it("should change the archive when visiting a new one", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/categories?slug=one",
      response: "fixture:use-infinite-scroll/category-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("categoryOne");
    cy.route({
      url: "/wp-json/wp/v2/posts?_embed=true&categories=1&page=1",
      response: "fixture:use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": "2",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("categoryPageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:use-infinite-scroll/post-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-11",
      response: "fixture:use-infinite-scroll/post-11.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postEleven");

    // Changes url to `/post-1`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
    cy.wait("@postOne");
    cy.wait("@pageOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next post. It should be "/post-2"
    cy.scrollTo("bottom");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='post-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-2/");

    // Changes url to `/category/one`.
    cy.get("[data-test='to-category-one']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/category/one/");
    cy.wait("@categoryPageOne");

    // Go to the first post of the category.
    cy.get("[data-test='post-11-link'").should("exist").click();
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-11']").should("exist");
    cy.location("href").should("eq", "http://localhost:3001/post-11/");

    // Scrolls to bottom to fetch next post. It should be "/post-12"
    cy.scrollTo("bottom");
    cy.get("[data-test='post-11']").should("exist");
    cy.get("[data-test='post-12']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-12/");

    // Then, go back two times, "/post-2" should be visible.
    cy.go(-2);
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='post-2']").should("exist").should("be.visible");
    cy.location("href").should("eq", "http://localhost:3001/post-2/");

    // Get the next post, it should be "/post-3"
    cy.scrollTo("bottom");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='post-2']").should("exist");
    cy.get("[data-test='post-3']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-3/");
  });

  it("should keep the archive while scrolling", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.

    // Main archive ("/")
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2",
      response: "fixture:use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delay: 300,
    }).as("pageTwo");

    // Category one ("/category/one")
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:use-infinite-scroll/post-last.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/categories?slug=one",
      response: "fixture:use-infinite-scroll/category-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("categoryOne");
    cy.route({
      url: "/wp-json/wp/v2/posts?_embed=true&categories=1&page=1",
      response: "fixture:use-infinite-scroll/category-page-1.json",
      headers: {
        "x-wp-total": "2",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("categoryPageOne");

    // Changes url to "/".
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/");
    cy.wait("@pageOne");

    // Go to the penultimate post of the first page.
    cy.get("[data-test='post-9-link'").should("exist").click();
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-9']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.location("href").should("eq", "http://localhost:3001/post-9/");

    // Change the source archive to "/category/one".
    cy.get("[data-test='set-archive'").should("exist").click();

    // Changes url to "/".
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/");

    // Go to  "/post-1".
    cy.get("[data-test='post-1-link'").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-1/");

    // The next one should be the post 7.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-7']").should("exist").scrollIntoView();
    cy.get("[data-test='post-type']").should("exist");
    cy.location("href").should("eq", "http://localhost:3001/post-7/");

    // Go back to "/post-9".
    cy.go(-2);
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-9']").should("exist");
    cy.location("href").should("eq", "http://localhost:3001/post-9/");

    // Scroll down. The next one should be the post 10.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-10']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-10/");

    // Scroll down again. The next one should be the post 11 (from "/").
    cy.scrollTo("bottom");
    cy.get("[data-test='post-11']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-11/");
  });

  it("should create a new infinite scroll context when going directly to a ready post", () => {
    cy.visit("http://localhost:3001/test/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/test/");

    // Stubs calls to REST API.

    // Main archive ("/")
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:use-infinite-scroll/post-1.json",
      headers: {
        "x-wp-total": "1",
        "x-wp-totalpages": "1",
      },
      delay: 300,
    }).as("postOne");
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1",
      response: "fixture:use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delay: 300,
    }).as("pageOne");

    // Changes url to `/post-1`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
    cy.wait("@postOne");
    cy.wait("@pageOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next post. It should be "/post-2".
    cy.scrollTo("bottom");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='post-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-2/");

    // Go directly to "/post-7".
    cy.get("[data-test='to-post-7']").should("exist").click();
    cy.get("[data-test='post-1']").should("not.exist");
    cy.get("[data-test='post-2']").should("not.exist");
    cy.get("[data-test='post-7']").should("exist");
    cy.location("href").should("eq", "http://localhost:3001/post-7/");

    // Scrolls to bottom to fetch next post. It should be "/post-8".
    cy.scrollTo("bottom");
    cy.get("[data-test='post-1']").should("not.exist");
    cy.get("[data-test='post-2']").should("not.exist");
    cy.get("[data-test='post-7']").should("exist");
    cy.get("[data-test='post-8']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-8/");
  });
});
