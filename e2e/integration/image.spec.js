describe("Image", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000?name=image");
  });

  it("should be showing an image", () => {
    cy.get(".test-image-1").should("be.visible");
  });
});

describe("Image2", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000?name=image");
  });

  it("should be showing an image", () => {
    cy.get(".test-image-1").should("be.visible");
  });
});
