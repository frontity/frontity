const pageviewHome = {
  title: "Homepage Title",
  link: "/",
};

const pageviewSomePost = {
  title: "Some Post Title",
  link: "/some-post/",
};

describe("Google Analytics", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?frontity_name=google-analytics");

    // Wait for Google Analytics to load its <script> and create `window.ga`.
    cy.window().should("have.property", "gtag");
  });

  it("should load the Google Analytics library", () => {
    // Make sure the <script> was created.
    cy.get(`script[src^="https://www.googletagmanager.com/gtag/js"][async]`);

    // Make sure the Google Analytics library has loaded.
    cy.window().should("have.property", "gtag");
  });

  it("should have sent the first pageview", () => {
    cy.window().its("gaCalls").its(0).its(2).should("deep.equal", {
      send_to: "UA-XXXXXX-X",
      page_title: pageviewHome.title,
      page_location: pageviewHome.link,
    });
    cy.window().its("gaCalls").its(1).its(2).should("deep.equal", {
      send_to: "UA-YYYYYY-Y",
      page_title: pageviewHome.title,
      page_location: pageviewHome.link,
    });
  });

  it("should sent a pageview if the page changes", () => {
    cy.get("button#change-link").click();

    cy.window().its("gaCalls").its(2).its(2).should("deep.equal", {
      send_to: "UA-XXXXXX-X",
      page_title: pageviewSomePost.title,
      page_location: pageviewSomePost.link,
    });
    cy.window().its("gaCalls").its(3).its(2).should("deep.equal", {
      send_to: "UA-YYYYYY-Y",
      page_title: pageviewSomePost.title,
      page_location: pageviewSomePost.link,
    });
  });

  it("should sent pageviews when going back or forward", () => {
    cy.get("button#change-link").click();
    cy.go("back");

    cy.window().its("gaCalls").its(4).its(2).should("deep.equal", {
      send_to: "UA-XXXXXX-X",
      page_title: pageviewHome.title,
      page_location: pageviewHome.link,
    });
    cy.window().its("gaCalls").its(5).its(2).should("deep.equal", {
      send_to: "UA-YYYYYY-Y",
      page_title: pageviewHome.title,
      page_location: pageviewHome.link,
    });

    cy.go("forward");

    cy.window().its("gaCalls").its(6).its(2).should("deep.equal", {
      send_to: "UA-XXXXXX-X",
      page_title: pageviewSomePost.title,
      page_location: pageviewSomePost.link,
    });
    cy.window().its("gaCalls").its(7).its(2).should("deep.equal", {
      send_to: "UA-YYYYYY-Y",
      page_title: pageviewSomePost.title,
      page_location: pageviewSomePost.link,
    });
  });

  it("should send events", () => {
    cy.get("button#send-event").click();

    cy.window().its("gaCalls").its(2).its(2).should("include", {
      content: "some content",
      send_to: "UA-XXXXXX-X",
      value: undefined,
      event_category: undefined,
      event_label: undefined,
    });
    cy.window().its("gaCalls").its(3).its(2).should("include", {
      content: "some content",
      send_to: "UA-YYYYYY-Y",
      value: undefined,
      event_category: undefined,
      event_label: undefined,
    });

    // Change testEvent to send Google Analytics specific data.
    const someEvent = {
      name: "some-action",
      payload: {
        category: "some-category",
        label: "some-label",
        value: "some-value",
      },
    };
    cy.window().then((win) => {
      win.frontity.state.testAnalytics.testEvent = someEvent;
    });

    // Send event again.
    cy.get("button#send-event").click();

    cy.window().its("gaCalls").its(4).its(2).should("include", {
      send_to: "UA-XXXXXX-X",
      value: someEvent.payload.value,
      event_category: someEvent.payload.category,
      event_label: someEvent.payload.label,
    });
    cy.window().its("gaCalls").its(5).its(2).should("include", {
      send_to: "UA-YYYYYY-Y",
      value: someEvent.payload.value,
      event_category: someEvent.payload.category,
      event_label: someEvent.payload.label,
    });
  });
});
