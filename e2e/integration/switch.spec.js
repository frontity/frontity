describe("Switch", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?name=switch");
  });

  it("should render last component when no match", () => {
    cy.get("h1#one").should("not.exist");
    cy.get("h1#two").should("not.exist");
    cy.get("h1")
      .should("exist")
      .should("have.text", "Default");
  });

  it("should render components with truthy condition", () => {
    cy.get("h1#default")
      .should("exist")
      .should("have.text", "Default");

    cy.get("button#set-to-1").click();
    cy.get("h1#one")
      .should("exist")
      .should("have.text", "One");
    cy.get("h1#two").should("not.exist");
    cy.get("h1#default").should("not.exist");

    cy.get("button#set-to-2").click();
    cy.get("h1#two")
      .should("exist")
      .should("have.text", "Two");
    cy.get("h1#one").should("not.exist");
    cy.get("h1#default").should("not.exist");
  });
});
