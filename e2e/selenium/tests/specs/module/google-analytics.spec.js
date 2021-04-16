const { By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("google-analytics", function () {
  beforeEach(async function () {
    await driver.get(baseUrl + "/?frontity_name=google-analytics");
    await driver.wait(until.titleIs("Homepage Title"), 5000);
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
    await driver.wait(until.titleIs("Some Post Title"), 5000);
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
    await driver.wait(until.titleIs("Some Post Title"), 5000);
    await driver.executeScript("return window.history.back()");
    await driver.wait(until.titleIs("Homepage Title"), 5000);
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
    await driver.wait(until.titleIs("Some Post Title"), 5000);
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
    await driver.manage().setTimeouts({ implicit: 2000 });
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[2][2]['content']"),
      "some content"
    );
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[2][2]['send_to']"),
      "UA-XXXXXX-X"
    );
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[3][2]['content']"),
      "some content"
    );
    assert.deepEqual(
      await driver.executeScript("return window.gaCalls[3][2]['send_to']"),
      "UA-YYYYYY-Y"
    );
  });
});
