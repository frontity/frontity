describe("Smart Adserver", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?frontity_name=smart-adserver");
  });

  it("Should load the smart adserver library", () => {
    // `123` is the networkId defined in state.smartAdserver.networkId
    cy.get(`script[src="http://ced.sascdn.com/tag/123/smart.js"][async]`);
  });

  it("Should render the ad using the SmartAd component from the libraries", () => {});

  it("Should warn if you forget to put the networkId || subdomain", () => {});

  it("Should make the iframe call", () => {});

  it("Should make the std call", () => {});

  it("Should render the ad in the slot", () => {
    // Get ad unit from header.
    cy.get("#header > div").should("have.descendants", "iframe");
  });

  it("Should render with various configurations of options: pageId, formatId, siteId, tagId, target", () => {});
});
