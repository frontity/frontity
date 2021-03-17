const { By } = require("selenium-webdriver");
const assert = require("assert");

describe("script", function () {
  beforeEach(async function () {
    await driver.get(baseUrl + "/?frontity_name=script");
  });

  it("should load a external script from src url", async function () {
    assert.equal(
      await driver.findElement(By.id("from-src")).getAttribute("src"),
      "https://unpkg.com/moment@2.24.0/min/moment.min.js"
    );
    assert(await driver.findElement(By.id("from-src")).getAttribute("async"));
  });

  it("should access code from the external script", async function () {
    assert(
      await driver.executeScript("return window.moment()._isAMomentObject")
    );
  });

  it("should load inline script", async function () {
    assert.equal(
      await driver.findElement(By.css('[data-test-id="target"]')).getText(),
      "OFF"
    );
    await driver.findElement(By.css('[data-test-id="toggle"]')).click();
    assert.equal(
      await driver.findElement(By.css('[data-test-id="target"]')).getText(),
      "ON"
    );
  });

  it("should not fail when scripts are unmounted", async function () {
    await driver.findElement(By.css('[data-test-id="unmount-script"]')).click();
    assert.equal(
      await driver.findElement(By.css('[data-test-id="target"]')).getText(),
      "OFF"
    );
  });
});
