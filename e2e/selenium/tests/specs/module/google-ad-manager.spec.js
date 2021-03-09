const { By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("google-ad-manager", function () {
  this.timeout(600000);
  beforeEach(async function () {
    await driver.get(baseUrl + "/?frontity_name=google-ad-manager");
    await driver.wait(
      until.elementLocated(By.css("#header-ad>div>iframe")),
      30000
    );
  });

  it("should load the GPT library", async function () {
    assert(
      await driver.executeScript(
        "return document.querySelector('script[src=\"https://securepubads.g.doubleclick.net/tag/js/gpt.js\"]')"
      )
    );
  });

  it("should render GPT ad units from fills", async function () {
    assert((await driver.findElements(By.css("#header-ad>div>iframe"))).length);
    assert((await driver.findElements(By.css("#footer-ad>div>iframe"))).length);
    await driver.findElement(By.css("button#change-link")).click();
    assert(
      (await driver.findElements(By.css("#header-ad_post>div>iframe"))).length
    );
    assert(
      (await driver.findElements(By.css("#footer-ad_post>div>iframe"))).length
    );
    assert(
      (await driver.findElements(By.css("#content-ad_post>div>iframe"))).length
    );
  });

  it("should work using GPT component directly from libraries", async function () {
    await driver.findElement(By.css("button#change-link-gpt")).click();
    assert(
      (await driver.findElements(By.css("#post-with-gpt-ad>div>iframe"))).length
    );
  });

  it("should ad the link to the container ID if data is passed", async function () {
    await driver.findElement(By.css("button#change-link")).click();
    assert(
      (await driver.findElements(By.css("#content-ad_post>div>iframe"))).length
    );
    assert(
      (await driver.findElements(By.css("#content-ad_next-post>div>iframe")))
        .length
    );
  });
});
