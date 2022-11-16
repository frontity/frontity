/* eslint-disable jest/valid-expect,jest/no-standalone-expect */
import amphtmlValidator, { Validator } from "amphtml-validator";
require("cypress-plugin-snapshots/commands");

/**
 * Throw if an element is not in the viewport.
 *
 * @param subject - The element.
 *
 * @returns The element again.
 */
Cypress.Commands.add(
  "isInViewport",
  { prevSubject: true },
  (subject: Cypress.Chainable<Element>): Cypress.Chainable<Element> => {
    const bottom = Cypress.$(cy.state("window")).height();
    const rect = subject[0].getBoundingClientRect();

    expect(rect.top).not.to.be.greaterThan(bottom);
    expect(rect.bottom).not.to.be.greaterThan(bottom);

    return subject;
  }
);

/**
 * Throw if an element is in the viewport.
 *
 * @param subject - The element.
 *
 * @returns The element again.
 */
Cypress.Commands.add(
  "isNotInViewport",
  { prevSubject: true },
  (subject: Cypress.Chainable<Element>): Cypress.Chainable<Element> => {
    const bottom = Cypress.$(cy.state("window")).height();
    const rect = subject[0].getBoundingClientRect();

    expect(rect.top).to.be.greaterThan(bottom);
    expect(rect.bottom).to.be.greaterThan(bottom);

    return subject;
  }
);

/**
 * Append children nodes to the target.
 *
 * @param children - A list of DOM nodes.
 * @param target - The target to append the children to.
 */
const apendChildrenTo = (children: ChildNode[], target: Element) => {
  // Clear out the previous content
  target.innerHTML = "";

  // Append each elment
  children.forEach((element: Element) => {
    // Do not append `<script>` tags with `src` defined
    if (element.tagName !== "script" || element.hasAttribute("src")) {
      target.appendChild(element);
    }
  });
};

/**
 * Parse the given text as html and returns an attached to the DOM, node
 * reference.
 *
 * @param body - The text value to pe parsed into html.
 * @returns The document element resulted.
 */
const parseHTML = (body: Cypress.Response["body"]): Document => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(body, "text/html");
  const parentDocument = cy.state("window").parent.document;
  const iframe: HTMLIFrameElement = parentDocument.querySelector(
    ".iframes-container iframe"
  );

  // Apply the root(html) attributes as well
  const iframeRoot = iframe.contentDocument.querySelector("html");
  const iframeRootAttributes = iframeRoot.getAttributeNames();
  const docRoot = doc.querySelector("html");
  const docRootAttributes = docRoot.getAttributeNames();

  // Remove old attributes first.
  if (iframeRootAttributes.length) {
    iframeRootAttributes.forEach((name) => {
      iframeRoot.removeAttribute(name);
    });
  }

  // Apply the new incoming attributes.
  if (docRootAttributes.length) {
    docRootAttributes.forEach((name) => {
      iframeRoot.setAttribute(name, docRoot.getAttribute(name));
    });
  }

  apendChildrenTo(Array.from(doc.head.childNodes), iframe.contentDocument.head);
  apendChildrenTo(Array.from(doc.body.childNodes), iframe.contentDocument.body);

  return iframe.contentDocument;
};

/**
 * Visit a URL without loading the scripts, to make sure that it works in SSR.
 */
Cypress.Commands.add(
  "visitSSR",
  (url: string): Cypress.Chainable<Document> => {
    return cy.request(url).then((response) => parseHTML(response.body));
  }
);

/**
 *  Get the HTML from a link with cy.request() and validate it using amphtml-validator.
 *
 * @param validator - Instance of amphtmlValidator.getInstance().
 * @param response - Instance of Cypress.Response as returned by cy.request().
 *
 * @returns A Result object containing validation result and the errors.
 */
const validateAMP = (validator: Validator, response: Cypress.Response) => {
  const result = { ...validator.validateString(response.body), msg: "" };

  result.errors.forEach((error) => {
    const msg = `line ${error.line}, col ${error.col}: ${error.message}`;
    if (error.specUrl !== null) {
      result.msg += `${msg} (see ${error.specUrl})`;
    }
    result.msg += "\n\n";
  });

  if (result.msg !== "") throw new Error(result.msg);

  return result;
};

Cypress.Commands.add(
  "validateAMP",
  (url: string): Cypress.Chainable => {
    return cy.request("GET", url).then((response) => {
      return cy
        .wrap(
          amphtmlValidator.getInstance(
            "https://cdn.ampproject.org/v0/validator.20211101.deprecated.js"
          )
        )
        .then((validator: Validator) => {
          const result = validateAMP(validator, response);

          cy.wrap(result.status).should("equal", "PASS");
        });
    });
  }
);
