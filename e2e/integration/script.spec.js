describe("Script", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?name=script");
  });

  it("should load a external script from src url", () => {
    cy.get("[id='from-src']")
      .should(
        "have.attr",
        "src",
        "https://unpkg.com/jquery@3.4.1/dist/jquery.js"
      )
      .should("have.attr", "async", "async");
  });

  it("should load inline script", () => {
    cy.get("[data-test-id='target']").should("have.text", "OFF");
    cy.get("[data-test-id='toggle']").click();
    cy.get("[data-test-id='target']").should("have.text", "ON");
  });
});
