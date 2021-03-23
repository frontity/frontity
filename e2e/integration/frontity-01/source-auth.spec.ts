describe("Source auth", () => {
  it("Should remove state.source.auth", () => {
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
});
