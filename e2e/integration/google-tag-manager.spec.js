describe("Google Tag Manager", () => {
  const pageviewHome = {
    event: "virtualPageview",
    pageview: {
      page: "/?name=google-tag-manager",
      title: "Homepage Title",
    },
  };

  const pageviewSomePost = {
    event: "virtualPageview",
    pageview: {
      page: "/some-post/",
      title: "Some Post Title",
    },
  };

  const someEvent = {
    event: "virtualEvent",
    virtualEvent: { some: "content" },
  };

  beforeAll(() => {
    cy.visit("http://localhost:3001?site=google-tag-manager");
  });

  it("should load Google Tag Manager library", () => {
    cy.find(
      `script[src="https://www.googletagmanager.com/gtm.js?id=UA-XXXXXX-X"]`
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
    cy.go("back");
    cy.window().its("dataLayer").its(2).should("deep.equal", pageviewHome);

    cy.go("forward");
    cy.window().its("dataLayer").its(3).should("deep.equal", pageviewSomePost);
  });

  it("should send events", () => {
    cy.get("button#send-event").click();
    cy.get("button#change-link").click();
    cy.window().its("dataLayer").its(4).should("deep.equal", someEvent);
  });
});
