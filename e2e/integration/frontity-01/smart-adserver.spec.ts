describe("Smart Adserver", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?frontity_name=smart-adserver");
  });

  it("Should load the smart adserver library", () => {
    // `1445` is the networkId defined in state.smartAdserver.networkId
    cy.get(`script[src="//ced.sascdn.com/tag/1445/smart.js"][async]`);
  });

  // ----- Testing the various component configurations ------

  it("Should render the ad using the SmartAd component from the libraries", () => {
    cy.get("#test-smartad").should("have.descendants", "script");
  });

  it("Should render the ad using the SmartAd component and a default tag id", () => {
    // Check that when there is no tagId specified the the id is "sas_" + `formatId`
    cy.get("#default-tag-id").should("have.descendants", "#sas_2");
  });

  it("Should render the ad in an iframe", () => {
    cy.get("#iframe-ad").should("have.descendants", "iframe");
  });

  it("Should render the ad in the slot", () => {
    // The Slot
    cy.get("#hello").should("have.descendants", "script");
  });

  it("Should render with various configurations of options: pageId, formatId, siteId, tagId, target", () => {});
});
