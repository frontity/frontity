describe("Image (with native lazy-load)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000?name=image", {
      onBeforeLoad(win) {
        win.scrollTo(0, 0);
      }
    });
  });

  it("should show an image with loading=auto if it doesn't have height", () => {
    cy.get("img:not([height])")
      .should("be.visible")
      .should("have.attr", "loading", "auto");
  });

  it("should show an image with loading=lazy if it has a height", () => {
    cy.get("img[height]")
      .should("be.visible")
      .should("have.attr", "loading", "lazy");
  });
});

// describe("Image (with Intersection Observer)", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000?name=image", {
//       onBeforeLoad(win) {
//         // Remove the "loading" prop from the HTMLImageElement prototype
//         Object.defineProperty(win.HTMLImageElement.prototype, "loading", {});
//         delete win.HTMLImageElement.prototype.loading;
//       }
//     });
//   });

//   it("should show an image with loading=auto if it doesn't have height", () => {
//     cy.get("img:not([height])")
//       .should("be.visible")
//       .should("have.attr", "loading", "auto");
//   });

//   it("should show an image with loading=lazy if it has a height", () => {
//     cy.get("img[height]")
//       .should("be.visible")
//       .should("have.attr", "loading", "lazy");
//   });
// });

// describe("Image (without lazy-load)", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000?name=image");
//   });

//   it("should be showing an image", () => {
//     cy.get(".test-image-1").should("be.visible");
//   });
// });
