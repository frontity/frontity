const assertTemplate = () => {
  cy.get("html").should("have.attr", "amp");
  cy.get("style[amp-boilerplate]").should("exist");
  cy.get("style[amp-custom]").should("exist");
  cy.get("body script").should("not.exist");
};

describe("AMP", () => {
  it("should render the template from the server", () => {
    cy.visitSSR("http://localhost:3001/?frontity_name=amp").then(() => {
      assertTemplate();

      // The static content should contain only 2 stlye tags.
      cy.get("style[amp-boilerplate]").should("have.length", 2);
      cy.get("style[amp-custom]").should("have.length", 1);
      cy.get("style").should("have.length", 3);
    });
  });

  it("should render the template correctly", () => {
    cy.visit("http://localhost:3001/?frontity_name=amp");

    assertTemplate();
  });
});
