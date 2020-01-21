describe("Script", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?name=script");
  });

  it("should load a external script from src url", () => {
    cy.get("[data-test-id='from-src']")
      .should("have-attr", "src", "/link-to-script.js")
      .should("have-attr", "async", true);
  });

  it("should load inline script", () => {
    cy.get("[data-test-id='from-children']").should("have-attr", "async", true);
    cy.get("[date-test-id='target']").should("have.text", "OFF");
    cy.get("[date-test-id='button']").click();
    cy.get("[date-test-id='target']").should("have.text", "ON");
  });
});
