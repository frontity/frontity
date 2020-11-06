describe("Render", () => {
  it("should rerender component subscribe to data object only once", () => {
    cy.visit("http://localhost:3001/?frontity_name=render");

    // Stubs calls to REST API.
    cy.server();
    cy.route({
      url: "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      response: "fixture:render/post-1.json",
      headers: {
        "x-wp-total": 1,
        "x-wp-totalpages": 1,
      },
      delay: 300,
    }).as("postOne");

    // Changes url to `/post-1`.
    cy.get("[data-button-id='go-to-post-1']").click();
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
    cy.get("[data-test-id='content']").should("contain", "Post 1");
  });
});
