describe("Comscore", () => {
  const pageviewHome = {
    title: "Homepage Title",
    location: "http://localhost:3001/?name=comscore-analytics",
  };

  const pageviewSomePost = {
    title: "Some Post Title",
    location: "http://localhost:3001/some-post/",
  };

  let ImageBackup;

  beforeEach(() => {
    cy.visit("http://localhost:3001?name=comscore-analytics", {
      onBeforeLoad(win) {
        // Comscore requests are images so here
        // we overwrite the `Image` class, just during this tests.

        // Backup Image class.
        ImageBackup = win.Image;

        // Overwrite Image class.
        Object.defineProperty(win, "Image", {
          value: class ImageMock {
            set src(source) {
              const url = new URL(source);
              if (url.host === "sb.scorecardresearch.com") {
                win.comscoreRequests = win.comscoreRequests || [];
                win.comscoreRequests.push({
                  id: url.searchParams.get("c2"),
                  title: url.searchParams.get("c8"),
                  location: url.searchParams.get("c7"),
                });
              }
            }
          },
        });
      },
    });
  });

  afterEach(() => {
    cy.window().then((win) => {
      // Restore Image class.
      Object.defineProperty(win, "Image", {
        value: ImageBackup,
      });
    });
  });

  it("should load the Comscore library", () => {
    cy.get(`script[src="https://sb.scorecardresearch.com/beacon.js"][async]`);
  });

  it("should have sent the first pageview", () => {
    // Check that Comscore has sent the pageview with the correct title.
    cy.window()
      .its("comscoreRequests")
      .its(0)
      .should("deep.equal", { id: "111111", ...pageviewHome });

    cy.window()
      .its("comscoreRequests")
      .its(1)
      .should("deep.equal", { id: "222222", ...pageviewHome });
  });

  it("should sent a pageview if the page changes", () => {
    cy.get("button#change-link").click();
    cy.window()
      .its("comscoreRequests")
      .its(2)
      .should("deep.equal", { id: "111111", ...pageviewSomePost });

    cy.window()
      .its("comscoreRequests")
      .its(3)
      .should("deep.equal", { id: "222222", ...pageviewSomePost });
  });

  it("should sent pageviews when going back or forward", () => {
    cy.get("button#change-link").click();
    cy.go("back");

    cy.window()
      .its("comscoreRequests")
      .its(4)
      .should("deep.equal", { id: "111111", ...pageviewHome });

    cy.window()
      .its("comscoreRequests")
      .its(5)
      .should("deep.equal", { id: "222222", ...pageviewHome });

    cy.go("forward");

    cy.window()
      .its("comscoreRequests")
      .its(6)
      .should("deep.equal", { id: "111111", ...pageviewSomePost });

    cy.window()
      .its("comscoreRequests")
      .its(7)
      .should("deep.equal", { id: "222222", ...pageviewSomePost });
  });
});
