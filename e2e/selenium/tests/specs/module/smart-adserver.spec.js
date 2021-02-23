const { By, until } = require("selenium-webdriver");
const assert = require("assert");

describe("google-ad-manager", function () {
  this.timeout(600000);
  beforeEach(async function () {
    await driver.get("http://localhost:3000/?frontity_name=smart-adserver");
    await driver.manage().setTimeouts({ implicit: 5000 });
  });

  it("should load the smart adserver library", async function () {
    assert(
      await driver.executeScript(
        "return document.querySelector('script[src=\"//ced.sascdn.com/tag/256/smart.js\"][async]')"
      )
    );
  });

  it("should render the ad using the SmartAd component from the libraries", async function () {
    assert((await driver.findElements(By.css("#test-smartad>img"))).length);
  });

  it("should render the ad using the SmartAd component and a default tag id", async function () {
    assert(
      (await driver.findElements(By.css("#default-tag-id>#sas_19809>img")))
        .length
    );
  });

  it("should render the ad in an iframe", async function () {
    assert((await driver.findElements(By.css("#iframe-ad>div>iframe"))).length);
  });

  it("should render the ad in the slot", async function () {
    assert((await driver.findElements(By.css("#hello>img"))).length);
  });

  it("should unmount correctly and show the other ad in the other page", async function () {
    await driver.findElement(By.css("button#change-page")).click();
    assert((await driver.findElements(By.css("#other-page-ad>img"))).length);
  });
});
