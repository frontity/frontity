describe("Custom Configuration", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?frontity_name=custom-configuration");
  });

  /**
   * This is a simple functionality check to make sure the application
   * is loaded and the aliases are working.
   */
  it("should render the theme with the aliased components package", () => {
    cy.get("h1#one").should("not.exist");
    cy.get("h1").should("exist").should("have.text", "Default");
    cy.get("button#set-to-1").click();
    cy.get("h1#one").should("exist").should("have.text", "@@111@@");
  });
});
