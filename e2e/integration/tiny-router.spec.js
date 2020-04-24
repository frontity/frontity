describe("Tiny Router", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?name=tiny-router");
  });

  it("should show render contents in home", () => {
    cy.location("href").should("eq", "http://localhost:3001/?name=tiny-router");
    cy.get('[data-test-id="content"]')
      .should("exist")
      .should("have.text", "Home");
  });

  it("should switch router when router is set", () => {
    cy.location("href").should("eq", "http://localhost:3001/?name=tiny-router");

    cy.get('button[data-button-id="switch-to-about"]').click();
    cy.location("href").should("eq", "http://localhost:3001/about/");
    cy.get('[data-test-id="content"]')
      .should("exist")
      .should("have.text", "About");

    cy.get('button[data-button-id="switch-to-home"]').click();
    cy.location("href").should("eq", "http://localhost:3001/?name=tiny-router");
    cy.get('[data-test-id="content"]')
      .should("exist")
      .should("have.text", "Home");
  });

  it("should switch router when router is set with `push`", () => {
    cy.location("href").should("eq", "http://localhost:3001/?name=tiny-router");

    cy.get('button[data-button-id="switch-using-push"]').click();
    cy.location("href").should("eq", "http://localhost:3001/about/");
    cy.get('[data-test-id="content"]')
      .should("exist")
      .should("have.text", "About");
  });

  it("should switch router when router is set with `replace`", () => {
    cy.location("href").should("eq", "http://localhost:3001/?name=tiny-router");

    cy.get('button[data-button-id="switch-using-replace"]').click();
    cy.location("href").should("eq", "http://localhost:3001/about/");
    cy.get('[data-test-id="content"]')
      .should("exist")
      .should("have.text", "About");
  });

  it("should recover state when moving back and forward in history", () => {
    cy.location("href").should("eq", "http://localhost:3001/?name=tiny-router");

    cy.get('button[data-button-id="switch-using-state"]').click();
    cy.location("href").should("eq", "http://localhost:3001/about/");
    cy.get('[data-test-id="content"]')
      .should("exist")
      .should("have.text", "About");
    cy.get('[data-test-id="has-state"]')
      .should("exist")
      .should("have.text", "Router has state!");

    cy.get('button[data-button-id="switch-to-home"]').click();
    cy.location("href").should("eq", "http://localhost:3001/?name=tiny-router");
    cy.get('[data-test-id="content"]')
      .should("exist")
      .should("have.text", "Home");
    cy.get('[data-test-id="has-state"]').should("not.exist");

    cy.go("back");
    cy.location("href").should("eq", "http://localhost:3001/about/");
    cy.get('[data-test-id="content"]')
      .should("exist")
      .should("have.text", "About");
    cy.get('[data-test-id="has-state"]')
      .should("exist")
      .should("have.text", "Router has state!");

    cy.go("back");
    cy.location("href").should("eq", "http://localhost:3001/?name=tiny-router");
    cy.get('[data-test-id="content"]')
      .should("exist")
      .should("have.text", "Home");
    cy.get('[data-test-id="has-state"]').should("not.exist");

    cy.go("forward");
    cy.location("href").should("eq", "http://localhost:3001/about/");
    cy.get('[data-test-id="content"]')
      .should("exist")
      .should("have.text", "About");
    cy.get('[data-test-id="has-state"]')
      .should("exist")
      .should("have.text", "Router has state!");
  });

  it("should work if link doesn't have a trailing forward slash", () => {
    cy.location("href").should("eq", "http://localhost:3001/?name=tiny-router");

    cy.get('button[data-button-id="switch-to-about-no-trailing"]').click();
    cy.location("href").should("eq", "http://localhost:3001/about/");
    cy.get('[data-test-id="content"]')
      .should("exist")
      .should("have.text", "About");
  });

  it("should scroll to the element when a hash link is clicked", () => {
    cy.location("href").should("eq", "http://localhost:3001/?name=tiny-router");
    cy.get('div[id="hash-element"]').isNotInViewport();
    cy.get('a[data-link-id="hash-link"]').click();
    cy.get('div[id="hash-element"]').isInViewport();
    cy.location("href").should(
      "eq",
      "http://localhost:3001/?name=tiny-router#hash-element"
    );
  });
});
