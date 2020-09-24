import expect from "expect";

// Function to manually check that the spy created with `cy.spy` has been called
// with an argument. I am not checking the order because sometimes pageviews
// take a bit longer to be sent and that cause race conditions.
const expectGaToHaveBeenCalledWith = (win, data) => {
  expect(win.ga.args).toEqual(
    expect.arrayContaining([expect.arrayContaining(data)])
  );
};

const pageviewHome = {
  title: "Homepage Title",
  link: "/?frontity_name=google-analytics",
};

const pageviewSomePost = {
  title: "Some Post Title",
  link: "/some-post/",
};

describe("Google Analytics", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001?frontity_name=google-analytics");

    // Wait for Google Analytics to load its <script> and create `window.ga`.
    cy.window().should("have.property", "ga");

    // Add a spy on `window.ga`.
    cy.window().then((win) => {
      cy.spy(win, "ga");
    });
  });

  it("should load the Google Analytics library", () => {
    // Make sure the <script> was created.
    cy.get(
      `script[src="https://www.google-analytics.com/analytics.js"][async]`
    );

    // Make sure the Google Analytics library has loaded.
    cy.window().should("have.property", "ga");
  });

  // I was not able to find a way to stub/spy `window.ga` between the moment
  // that it is created by the Google Analytics <script> and the moment it sends
  // the first pageviews so I'm just checking that it has a `hitcount` of 1 in
  // its internal count.
  it("should have sent the first pageview", () => {
    cy.window()
      .its("gaData")
      .its("UA-XXXXXX-X")
      .its("hitcount")
      .should("equal", 1);

    cy.window()
      .its("gaData")
      .its("UA-YYYYYY-Y")
      .its("hitcount")
      .should("equal", 1);
  });

  it("should sent a pageview if the page changes", () => {
    cy.get("button#change-link").click();

    cy.window().then((win) => {
      expectGaToHaveBeenCalledWith(win, [
        "tracker_UA_XXXXXX_X.send",
        {
          hitType: "pageview",
          page: pageviewSomePost.link,
          title: pageviewSomePost.title,
        },
      ]);
      expectGaToHaveBeenCalledWith(win, [
        "tracker_UA_YYYYYY_Y.send",
        {
          hitType: "pageview",
          page: pageviewSomePost.link,
          title: pageviewSomePost.title,
        },
      ]);
    });

    // Make sure the real library sent two pageviews for each tracker.
    cy.window()
      .its("gaData")
      .its("UA-XXXXXX-X")
      .its("hitcount")
      .should("equal", 2);

    cy.window()
      .its("gaData")
      .its("UA-YYYYYY-Y")
      .its("hitcount")
      .should("equal", 2);
  });

  it("should sent pageviews when going back or forward", () => {
    cy.get("button#change-link").click();
    cy.go("back");

    cy.window().then((win) => {
      expectGaToHaveBeenCalledWith(win, [
        "tracker_UA_XXXXXX_X.send",
        {
          hitType: "pageview",
          page: pageviewHome.link,
          title: pageviewHome.title,
        },
      ]);
      expectGaToHaveBeenCalledWith(win, [
        "tracker_UA_YYYYYY_Y.send",
        {
          hitType: "pageview",
          page: pageviewHome.link,
          title: pageviewHome.title,
        },
      ]);
    });

    cy.go("forward");

    cy.window().then((win) => {
      expectGaToHaveBeenCalledWith(win, [
        "tracker_UA_XXXXXX_X.send",
        {
          hitType: "pageview",
          page: pageviewSomePost.link,
          title: pageviewSomePost.title,
        },
      ]);
      expectGaToHaveBeenCalledWith(win, [
        "tracker_UA_YYYYYY_Y.send",
        {
          hitType: "pageview",
          page: pageviewSomePost.link,
          title: pageviewSomePost.title,
        },
      ]);
    });

    // Make sure the real library sent four pageviews for each tracker.
    cy.window()
      .its("gaData")
      .its("UA-XXXXXX-X")
      .its("hitcount")
      .should("equal", 4);

    cy.window()
      .its("gaData")
      .its("UA-YYYYYY-Y")
      .its("hitcount")
      .should("equal", 4);
  });

  it("should send events", () => {
    cy.get("button#send-event").click();

    cy.window().then((win) => {
      expectGaToHaveBeenCalledWith(win, [
        "tracker_UA_XXXXXX_X.send",
        {
          hitType: "event",
          eventAction: "some event",
          content: "some content",
          eventCategory: undefined,
          eventLabel: undefined,
          eventValue: undefined,
        },
      ]);
      expectGaToHaveBeenCalledWith(win, [
        "tracker_UA_YYYYYY_Y.send",
        {
          hitType: "event",
          eventAction: "some event",
          content: "some content",
          eventCategory: undefined,
          eventLabel: undefined,
          eventValue: undefined,
        },
      ]);
    });

    cy.window()
      .its("gaData")
      .its("UA-XXXXXX-X")
      .its("hitcount")
      .should("equal", 2);

    cy.window()
      .its("gaData")
      .its("UA-YYYYYY-Y")
      .its("hitcount")
      .should("equal", 2);

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

    cy.window().then((win) => {
      expectGaToHaveBeenCalledWith(win, [
        "tracker_UA_XXXXXX_X.send",
        {
          hitType: "event",
          eventAction: someEvent.name,
          eventCategory: someEvent.payload.category,
          eventLabel: someEvent.payload.label,
          eventValue: someEvent.payload.value,
        },
      ]);
      expectGaToHaveBeenCalledWith(win, [
        "tracker_UA_YYYYYY_Y.send",
        {
          hitType: "event",
          eventAction: someEvent.name,
          eventCategory: someEvent.payload.category,
          eventLabel: someEvent.payload.label,
          eventValue: someEvent.payload.value,
        },
      ]);
    });

    cy.window()
      .its("gaData")
      .its("UA-XXXXXX-X")
      .its("hitcount")
      .should("equal", 3);

    cy.window()
      .its("gaData")
      .its("UA-YYYYYY-Y")
      .its("hitcount")
      .should("equal", 3);
  });
});
