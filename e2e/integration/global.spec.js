describe("Global", () => {
  it("should have a blue background, but not a red color", () => {
    cy.visit("http://localhost:3001/color-red?name=global");
    cy.visit("http://localhost:3001/background-blue?name=global");
    cy.get("body").should("not.have.css", "background-color", "rgb(0, 0, 255)");
    cy.get("body").should("not.have.css", "color", "rgb(255, 0, 0)");
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("body").should("have.css", "background-color", "rgb(0, 0, 255)");
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("body").should("not.have.css", "background-color", "rgb(0, 0, 255)");
  });

  it("should have a red color, but not a blue background", () => {
    cy.visit("http://localhost:3001/background-blue?name=global");
    cy.visit("http://localhost:3001/color-red?name=global");
    cy.get("body").should("not.have.css", "background-color", "rgb(0, 0, 255)");
    cy.get("body").should("not.have.css", "color", "rgb(255, 0, 0)");
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("body").should("have.css", "color", "rgb(255, 0, 0)");
    cy.get("[data-test-id='toggle-button']").click();
    cy.get("body").should("not.have.css", "color", "rgb(255, 0, 0)");
  });
});
