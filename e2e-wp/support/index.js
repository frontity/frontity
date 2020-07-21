beforeEach(() => {
  const { WP_INSTANCE } = Cypress.env();
  cy.task("replaceDB", WP_INSTANCE);
});
