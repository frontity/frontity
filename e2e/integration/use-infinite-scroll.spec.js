// import responsePageOne from "./responses/infinite-scroll-page-1.json";
// import responsePageTwo from "./responses/infinite-scroll-page-2.json";

describe("UseInfiniteScroll", () => {
  it("useArchiveInfiniteScroll should load next page", async () => {
    // Loads `/` and mocks `window.fetch`.
    cy.visit("http://localhost:3001/?name=use-infinite-scroll");
    cy.location("href").should(
      "eq",
      "http://localhost:3001/?name=use-infinite-scroll"
    );

    // Stubs call to page one.
    cy.server();
    cy.route({
      url: "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&page=1",
      // response: responsePageOne,
      // delay: 500,
    }).as("pageOne");

    // Changes url to `/archive`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/archive/");
    cy.wait("@pageOne");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Stubs call to page two.
    cy.server();
    cy.route({
      url: "https://test.frontity.org/wp-json/wp/v2/posts?_embed=true&page=2",
      // response: responsePageTwo,
      // delay: 500,
    }).as("pageTwo");

    // Scrolls to bottom to fetch next page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='page-2']").should("exist");
  });

  // it("usePostTypeInfiniteScroll should load next post", () => {
  //   const url = "http://localhost:3001/post-type/?name=use-infinite-scroll";
  //   cy.visit(url);
  //   cy.location("href").should("eq", url);
  //   cy.get("#post-type").should("exist").should("have.text", "Post Type");
  // });
});
