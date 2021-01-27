/* eslint-disable jest/valid-expect,jest/no-standalone-expect */
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
