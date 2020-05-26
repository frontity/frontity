describe("Html2React", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?name=html2react");
  });

  it("should pass state to processors", () => {
    cy.get("p").should("have.css", "color", "rgb(0, 0, 255)");
  });

  it("should re-render when the state is updated", () => {
    cy.get("button#change-color").click();
    cy.get("p").should("have.css", "color", "rgb(255, 0, 0)");
  });

  it("should remove elements when processors return `null`", () => {
    cy.get("button#remove-paragraphs").click();
    cy.get("p").should("not.exist");
  });

  it("should work with old processors", () => {
    cy.get("span#old-processors").should("have.text", "Yes");
  });
});
