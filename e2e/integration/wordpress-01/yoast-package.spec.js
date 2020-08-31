describe("Yoast Package", () => {
  before(() => {
    cy.task("installPlugin", { name: "wordpress-seo" });
    cy.task("loadDatabase", {
      path: "./wp-data/yoast-package/yoast-default.sql",
    });
  });

  after(() => {
    cy.task("resetDatabase");
    cy.task("removeAllPlugins");
  });

  it("should render the yoast head field for posts", () => {
    cy.visit("http://localhost:3001/hello-world?name=yoast-package");
    cy.get("title").contains("Hello World From Yoast! - Test WP Site");
    cy.get('meta[name="description"]').should(
      "have.attr",
      "content",
      "Meta tags are managed from WordPress by Yoast SEO plugin."
    );
  });
});
