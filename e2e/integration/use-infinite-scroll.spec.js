import responsePageOne from "./responses/infinite-scroll-page-1.json";
import responsePageTwo from "./responses/infinite-scroll-page-2.json";
import responsePostOne from "./responses/infinite-scroll-post-1.json";
import responseLastPost from "./responses/infinite-scroll-last-post.json";

describe("UseInfiniteScroll", () => {
  it("useArchiveInfiniteScroll should load next page", async () => {
    cy.visit("http://localhost:3001/?name=use-infinite-scroll");
    cy.location("href").should(
      "eq",
      "http://localhost:3001/?name=use-infinite-scroll"
    );

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&page=1",
      response: responsePageOne,
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&page=2",
      response: responsePageTwo,
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

  it("useArchiveInfiniteScroll should return `isError` true", () => {
    cy.visit("http://localhost:3001/?name=use-infinite-scroll");
    cy.location("href").should(
      "eq",
      "http://localhost:3001/?name=use-infinite-scroll"
    );

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&page=1",
      response: responsePageOne,
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&page=2",
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
      url: "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&page=2",
      response: responsePageTwo,
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

  it("usePostTypeInfiniteScroll should load next post", () => {
    cy.visit("http://localhost:3001/?name=use-infinite-scroll");
    cy.location("href").should(
      "eq",
      "http://localhost:3001/?name=use-infinite-scroll"
    );

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&page=1",
      response: responsePageOne,
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url:
        "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&slug=the-beauties-of-gullfoss",
      response: responsePostOne,
      headers: {
        "x-wp-total": 1,
        "x-wp-totalpages": 1,
      },
      delay: 300,
    }).as("postOne");

    // Changes url to `/post-type`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should(
      "eq",
      "http://localhost:3001/2016/the-beauties-of-gullfoss/"
    );
    cy.wait("@postOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-60']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-57']").should("exist").scrollIntoView();
    cy.location("href").should(
      "eq",
      "http://localhost:3001/2016/shinjuku-gyoen-national-garden/"
    );

    // Scrolls back to top.
    cy.scrollTo("top");
    cy.location("href").should(
      "eq",
      "http://localhost:3001/2016/the-beauties-of-gullfoss/"
    );
  });

  it("usePostTypeInfiniteScroll should return `isError` true", () => {
    cy.visit("http://localhost:3001/?name=use-infinite-scroll");
    cy.location("href").should(
      "eq",
      "http://localhost:3001/?name=use-infinite-scroll"
    );

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url:
        "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&slug=discovering-iceland",
      response: responseLastPost,
      headers: {
        "x-wp-total": 1,
        "x-wp-totalpages": 1,
      },
      delay: 300,
    }).as("lastPost");
    cy.route({
      url: "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&page=1",
      response: responsePageOne,
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageOne");
    cy.route({
      url: "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&page=2",
      status: 503,
      response: {},
      delay: 300,
    }).as("pageTwo");

    // Changes url to `/post-type`.
    cy.get("[data-test='to-last-post']").should("exist").click();
    cy.location("href").should(
      "eq",
      "http://localhost:3001/2016/discovering-iceland/"
    );
    cy.wait("@lastPost");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-26']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='post-23']").should("not.exist");
    cy.get("[data-test='error']").should("exist").scrollIntoView();
    cy.location("href").should(
      "eq",
      "http://localhost:3001/2016/discovering-iceland/"
    );

    // Try fetching again.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetch']").should("not.exist");
    cy.get("[data-test='fetching']").should("exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='error']").should("exist").scrollIntoView();
    cy.location("href").should(
      "eq",
      "http://localhost:3001/2016/discovering-iceland/"
    );

    cy.route({
      url: "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&page=2",
      response: responsePageTwo,
      headers: {
        "x-wp-total": 20,
        "x-wp-totalpages": 2,
      },
      delay: 300,
    }).as("pageTwo");

    // Try one more time.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='post-23']").should("not.exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='post-23']").should("exist").scrollIntoView();
    cy.location("href").should(
      "eq",
      "http://localhost:3001/2016/switzerlands-mountains/"
    );
  });
});
