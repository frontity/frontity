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
    cy.get("#header-ad > div").should(
      "have.id",
      "google_ads_iframe_/6355419/Travel/Europe/_0__container__"
    );

    // Get ad unit from footer.
    cy.get("#footer-ad > div").should(
      "have.id",
      "google_ads_iframe_/6355419/Travel/Europe/France/_0__container__"
    );

    // Go to post.
    cy.get("button#change-link").click();

    // Get add unit from header.
    cy.get("#header-ad_post > div").should(
      "have.id",
      "google_ads_iframe_/6355419/Travel/Europe/_0__container__"
    );

    // Get ad unit from footer.
    cy.get("#footer-ad_post > div").should(
      "have.id",
      "google_ads_iframe_/6355419/Travel/Europe/France/_0__container__"
    );

    // Get add unit from content.
    cy.get("#content-ad_post > div").should(
      "have.id",
      "google_ads_iframe_/6355419/Travel/Europe/France/Paris/_0__container___"
    );
  });

  it("should work using GPT component directly from libraries", () => {
    // Go to page without slots.
    // Check GPT fills are not there.
    // Check GPT component is there.
  });

  it("should add the link to the container ID if data is passed", () => {
    // Go to post 2.
    // Check add unit of next post (data is passed).
  });
});
