const { By } = require("selenium-webdriver");
const assert = require("assert");

describe("google-tag-manager-analytics", function () {
  this.timeout(600000);
  beforeEach(async function () {
    await driver.get("http://localhost:3000/?frontity_name=google-tag-manager");
  });

  const pageviewHome = {
    event: "pageview",
    link: "/",
    title: "Homepage Title",
  };

  const pageviewSomePost = {
    event: "pageview",
    link: "/some-post/",
    title: "Some Post Title",
  };

  const someEvent = {
    event: "some event",
    payload: { content: "some content" },
  };

  it("should load Google Tag Manager library", async function () {
    assert(
      await driver.executeScript(
        "return document.querySelector('script[src=\"https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXX-X\"]')"
      )
    );
  });

  it("should send the first pageview", async function () {
    assert.deepEqual(
      await driver.executeScript("return window.dataLayer[1]"),
      pageviewHome
    );
  });

  it("should send a pageview if the page changes", async function () {
    await driver.findElement(By.id("change-link")).click();
    assert.deepEqual(
      await driver.executeScript("return window.dataLayer[2]"),
      pageviewSomePost
    );
  });

  it("should send pageviews when going back or forward", async function () {
    await driver.findElement(By.id("change-link")).click();
    await driver.executeScript("return window.history.back()");
    assert.deepEqual(
      await driver.executeScript("return window.dataLayer[3]"),
      pageviewHome
    );
    await driver.executeScript("return window.history.forward()");
    assert.deepEqual(
      await driver.executeScript("return window.dataLayer[4]"),
      pageviewSomePost
    );
  });

  it("should send events", async function () {
    await driver.findElement(By.id("send-event")).click();
    assert.deepEqual(
      await driver.executeScript("return window.dataLayer[2]"),
      someEvent
    );
  });
});
