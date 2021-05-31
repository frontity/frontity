describe("Google Analytics AMP", () => {
  it("should render the tags for the tracking IDs", () => {
    cy.visitSSR(
      "http://localhost:3001/?frontity_name=amp-google-analytics"
    ).then(() => {
      // The AMP library for analytics should exist.
      cy.get(
        "script[src='https://cdn.ampproject.org/v0/amp-analytics-0.1.js']"
      ).should("exist");

      // Only one `amp-analytics` elements should have been rendered for all the
      // tracking IDs
      cy.get("amp-analytics[type='gtag']")
        .should("exist")
        .should("have.length", 1);

      // The AMP config should contain all tracking IDs, variables and triggers.
      cy.get("amp-analytics[type='gtag'] > script").should(
        "contain.text",
        JSON.stringify({
          vars: {
            gtag_id: "UA-XXXXXXXX-X",
            config: {
              "UA-XXXXXXXX-X": { groups: "default" },
              "UA-YYYYYYYY-Y": { groups: "default" },
            },
            someProp: "someValue",
          },
          triggers: {
            button: {
              selector: "#the-button",
              on: "click",
              vars: {
                event_name: "login",
                method: "Google",
              },
            },
          },
        })
      );
    });
  });
});
