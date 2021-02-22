const { By } = require("selenium-webdriver");
const assert = require("assert");

describe("google-analytics", function () {
  this.timeout(600000);
  beforeEach(async function () {
    await driver.get("http://localhost:3000/?frontity_name=google-analytics");
  });

  const pageviewHome = {
    title: "Homepage Title",
    link: "/",
  };

  const pageviewSomePost = {
    title: "Some Post Title",
    link: "/some-post/",
  };

  it("should load the Google Analytics library", async function () {
    // Make sure the <script> was created.
    assert(
      await driver.executeScript(
        "return document.querySelector('script[src=\"https://www.google-analytics.com/analytics.js\"][async]')"
      )
    );
    // Make sure the Google Analytics library has loaded.
    assert(await driver.executeScript("return window.ga"));
  });

  it("should have sent the first pageview", async function () {
    assert.deepEqual(await driver.executeScript("return window.gaCalls[0]"), [
      "tracker_UA_XXXXXX_X.send",
      {
        hitType: "pageview",
        page: pageviewHome.link,
        title: pageviewHome.title,
      },
    ]);
    assert.deepEqual(await driver.executeScript("return window.gaCalls[1]"), [
      "tracker_UA_YYYYYY_Y.send",
      {
        hitType: "pageview",
        page: pageviewHome.link,
        title: pageviewHome.title,
      },
    ]);
  });

  it("should send a pageview if the page changes", async function () {
    await driver.findElement(By.id("change-link")).click();
    assert.deepEqual(await driver.executeScript("return window.gaCalls[2]"), [
      "tracker_UA_XXXXXX_X.send",
      {
        hitType: "pageview",
        page: pageviewSomePost.link,
        title: pageviewSomePost.title,
      },
    ]);
    assert.deepEqual(await driver.executeScript("return window.gaCalls[3]"), [
      "tracker_UA_YYYYYY_Y.send",
      {
        hitType: "pageview",
        page: pageviewSomePost.link,
        title: pageviewSomePost.title,
      },
    ]);
  });

  it("should send pageviews when going back or forward", async function () {
    await driver.findElement(By.id("change-link")).click();
    await driver.executeScript("return window.history.back()");
    assert.deepEqual(await driver.executeScript("return window.gaCalls[4]"), [
      "tracker_UA_XXXXXX_X.send",
      {
        hitType: "pageview",
        page: pageviewHome.link,
        title: pageviewHome.title,
      },
    ]);
    assert.deepEqual(await driver.executeScript("return window.gaCalls[5]"), [
      "tracker_UA_YYYYYY_Y.send",
      {
        hitType: "pageview",
        page: pageviewHome.link,
        title: pageviewHome.title,
      },
    ]);
    await driver.executeScript("return window.history.forward()");
    assert.deepEqual(await driver.executeScript("return window.gaCalls[6]"), [
      "tracker_UA_XXXXXX_X.send",
      {
        hitType: "pageview",
        page: pageviewSomePost.link,
        title: pageviewSomePost.title,
      },
    ]);
    assert.deepEqual(await driver.executeScript("return window.gaCalls[7]"), [
      "tracker_UA_YYYYYY_Y.send",
      {
        hitType: "pageview",
        page: pageviewSomePost.link,
        title: pageviewSomePost.title,
      },
    ]);
  });

  it("should send events", async function () {
    await driver.findElement(By.id("send-event")).click();
    assert.deepEqual(await driver.executeScript("return window.gaCalls[2]"), [
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
    assert.deepEqual(await driver.executeScript("return window.gaCalls[3]"), [
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
});
