/* eslint-disable jest/valid-expect,jest/no-standalone-expect */
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

/**
 * The DOMparser.
 */
const parser = new DOMParser();

/**
 * Appends children nodes to the target.
 *
 * @param children - A list of DOM nodes.
 * @param target - The target to append the children to.
 */
const apendChildrenTo = (children, target) => {
  // Clear out the previous content
  target.innerHTML = "";

  // Append each elment
  children.forEach((element) => {
    // Do not append `<script>` tags with `src` defined
    if (element.tagName !== "script" || element.hasAttribute("src")) {
      target.appendChild(element);
    }
  });
};

/**
 * Parses the given text as html and returns an attached to the dom, node reference.
 *
 * @param text - The text value to pe parsed into html.
 * @returns The document element resulted.
 */
const parseHTML = (text) => {
  const doc = parser.parseFromString(text, "text/html");
  const parentDocument = cy.state("window").parent.document;
  const iframe = parentDocument.querySelector(".iframes-container iframe");

  apendChildrenTo(Array.from(doc.head.childNodes), iframe.contentDocument.head);
  apendChildrenTo(Array.from(doc.body.childNodes), iframe.contentDocument.body);

  return iframe.contentDocument;
};

Cypress.Commands.add("visitSSR", (url) => {
  return cy.request(url).then((response) => parseHTML(response.body));
});
