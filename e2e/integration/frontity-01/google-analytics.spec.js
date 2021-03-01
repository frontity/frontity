import expect from "expect";

/**
 * Transforms an array into an object.
 *
 * @param data - The array that needs to be transformed.
 * @returns The object.
 */
const arrayToArguments = (data) =>
  data.reduce((out, item, i) => {
    out[i] = item;
    return out;
  }, {});

// Function to manually check that the spy created with `cy.spy` has been called
// with an argument. I am not checking the order because sometimes pageviews
// take a bit longer to be sent and that cause race conditions.
const expectGtagToHaveBeenCalledWith = (win, data) => {
  expect(win.gtag.args).toEqual(
    expect.arrayContaining([
      expect.objectContaining(
        // If this is an array, transform it to a arguments object.
        Array.isArray(data) ? arrayToArguments(data) : data
      ),
    ])
  );
};

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

    // Add a spy on `window.ga`.
    cy.window().then((win) => {
      cy.spy(win, "gtag");
    });
  });

  it("should load the Google Analytics library", () => {
    // Make sure the <script> was created.
    cy.get(`script[src^="https://www.googletagmanager.com/gtag/js"][async]`);

    // Make sure the Google Analytics library has loaded.
    cy.window().should("have.property", "gtag");
  });

  // I was not able to find a way to stub/spy `window.ga` between the moment
  // that it is created by the Google Analytics <script> and the moment it sends
  // the first pageviews so I'm just checking that it has a `hitcount` of 1 in
  // its internal count.
  it("should have sent the first pageview", () => {
    cy.window().then((win) => {
      const dataLayer = win.dataLayer;

      expect(dataLayer).toEqual(
        expect.arrayContaining([
          // This is due the fact the dataLayer holds the data as arguments
          // which is not an array, but rather an object.
          expect.objectContaining(arrayToArguments(["config", "UA-XXXXXX-X"])),
          expect.objectContaining(arrayToArguments(["config", "UA-YYYYYY-Y"])),
        ])
      );
    });
  });

  it("should sent a pageview if the page changes", () => {
    cy.get("button#change-link").click();

    cy.window().then((win) => {
      expectGtagToHaveBeenCalledWith(win, [
        "event",
        "page_view",
        expect.objectContaining({
          send_to: "UA-XXXXXX-X",
          page_title: pageviewSomePost.title,
          page_location: pageviewSomePost.link,
        }),
      ]);

      expectGtagToHaveBeenCalledWith(win, [
        "event",
        "page_view",
        expect.objectContaining({
          send_to: "UA-YYYYYY-Y",
          page_title: pageviewSomePost.title,
          page_location: pageviewSomePost.link,
        }),
      ]);
    });

    // Make sure the real library sent two pageviews for each tracker + a config call.
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

  it("should sent pageviews when going back or forward", () => {
    cy.get("button#change-link").click();
    cy.go("back");

    cy.window().then((win) => {
      expectGtagToHaveBeenCalledWith(win, [
        "event",
        "page_view",
        expect.objectContaining({
          send_to: "UA-XXXXXX-X",
          page_title: pageviewHome.title,
          page_location: pageviewHome.link,
        }),
      ]);
      expectGtagToHaveBeenCalledWith(win, [
        "event",
        "page_view",
        expect.objectContaining({
          send_to: "UA-YYYYYY-Y",
          page_title: pageviewHome.title,
          page_location: pageviewHome.link,
        }),
      ]);
    });

    cy.go("forward");

    cy.window().then((win) => {
      expectGtagToHaveBeenCalledWith(win, [
        "event",
        "page_view",
        expect.objectContaining({
          send_to: "UA-XXXXXX-X",
          page_title: pageviewSomePost.title,
          page_location: pageviewSomePost.link,
        }),
      ]);

      expectGtagToHaveBeenCalledWith(win, [
        "event",
        "page_view",
        expect.objectContaining({
          send_to: "UA-YYYYYY-Y",
          page_title: pageviewSomePost.title,
          page_location: pageviewSomePost.link,
        }),
      ]);
    });

    // Make sure the real library sent five pageviews for each tracker.
    cy.window()
      .its("gaData")
      .its("UA-XXXXXX-X")
      .its("hitcount")
      .should("equal", 5);

    cy.window()
      .its("gaData")
      .its("UA-YYYYYY-Y")
      .its("hitcount")
      .should("equal", 5);
  });

  it("should send events", () => {
    cy.get("button#send-event").click();

    cy.window().then((win) => {
      expectGtagToHaveBeenCalledWith(win, [
        "event",
        "some event",
        expect.objectContaining({
          send_to: "UA-XXXXXX-X",
          content: "some content",
          value: undefined,
          event_category: undefined,
          event_label: undefined,
        }),
      ]);

      expectGtagToHaveBeenCalledWith(win, [
        "event",
        "some event",
        expect.objectContaining({
          send_to: "UA-YYYYYY-Y",
          content: "some content",
          value: undefined,
          event_category: undefined,
          event_label: undefined,
        }),
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
      expectGtagToHaveBeenCalledWith(win, [
        "event",
        someEvent.name,
        expect.objectContaining({
          send_to: "UA-XXXXXX-X",
          value: someEvent.payload.value,
          event_category: someEvent.payload.category,
          event_label: someEvent.payload.label,
        }),
      ]);

      expectGtagToHaveBeenCalledWith(win, [
        "event",
        someEvent.name,
        expect.objectContaining({
          send_to: "UA-YYYYYY-Y",
          value: someEvent.payload.value,
          event_category: someEvent.payload.category,
          event_label: someEvent.payload.label,
        }),
      ]);
    });

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
});
