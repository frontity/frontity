describe("WP test", () => {
  beforeEach(() => {
    await cy.task('replaceDB');
    cy.visit("http://localhost:3001?name=e2e-wp-test");
  });

  it("should load", () => {
    cy.get("[id='test']").should("have.attr", "class", "test");
  });
});
