import responsePageOne from "./responses/infinite-scroll-page-1.json";
import responsePageTwo from "./responses/infinite-scroll-page-2.json";
import responsePostOne from "./responses/infinite-scroll-post-1.json";

describe("UseInfiniteScroll", () => {
  it("useArchiveInfiniteScroll should load next page", async () => {
    // Loads `/` and mocks `window.fetch`.
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
    });
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
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("exist");
  });

  it("useArchiveInfiniteScroll should return `isError` true", () => {
    // Loads `/` and mocks `window.fetch`.
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
    });
    cy.route({
      url: "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&page=2",
      status: 503,
      response: {},
      delay: 300,
    }).as("pageTwo");

    // Changes url to `/archive`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/archive/");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.get("[data-test='error']").should("exist");

    // Try fetching again.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetch']").should("not.exist");
    cy.get("[data-test='fetching']").should("exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='error']").should("exist");

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
    cy.get("[data-test='page-2']").should("exist");
  });

  it("usePostTypeInfiniteScroll should load next post", () => {
    // Loads `/` and mocks `window.fetch`.
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
    });
    cy.route({
      url:
        "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&slug=the-beauties-of-gullfoss",
      response: responsePostOne,
      headers: {
        "x-wp-total": 1,
        "x-wp-totalpages": 1,
      },
    });

    // Changes url to `/post-type`.
    cy.get("[data-test='to-post-type']").should("exist").click();
    cy.location("href").should(
      "eq",
      "http://localhost:3001/2016/the-beauties-of-gullfoss/"
    );
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-60']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next page.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-57']").should("exist");
  });
});
