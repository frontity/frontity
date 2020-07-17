describe("WP test", () => {
  beforeEach(() => {
    const { WP_INSTANCE } = Cypress.env();
    cy.task("replaceDB", WP_INSTANCE);
    cy.visit("http://localhost:3001?name=e2e-wp-test");
  });

  it("should load", () => {
    cy.get("[id='test']").should("have.attr", "class", "test");
  });
});
