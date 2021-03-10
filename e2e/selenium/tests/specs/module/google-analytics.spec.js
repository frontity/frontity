const { By } = require("selenium-webdriver");
const assert = require("assert");

describe("google-analytics", function () {
  this.timeout(600000);
  beforeEach(async function () {
    await driver.get(baseUrl + "/?frontity_name=google-analytics");
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
        "return document.querySelector('script[src=\"https://www.googletagmanager.com/gtag/js?id=UA-XXXXXX-X\"][async]')"
      )
    );
    // Make sure the Google Analytics library has loaded.
    assert(await driver.executeScript("return window.gtag"));
  });

  it("should have sent the first pageview", async function () {
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[0][2]"),
      {
        page_location: pageviewHome.link,
        page_title: pageviewHome.title,
        send_to: "UA-XXXXXX-X",
      }
    );
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[1][2]"),
      {
        page_location: pageviewHome.link,
        page_title: pageviewHome.title,
        send_to: "UA-YYYYYY-Y",
      }
    );
  });

  it("should send a pageview if the page changes", async function () {
    await driver.findElement(By.id("change-link")).click();
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[2][2]"),
      {
        page_location: pageviewSomePost.link,
        page_title: pageviewSomePost.title,
        send_to: "UA-XXXXXX-X",
      }
    );
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[3][2]"),
      {
        page_location: pageviewSomePost.link,
        page_title: pageviewSomePost.title,
        send_to: "UA-YYYYYY-Y",
      }
    );
  });

  it("should send pageviews when going back or forward", async function () {
    await driver.findElement(By.id("change-link")).click();
    await driver.executeScript("return window.history.back()");
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[4][2]"),
      {
        page_location: pageviewHome.link,
        page_title: pageviewHome.title,
        send_to: "UA-XXXXXX-X",
      }
    );
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[5][2]"),
      {
        page_location: pageviewHome.link,
        page_title: pageviewHome.title,
        send_to: "UA-YYYYYY-Y",
      }
    );
    await driver.executeScript("return window.history.forward()");
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[6][2]"),
      {
        page_location: pageviewSomePost.link,
        page_title: pageviewSomePost.title,
        send_to: "UA-XXXXXX-X",
      }
    );
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[7][2]"),
      {
        page_location: pageviewSomePost.link,
        page_title: pageviewSomePost.title,
        send_to: "UA-YYYYYY-Y",
      }
    );
  });

  it("should send events", async function () {
    await driver.findElement(By.id("send-event")).click();
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[2][2]"),
      {
        content: "some content",
        event_category: undefined,
        event_label: undefined,
        send_to: "UA-XXXXXX-X",
        value: undefined,
      }
    );
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[3][2]"),
      {
        content: "some content",
        event_category: undefined,
        event_label: undefined,
        send_to: "UA-YYYYYY-Y",
        value: undefined,
      }
    );
  });
});
