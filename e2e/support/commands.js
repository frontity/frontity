/* eslint-disable jest/valid-expect */

require("cypress-plugin-snapshots/commands");

Cypress.Commands.add("isInViewport", { prevSubject: true }, (subject) => {
  const bottom = Cypress.$(cy.state("window")).height();
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).not.to.be.greaterThan(bottom);
  expect(rect.bottom).not.to.be.greaterThan(bottom);

  return subject;
});

Cypress.Commands.add("isNotInViewport", { prevSubject: true }, (subject) => {
  const bottom = Cypress.$(cy.state("window")).height();
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).to.be.greaterThan(bottom);
  expect(rect.bottom).to.be.greaterThan(bottom);

  return subject;
});

/**
 * Extends the `visit` command to add an option to disable scripts. Useful when
 * testing SSR content.
 *
 * Based on the solution @pke proposed on the following comment:
 * https://github.com/cypress-io/cypress/issues/1611#issuecomment-623896822.
 */
Cypress.Commands.overwrite("visit", (visit, url, options = {}) => {
  const parentDocument = cy.state("window").parent.document;
  const iframe = parentDocument.querySelector(".iframes-container iframe");
  if (false === options.script) {
    if (false !== Cypress.config("chromeWebSecurity")) {
      throw new TypeError(
        "When you disable script you also have to set 'chromeWebSecurity' in your config to 'false'"
      );
    }
    iframe.sandbox = "";
  } else {
    /**
     * In case it was added by a visit before, the attribute has to be removed
     * from the iframe.
     */
    iframe.removeAttribute("sandbox");
  }
  return visit(url, options);
});
