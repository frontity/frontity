// This is just a test for illustrative purposes

describe("WP test", () => {
  beforeEach(() => {
    // Get the name of the WP instance passed as an env variable
    const { WP_INSTANCE } = Cypress.env();

    cy.task("setup", WP_INSTANCE);
    cy.task("installPlugin", {
      WP_INSTANCE,
      name: "all-in-one-seo-pack",
    });

    cy.visit("http://localhost:3001?name=e2e-wp-test");
  });

  it("should work", () => {
    cy.get("[id='test']").should("have.attr", "class", "test");
  });

  it("should work as well", () => {
    const { WP_INSTANCE } = Cypress.env();

    // Maybe just in this test we want to install another plugin like Yoast
    cy.task("installPlugin", { WP_INSTANCE, name: "wordpress-seo" });
    cy.get("[id='test']").should("have.attr", "class", "test");
  });
});
