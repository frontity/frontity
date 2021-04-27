const { By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("google-tag-manager-analytics", function () {
  beforeEach(async function () {
    await driver.get(baseUrl + "/?frontity_name=google-tag-manager");
    await driver.wait(until.titleIs("Homepage Title"), 5000);
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
    await driver.wait(until.titleIs("Some Post Title"), 5000);
    assert.deepEqual(
      await driver.executeScript("return window.dataLayer[2]"),
      pageviewSomePost
    );
  });

  it("should send pageviews when going back or forward", async function () {
    await driver.findElement(By.id("change-link")).click();
    await driver.wait(until.titleIs("Some Post Title"), 5000);
    await driver.executeScript("return window.history.back()");
    await driver.wait(until.titleIs("Homepage Title"), 5000);
    assert.deepEqual(
      await driver.executeScript("return window.dataLayer[3]"),
      pageviewHome
    );
    await driver.executeScript("return window.history.forward()");
    await driver.wait(until.titleIs("Some Post Title"), 5000);
    assert.deepEqual(
      await driver.executeScript("return window.dataLayer[4]"),
      pageviewSomePost
    );
  });

  it("should send events", async function () {
    await driver.findElement(By.id("send-event")).click();
    await driver.manage().setTimeouts({ implicit: 2000 });
    assert.deepEqual(
      await driver.executeScript("return window.dataLayer[2]"),
      someEvent
    );
  });
});
