describe("Custom Render", () => {
  it("should render the custom App wrapped", () => {
    cy.visit("http://localhost:3001/?frontity_name=custom-render");

    cy.get("#root #wrapper").should("exist");
  });

  it("should render the custom links and scripts", () => {
    cy.visit("http://localhost:3001/?frontity_name=custom-render");

    // Custom head tag.
    cy.get("link[rel=custom]")
      .invoke("attr", "value")
      .should("equal", "render");

    // Custom script tag.
    cy.get("script#custom-render-script").should("exist");
  });

  it("should have the same seed as on the server", () => {
    cy.visit("http://localhost:3001/?frontity_name=custom-render");

    cy.get("link[rel=seed]")
      .invoke("attr", "value")
      .then((seed) => {
        // The input field should have the server value.
        cy.get("input[name=seed]")
          .invoke("attr", "value")
          .should("equal", seed);
      });
  });
});
