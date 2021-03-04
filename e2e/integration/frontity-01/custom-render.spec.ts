describe("Custom Render", () => {
  it("should render the custom App wrapped", () => {
    cy.visit("http://localhost:3001/?frontity_name=custom-render");

    cy.get("#root #wrapper").should("exist");
  });

  it("should render the custom links and scripts", () => {
    cy.visit("http://localhost:3001/?frontity_name=custom-render");

    // Custom head tag.
    cy.get("link[rel=custom]").should("have.attr", "value", "render");

    // Custom script tag.
    cy.get("script#custom-render-script").should("exist");
  });

  it("should have the same seed as on the server", () => {
    cy.visit("http://localhost:3001/?frontity_name=custom-render");

    cy.get("link[rel=seed]")
      .invoke("attr", "value")
      .then((seed) => {
        // The input field should have the server value.
        cy.get("input[name=seed").should("have.attr", "value", seed);
      });
  });

  it("should have the tags pushed via head and scripts API", () => {
    cy.visit("http://localhost:3001/?frontity_name=custom-render");

    cy.get("link[rel=head]").should("have.attr", "value", "custom");

    // Script tag pushed via `.scripts.push()` API.
    cy.get("script#pushed").should("exist");

    // This asserts that the custom script executed as well.
    cy.get("body").should("have.attr", "class", "pushed");
  });
});
