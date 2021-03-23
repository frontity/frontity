describe("Source Auth", () => {
  it("Should remove the auth token from the client", () => {
    cy.visit(
      // We load the 'render' project but it doesn't matter as we're only
      // interested in window.frontity
      "http://localhost:3001/?frontity_name=render&frontity_source_auth=test"
    );

    cy.window().its("frontity.state.source.auth").should("be.undefined");
    cy.window()
      .its("frontity.state.frontity.options.sourceAuth")
      .should("be.undefined");
  });

  it("Should remove auth token in a site with SSR-only", () => {
    cy.visitSSR(
      "http://localhost:3001/?frontity_name=render&frontity_source_auth=test"
    );

    cy.window().its("frontity.state.source.auth").should("be.undefined");
    cy.window()
      .its("frontity.state.frontity.options.sourceAuth")
      .should("be.undefined");
  });
});
