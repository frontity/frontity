describe("Image lazy-loading (with native lazy-load)", () => {
  beforeEach(() => {
    cy.viewport(360, 640);
    cy.visit("http://localhost:3001?frontity_name=image");
  });

  it("should render an image with loading=lazy", () => {
    cy.scrollTo("topLeft");
    cy.get("img[height]").should("have.attr", "loading", "lazy");
  });
});

describe("amp-image", () => {
  beforeEach(() => {
    cy.viewport(360, 640);
    cy.visit("http://localhost:3001/amp-image/?frontity_name=amp-image");
  });

  it("should render an amp-image", () => {
    cy.scrollTo("topLeft");
    cy.get("amp-img[height]").should("have.attr", "layout", "fill");
  });
});
