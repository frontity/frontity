/* eslint-disable @typescript-eslint/no-unused-vars */
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  /**
   * Extend the inteface for `cy`.
   */
  interface Chainable {
    /**
     * Visit a URL without loading the scripts, to make sure that it works in
     * SSR.
     *
     * @example
     * ```
     * cy.visitSSR(fullURL(link)).then(() => {
     *  cy.get("title").should("contain", title);
     * }
     * ```
     */
    visitSSR(url: string): Chainable<Document>;

    /**
     * Expose custom types for cy.state().
     */
    state: State;

    /**
     * Expose custom types for cy.*.toMatchSnapshot().
     */
    toMatchSnapshot(): void;
  }
}

/**
 * The definition for `cy.state`.
 *
 * It is part of the Cypress API, but the types are missing yet:
 * - https://github.com/cypress-io/cypress/issues/4771
 * - https://github.com/cypress-io/cypress-documentation/pull/805.
 */
interface State {
  (property: "document"): Document;
  (property: "window"): Cypress.AUTWindow;
  (property: "runnable"): any;
  (property: string): any;
}
