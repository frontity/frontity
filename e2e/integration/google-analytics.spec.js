describe("Google Analytics", () => {
  const pageviewHome = {
    title: "Homepage Title",
    link: "/?name=google-analytics",
  };

  const pageviewSomePost = {
    title: "Some Post Title",
    link: "/some-post/",
  };

  const someEvent = {
    action: "play",
    category: "video",
    label: "featured",
    value: "100",
  };

  let createElementBackup;

  beforeEach(() => {
    cy.visit("http://localhost:3001?name=google-analytics", {
      onBeforeLoad(win) {
        // Google Analytics requests are images created using `createElement`
        // so that function is modified to return a mock image when is called
        // with `img`.

        // Backup `createElement` function.
        createElementBackup = win.document.createElement;

        // Image mock.
        const getImageMock = () => ({
          set src(source) {
            const url = new URL(source);
            if (url.host === "www.google-analytics.com") {
              win.gaRequests = win.gaRequests || [];
              // Get request type.
              const type = url.searchParams.get("t");
              if (type === "pageview")
                // Save pageview properties.
                win.gaRequests.push({
                  id: url.searchParams.get("tid"),
                  title: url.searchParams.get("dt"),
                  link: url.searchParams.get("dp"),
                });
              if (type === "event")
                // Save event properties.
                win.gaRequests.push({
                  id: url.searchParams.get("tid"),
                  action: url.searchParams.get("ea"),
                  category: url.searchParams.get("ec"),
                  label: url.searchParams.get("el"),
                  value: url.searchParams.get("ev"),
                });
            }
          },
        });

        // Define `createElement` mock.
        const createElementMock = (element) => {
          if (element === "img") return getImageMock();
          else return createElementBackup.bind(win.document)(element);
        };

        // Overwrite `createElement` function.
        Object.defineProperty(win.document, "createElement", {
          value: createElementMock,
          writable: true,
        });
      },
    });
  });

  afterEach(() => {
    cy.window().then((win) => {
      // Restore Image class.
      Object.defineProperty(win.document, "createElement", {
        value: createElementBackup,
      });
    });
  });

  it("should load the Google Analytics library", () => {
    cy.get(
      `script[src="https://www.google-analytics.com/analytics.js"][async]`
    );
  });

  it("should have sent the first pageview", () => {
    // Ensures Google Analytics library has loaded.
    cy.window().its("ga").its("ready").should("be", true);

    // Check that Google Analytics has sent the pageview with the correct title.
    cy.window()
      .its("gaRequests")
      .should("deep.equal", [
        { id: "UA-XXXXXX-X", ...pageviewHome },
        { id: "UA-YYYYYY-Y", ...pageviewHome },
      ]);
  });

  it("should sent a pageview if the page changes", () => {
    // Ensures Google Analytics library has loaded.
    cy.window().its("ga").its("ready").should("be", true);

    // Check first pageviews.
    cy.window()
      .its("gaRequests")
      .should("deep.equal", [
        { id: "UA-XXXXXX-X", ...pageviewHome },
        { id: "UA-YYYYYY-Y", ...pageviewHome },
      ]);

    // Go to "/some-post/"
    cy.get("button#change-link").click();

    // Check pageviews after going to the new link.
    cy.window()
      .its("gaRequests")
      .should("deep.equal", [
        { id: "UA-XXXXXX-X", ...pageviewHome },
        { id: "UA-YYYYYY-Y", ...pageviewHome },
        { id: "UA-XXXXXX-X", ...pageviewSomePost },
        { id: "UA-YYYYYY-Y", ...pageviewSomePost },
      ]);
  });

  it("should sent pageviews when going back or forward", () => {
    // Ensures Google Analytics library has loaded.
    cy.window().its("ga").its("ready").should("be", true);

    // Check first pageviews.
    cy.window()
      .its("gaRequests")
      .should("deep.equal", [
        { id: "UA-XXXXXX-X", ...pageviewHome },
        { id: "UA-YYYYYY-Y", ...pageviewHome },
      ]);

    // Go to "/some-post/".
    cy.get("button#change-link").click();

    // Check pageviews after going to the new link.
    cy.window()
      .its("gaRequests")
      .should("deep.equal", [
        { id: "UA-XXXXXX-X", ...pageviewHome },
        { id: "UA-YYYYYY-Y", ...pageviewHome },
        { id: "UA-XXXXXX-X", ...pageviewSomePost },
        { id: "UA-YYYYYY-Y", ...pageviewSomePost },
      ]);

    // Go to the previous link ("/").
    cy.go("back");

    // Check pageviews after going to the previous link.
    cy.window()
      .its("gaRequests")
      .should("deep.equal", [
        { id: "UA-XXXXXX-X", ...pageviewHome },
        { id: "UA-YYYYYY-Y", ...pageviewHome },
        { id: "UA-XXXXXX-X", ...pageviewSomePost },
        { id: "UA-YYYYYY-Y", ...pageviewSomePost },
        { id: "UA-XXXXXX-X", ...pageviewHome },
        { id: "UA-YYYYYY-Y", ...pageviewHome },
      ]);

    // Go forward to "/some-post/".
    cy.go("forward");

    // Check pageviews after going forward.
    cy.window()
      .its("gaRequests")
      .should("deep.equal", [
        { id: "UA-XXXXXX-X", ...pageviewHome },
        { id: "UA-YYYYYY-Y", ...pageviewHome },
        { id: "UA-XXXXXX-X", ...pageviewSomePost },
        { id: "UA-YYYYYY-Y", ...pageviewSomePost },
        { id: "UA-XXXXXX-X", ...pageviewHome },
        { id: "UA-YYYYYY-Y", ...pageviewHome },
        { id: "UA-XXXXXX-X", ...pageviewSomePost },
        { id: "UA-YYYYYY-Y", ...pageviewSomePost },
      ]);
  });

  it("should send events", () => {
    // Ensures Google Analytics library has loaded.
    cy.window().its("ga").its("ready").should("be", true);

    // Check first pageviews.
    cy.window()
      .its("gaRequests")
      .should("deep.equal", [
        { id: "UA-XXXXXX-X", ...pageviewHome },
        { id: "UA-YYYYYY-Y", ...pageviewHome },
      ]);

    // Change testEvent to send Google Analytics specific data.
    cy.window().then((win) => {
      win.frontity.state.testAnalytics.testEvent = {
        name: "play",
        payload: {
          category: "video",
          label: "featured",
          value: 100,
        },
      };
    });

    // Send event.
    cy.get("button#send-event").click();

    // Check events have been sent.
    cy.window()
      .its("gaRequests")
      .should("deep.equal", [
        { id: "UA-XXXXXX-X", ...pageviewHome },
        { id: "UA-YYYYYY-Y", ...pageviewHome },
        { id: "UA-XXXXXX-X", ...someEvent },
        { id: "UA-YYYYYY-Y", ...someEvent },
      ]);
  });
});
