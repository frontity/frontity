describe("Google Tag Manager", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?site=google-tag-manager");
  });

  it("should load Google Tag Manager library", () => {});

  it("should sent a first pageview", () => {});

  it("should sent a pageview if the page changes", () => {
    cy.get("button#change-link");
  });

  it("should send events", () => {
    cy.get("button#send-event");
  });
});
