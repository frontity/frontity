describe("Smart Adserver", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?frontity_name=smart-adserver");
  });

  it("Should load the smart adserver library", () => {
    // `256` is the networkId defined in state.smartAdserver.networkId
    cy.get(`script[src="//ced.sascdn.com/tag/256/smart.js"][async]`).should(
      "exist"
    );
  });

  // ----- Testing the various component configurations ------
  it("Should render the ad using the SmartAd component from the libraries", () => {
    cy.get("#test-smartad").should("have.descendants", "img");
  });

  it("Should render the ad using the SmartAd component and a default tag id", () => {
    // Check that when there is no tagId specified the the id is "sas_" + `formatId`
    cy.get("#default-tag-id").should("have.descendants", "#sas_19809");
    cy.get("#default-tag-id > #sas_19809").should("have.descendants", "img");
  });

  it("Should render the ad in an iframe", () => {
    cy.get("#iframe-ad").should("have.descendants", "iframe");
  });

  it("Should render the ad in the slot", () => {
    cy.get("#hello").should("have.descendants", "img");
  });

  it("Should unmount correctly and show the other ad in the other page", () => {
    // Go to "/other-page/".
    cy.get("button#change-page").click();

    cy.get("#other-page-ad").should("have.descendants", "img");
  });

  it("Should set the minHeight on the ad container if it makes the 'std' call", () => {
    cy.get("#std-min-height").should("have.descendants", "iframe");

    cy.get("#std-min-height").should("have.css", "min-height", "100px");
  });
});
