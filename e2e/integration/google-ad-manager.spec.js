describe("Google Ad Manager", () => {
  it("should load the GPT library", () => {
    cy.visit("http://localhost:3001?name=google-ad-manager");
    cy.get(
      `script[src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"]`
    );
  });

  it("should render GPT ad units from fills", () => {
    // Go to home.
    cy.visit("http://localhost:3001?name=google-ad-manager");

    // Get add unit from header.
    cy.get("#header-ad > div").should("have.descendants", "iframe");

    // Get ad unit from footer.
    cy.get("#footer-ad > div").should("have.descendants", "iframe");

    // Go to "/post/".
    cy.get("button#change-link").click();

    // Get add unit from header.
    cy.get("#header-ad_post > div").should("have.descendants", "iframe");

    // Get ad unit from footer.
    cy.get("#footer-ad_post > div").should("have.descendants", "iframe");

    // Get add unit from content.
    cy.get("#content-ad_post > div").should("have.descendants", "iframe");
  });

  it("should work using GPT component directly from libraries", () => {
    // Go to home.
    cy.visit("http://localhost:3001?name=google-ad-manager");

    // Go to "/post-with-gpt/".
    cy.get("button#change-link-gpt").click();

    // Get add unit from content.
    cy.get("#div-gpt-below-content > div").should("have.descendants", "iframe");
  });

  it("should add the link to the container ID if data is passed", () => {
    // Go to home.
    cy.visit("http://localhost:3001?name=google-ad-manager");

    // Go to "/post/".
    cy.get("button#change-link").click();

    // Get add unit from content ("/post/").
    cy.get("#content-ad_post > div").should("have.descendants", "iframe");

    // Get add unit from content ("/next-post/").
    cy.get("#content-ad_next-post > div").should("have.descendants", "iframe");
  });
});
