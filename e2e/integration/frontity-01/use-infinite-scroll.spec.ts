// Add the experimental fetch polyfill only for these tests. The new
// `cy.intercept` API doesn't allow to change the response of a given URL once
// it has been set, so we need to still use `cy.server` and `cy.router` here for
// some tests.
//
// See https://github.com/cypress-io/cypress/issues/9302.
Cypress.config({
  experimentalFetchPolyfill: true,
} as any);

const spyOnFetch = () =>
  cy.window().then((w: any) => cy.spy(w.frontity.actions.source, "fetch"));

const getFetchSpy = () =>
  cy.window().then((w: any) => w.frontity.actions.source.fetch);

describe("useArchiveInfiniteScroll", () => {
  it("should load next page", () => {
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

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

    // Changes url to `/archive`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/archive/");
    cy.wait("@pageOne");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.wait("@pageTwo");
    cy.location("href").should("eq", "http://localhost:3001/archive/");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/archive/page/2/");

    // Scrolls back to top.
    cy.scrollTo("top");
    cy.location("href").should("eq", "http://localhost:3001/archive/");
  });

  it("should return `isError` true", () => {
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

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

    // Changes url to `/archive`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/archive/");
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
    cy.location("href").should("eq", "http://localhost:3001/archive/");

    // Try fetching again.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetch']").should("not.exist");
    cy.get("[data-test='fetching']").should("exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='error']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/archive/");

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
    cy.location("href").should("eq", "http://localhost:3001/archive/page/2/");
  });

  it("should do nothing if deactivated", () => {
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

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

    // Changes url to `/archive`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/archive/");
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
    cy.location("href").should("eq", "http://localhost:3001/archive/");
  });

  it("should fetch pages until the limit is reached", () => {
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

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

    // Changes url to `/archive`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/archive/");
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
    cy.location("href").should("eq", "http://localhost:3001/archive/page/2/");

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
    cy.location("href").should("eq", "http://localhost:3001/archive/page/2/");

    // Fetching it manually after the limit is reached should work as expected.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-3']").should("not.exist");
    cy.wait("@pageThree");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-3']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/archive/page/3/");
  });

  it("should fetch pages until the last one is fetched", () => {
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

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

    // Changes url to `/archive`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/archive/");
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
    cy.location("href").should("eq", "http://localhost:3001/archive/page/2/");

    // Scrolls to bottom to fetch last page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-3']").should("not.exist");
    cy.wait("@pageThree");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-3']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/archive/page/3/");

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
    cy.location("href").should("eq", "http://localhost:3001/archive/page/3/");
  });

  it("should keep fetched pages when going back", () => {
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

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

    // Changes url to `/archive`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/archive/");
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
    cy.location("href").should("eq", "http://localhost:3001/archive/page/2/");

    // Scrolls to bottom to fetch last page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-3']").should("not.exist");
    cy.wait("@pageThree");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-3']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/archive/page/3/");

    // Go to a post.
    cy.get("[data-test='post-21-link']").should("exist").click();
    cy.get("[data-test='post-21']").should("exist");

    // Then, go back.
    cy.go("back");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='page-2']").should("exist");
    cy.get("[data-test='page-3']").should("exist").should("be.visible");
  });
});

describe("usePostTypeInfiniteScroll", () => {
  it("should load next post", () => {
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

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
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

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
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

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

  it.only("should render posts until the limit is reached", () => {
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");
  });

  it.skip("should fetch the next page of post if needed");
  it.skip("should render posts from the specified archive");
  it.skip("should keep rendered posts when going back");

  it.skip("should work with an archive that is being fetched");
  it.skip("should work with an archive that hasn't been fetched yet");
});
