describe("Image lazy-loading (with native lazy-load)", () => {
  beforeEach(() => {
    cy.viewport(360, 640);
    cy.visit("http://localhost:3000?name=image");
  });

  it("should render an image with loading=auto if it doesn't have height", () => {
    cy.scrollTo("topLeft");
    cy.get("img:not([height])")
      .should("have.attr", "loading", "auto")
      .should("not.be.visible");
    cy.get("img:not([height])")
      .scrollIntoView({ duration: 300 })
      .should("be.visible");
  });

  it("should render an image with loading=lazy if it has a height", () => {
    cy.scrollTo("topLeft");
    cy.get("img[height]").should("have.attr", "loading", "lazy");
  });
});

describe("Image lazy-loading (with Intersection Observer)", () => {
  beforeEach(() => {
    cy.viewport(360, 640);
    cy.visit("http://localhost:3000?name=image", {
      onBeforeLoad(win) {
        // Remove the "loading" prop from the HTMLImageElement prototype
        Object.defineProperty(win.HTMLImageElement.prototype, "loading", {});
        delete win.HTMLImageElement.prototype.loading;
      }
    });
  });

  it("should work scrolling from top to bottom", () => {
    cy.scrollTo("topLeft");
    cy.get("img:not(.top.left)").should("not.be.visible");
    cy.get("img.bottom.left")
      .scrollIntoView({ duration: 300 })
      .should("be.visible");
    cy.get("img.right").should("not.be.visible");
  });

  it("should work scrolling from bottom to top", () => {
    cy.scrollTo("bottomLeft");
    cy.get("img:not(.bottom.left)").should("not.be.visible");
    cy.get("img.top.left")
      .scrollIntoView({ duration: 300 })
      .should("be.visible");
    cy.get("img.right").should("not.be.visible");
  });

  it("should work scrolling from left to right", () => {
    cy.scrollTo("topLeft");
    cy.get("img:not(.bottom.left)").should("not.be.visible");
    cy.get("img.top.right")
      .scrollIntoView({ duration: 300 })
      .should("be.visible");
    cy.get("img.bottom").should("not.be.visible");
  });

  it("should work scrolling from right to left", () => {
    cy.scrollTo("bottomRight");
    cy.get("img:not(.bottom.right)").should("not.be.visible");
    cy.get("img.bottom.left")
      .scrollIntoView({ duration: 300 })
      .should("be.visible");
    cy.get("img.top").should("not.be.visible");
  });
});
