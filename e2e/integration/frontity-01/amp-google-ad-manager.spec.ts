describe("Google Ad Manager AMP", () => {
  it("should render the `amp-ad` fills specified", () => {
    cy.visitSSR(
      "http://localhost:3001/?frontity_name=amp-google-ad-manager"
    ).then(() => {
      // The AMP library for ads should exist just once.
      cy.get("script[src='https://cdn.ampproject.org/v0/amp-ad-0.1.js']")
        .should("exist")
        .should("have.length", 1);

      cy.get(`amp-ad[type="doubleclick"]`).should("have.length", 2);

      cy.get(`amp-ad[type="doubleclick"]:nth-of-type(1)`)
        .should("have.attr", "width", "300")
        .should("have.attr", "height", "250")
        .should("have.attr", "data-slot", "/4595/nfl.test.open");

      cy.get(`amp-ad[type="doubleclick"]:nth-of-type(2)`)
        .should("have.attr", "width", "300")
        .should("have.attr", "height", "600")
        .should("have.attr", "data-slot", "/4595/nfl.test.open")
        .should("have.attr", "data-override-width", "300")
        .should("have.attr", "data-override-height", "250")
        .should("have.attr", "data-multi-size", "300x600, 300x250")
        .should("have.attr", "data-multi-size-validation", "false");
    });
  });
});
