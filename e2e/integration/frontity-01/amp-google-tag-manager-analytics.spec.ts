describe("Google Tag Manager AMP", () => {
  it("should render the tags for the tracking IDs", () => {
    cy.visitSSR(
      "http://localhost:3001/?frontity_name=amp-google-tag-manager-analytics"
    ).then(() => {
      // The AMP library for analytics should exist.
      cy.get(
        "script[src='https://cdn.ampproject.org/v0/amp-analytics-0.1.js']"
      ).should("exist");

      // Two `amp-analytics` elements should have been rendered, each one with
      // its corresponding container ID.
      cy.get("amp-analytics[config*='id=GTM-XXXXXX-X']").should("exist");
      cy.get("amp-analytics[config*='id=GTM-YYYYYY-Y']").should("exist");

      // Both should have the same AMP config.
      cy.get("amp-analytics > script")
        .should("have.length", 2)
        .each(($script) => {
          cy.wrap($script).should(
            "contain.text",
            '{"vars":{"someProp":"someValue"}}'
          );
        });
    });
  });
});
