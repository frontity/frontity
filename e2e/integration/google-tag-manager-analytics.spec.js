describe("Google Tag Manager", () => {
  const pageviewHome = {
    event: "pageview",
    link: "/?name=google-tag-manager",
    title: "Homepage Title",
  };

  const pageviewSomePost = {
    event: "pageview",
    link: "/some-post/",
    title: "Some Post Title",
  };

  const someEvent = {
    event: "some event",
    payload: { content: "some content" },
  };

  beforeEach(() => {
    cy.visit("http://localhost:3001?name=google-tag-manager");
  });

  it("should load Google Tag Manager library", () => {
    cy.get(
      `script[src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXX-X"]`
    );
  });

  it("should have sent the first pageview", () => {
    cy.window().its("dataLayer").its(0).should("deep.equal", pageviewHome);
  });

  it("should sent a pageview if the page changes", () => {
    cy.get("button#change-link").click();
    cy.window().its("dataLayer").its(1).should("deep.equal", pageviewSomePost);
  });

  it("should sent pageviews when going back or forward", () => {
    cy.get("button#change-link").click();
    cy.go("back");
    cy.window().its("dataLayer").its(2).should("deep.equal", pageviewHome);

    cy.go("forward");
    cy.window().its("dataLayer").its(3).should("deep.equal", pageviewSomePost);
  });

  it("should send events", () => {
    // Wait for the first pageview to be sent.
    cy.window().its("dataLayer").its(0).should("deep.equal", pageviewHome);
    // Send event.
    cy.get("button#send-event").click();
    cy.window().its("dataLayer").its(1).should("deep.equal", someEvent);
  });
});
