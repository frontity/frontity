describe("Loadable", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?frontity_name=loadable");
  });

  it("should be able to render elements from dynamic components", () => {
    cy.get("[data-test-id='dynamic-div']").should(
      "have.text",
      "I am the Dynamic1 component"
    );
    cy.get("[data-test-id='dynamic2-div']").should(
      "have.text",
      "I am the Dynamic2 component"
    );
  });

  it("should be able to use javascript from dynamic components", () => {
    cy.get("[data-test-id='toggle-div']").should("have.text", "OFF");
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("[data-test-id='toggle-div']").should("have.text", "ON");
  });
});
