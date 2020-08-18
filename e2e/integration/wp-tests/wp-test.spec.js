// This is just a test for illustrative purposes for now

describe("WP test", () => {
  beforeEach(() => {
    cy.task("installPlugin", { name: "all-in-one-seo-pack" });

    cy.visit("http://localhost:3001?name=e2e-wp-test");
  });

  it("should work", () => {
    cy.get("[id='test']").should("have.attr", "class", "test");
  });

  it("should work as well", () => {
    // Maybe just in this test we want to install another plugin like Yoast
    cy.task("installPlugin", { name: "wordpress-seo" });
    cy.get("[id='test']").should("have.attr", "class", "test");
  });
});
