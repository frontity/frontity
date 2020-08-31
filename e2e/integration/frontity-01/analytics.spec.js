describe("Analytics package", () => {
  const pageviewHome = {
    link: "/?name=analytics",
    title: "Homepage Title",
  };

  const pageviewSomePost = {
    link: "/some-post/",
    title: "Some Post Title",
  };

  const pageviewSomeOtherPost = {
    link: "/some-other-post/",
    title: "Some Post Title",
  };

  const someEvent = {
    name: "some event",
    payload: { content: "some content" },
  };

  const getAnalytics = (data) =>
    cy.window().its("frontity").its("state").its("testAnalytics").its(data);

  beforeEach(() => {
    cy.visit("http://localhost:3001?name=analytics");
  });

  it("should have sent the first pageview", () => {
    getAnalytics("pageviews").its(0).should("deep.equal", pageviewHome);
  });

  it("should sent a pageview if the page changes", () => {
    cy.get("button#change-link").click();
    getAnalytics("pageviews").its(1).should("deep.equal", pageviewSomePost);
  });

  it("should sent a pageview if the page changes and title is the same", () => {
    cy.get("button#change-link").click();
    cy.get("button#change-link-post-2").click();
    cy.go("back");
    getAnalytics("pageviews").its(1).should("deep.equal", pageviewSomePost);
    getAnalytics("pageviews")
      .its(2)
      .should("deep.equal", pageviewSomeOtherPost);
    getAnalytics("pageviews").its(3).should("deep.equal", pageviewSomePost);
  });

  it("should sent pageviews when going back or forward", () => {
    cy.get("button#change-link").click();
    cy.go("back");
    getAnalytics("pageviews").its(2).should("deep.equal", pageviewHome);

    cy.go("forward");
    getAnalytics("pageviews").its(3).should("deep.equal", pageviewSomePost);
  });

  it("should send events", () => {
    cy.get("button#send-event").click();
    cy.get("button#send-event").click();
    cy.get("button#send-event").click();
    getAnalytics("events").its(0).should("deep.equal", someEvent);
    getAnalytics("events").its(1).should("deep.equal", someEvent);
    getAnalytics("events").its(2).should("deep.equal", someEvent);
  });
});
