describe("UseInView", () => {
  const url = "http://localhost:3001/?frontity_name=use-in-view";

  it("useInView should return supported true", () => {
    cy.visit(url);
    cy.location("href").should("eq", url);
    cy.get("#supported").should("exist").should("have.text", "supported: true");
  });

  it("useInView should return supported false", () => {
    cy.visit(url + "&removeIO");
    cy.location("href").should("eq", url + "&removeIO");
    cy.window().its("IntersectionObserver").should("eq", undefined);
    cy.get("#supported")
      .should("exist")
      .should("have.text", "supported: false");
  });
});
