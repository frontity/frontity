describe("useFills", () => {
  it("should show empty slots", () => {
    cy.visit("http://localhost:3001/?name=slot-and-fill");
    cy.get("#useFills-slot1-empty")
      .should("exist")
      .should("have.text", "useFills slot 1 empty");
    cy.get("#useFills-slot2-empty")
      .should("exist")
      .should("have.text", "useFills slot 2 empty");
  });

  it("should show first Fill", () => {
    cy.visit("http://localhost:3001/?name=slot-and-fill");
    cy.get("#addFill1").click();
    cy.get("#useFills-slot1-empty").should("not.exist");
    cy.get("#Fill1").should("exist").should("have.text", "I am Fill1");
    cy.get("#useFills-slot2-empty").should("exist");
  });

  it("should show second Fill", () => {
    cy.visit("http://localhost:3001/?name=slot-and-fill");
    cy.get("#addFill2").click();
    cy.get("#useFills-slot1-empty").should("not.exist");
    cy.get("#Fill2").should("exist").should("have.text", "I am Fill2");
    cy.get("#useFills-slot2-empty").should("exist");
  });

  it("should show both Fills in priority order", () => {
    cy.visit("http://localhost:3001/?name=slot-and-fill");
    cy.get("#addFill1").click();
    cy.get("#addFill2").click();
    cy.get("#useFills-slot1-empty").should("not.exist");
    cy.get("#useFills-slot1").should("have.text", "I am Fill2I am Fill1");
    cy.get("#useFills-slot2-empty").should("exist");
  });
});
