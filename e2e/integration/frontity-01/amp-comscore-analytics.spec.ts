describe("Comscore AMP", () => {
  it("should render the tags for the tracking IDs", () => {
    cy.visitSSR(
      "http://localhost:3001/?frontity_name=amp-comscore-analytics"
    ).then(() => {
      // The AMP library for analytics should exist.
      cy.get(
        "script[src='https://cdn.ampproject.org/v0/amp-analytics-0.1.js']"
      ).should("exist");

      // Two `amp-analytics` elements should have been rendered, each one with
      // its corresponding tracking ID.
      cy.get("amp-analytics[type='comscore'] > script").within(($scripts) => {
        cy.wrap($scripts).should("have.length", 2);
        cy.wrap($scripts.eq(0)).should(
          "contain.text",
          '{"vars":{"c2":"111111"}}'
        );
        cy.wrap($scripts.eq(1)).should(
          "contain.text",
          '{"vars":{"c2":"222222"}}'
        );
      });
    });
  });
});
