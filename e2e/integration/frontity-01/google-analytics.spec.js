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
    // Check that Google Analytics has sent the pageview with the correct title.
    cy.window()
      .its("gaRequests")
      .its(0)
      .should("deep.equal", { id: "UA-XXXXXX-X", ...pageviewHome });

    cy.window()
      .its("gaRequests")
      .its(1)
      .should("deep.equal", { id: "UA-YYYYYY-Y", ...pageviewHome });
  });

  it("should sent a pageview if the page changes", () => {
    cy.get("button#change-link").click();
    cy.window()
      .its("gaRequests")
      .its(2)
      .should("deep.equal", { id: "UA-XXXXXX-X", ...pageviewSomePost });

    cy.window()
      .its("gaRequests")
      .its(3)
      .should("deep.equal", { id: "UA-YYYYYY-Y", ...pageviewSomePost });
  });

  it("should sent pageviews when going back or forward", () => {
    cy.get("button#change-link").click();
    cy.go("back");

    cy.window()
      .its("gaRequests")
      .its(4)
      .should("deep.equal", { id: "UA-XXXXXX-X", ...pageviewHome });

    cy.window()
      .its("gaRequests")
      .its(5)
      .should("deep.equal", { id: "UA-YYYYYY-Y", ...pageviewHome });

    cy.go("forward");

    cy.window()
      .its("gaRequests")
      .its(6)
      .should("deep.equal", { id: "UA-XXXXXX-X", ...pageviewSomePost });

    cy.window()
      .its("gaRequests")
      .its(7)
      .should("deep.equal", { id: "UA-YYYYYY-Y", ...pageviewSomePost });
  });

  it("should send events", () => {
    // Wait for the first pageview to be sent.
    cy.window()
      .its("gaRequests")
      .its(0)
      .should("deep.equal", { id: "UA-XXXXXX-X", ...pageviewHome });
    cy.window()
      .its("gaRequests")
      .its(1)
      .should("deep.equal", { id: "UA-YYYYYY-Y", ...pageviewHome });

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
    cy.window()
      .its("gaRequests")
      .its(2)
      .should("deep.equal", { id: "UA-XXXXXX-X", ...someEvent });
    cy.window()
      .its("gaRequests")
      .its(3)
      .should("deep.equal", { id: "UA-YYYYYY-Y", ...someEvent });
  });
});
