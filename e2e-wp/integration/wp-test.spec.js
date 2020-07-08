describe("WP test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?name=e2e-wp");
  });

  it("should load", () => {
    cy.get("[id='test']").should("have.attr", "class", "test");
  });
});
