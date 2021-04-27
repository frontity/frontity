const { By } = require("selenium-webdriver");
const assert = require("assert");

describe("tiny-router", function () {
  beforeEach(async function () {
    await driver.get(baseUrl + "/?frontity_name=tiny-router");
  });

  it("should show render contents in home", async function () {
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/"
    );
    assert(
      (await driver
        .findElement(By.css('[data-test-id="content"]'))
        .getText()) == "Home"
    );
  });

  it("should switch route when using the link and going back and forward", async function () {
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/"
    );
    await driver
      .findElement(By.css('[data-link-id="switch-using-relative-link"]'))
      .click();
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/about/"
    );
    assert(
      (await driver
        .findElement(By.css('[data-test-id="content"]'))
        .getText()) == "About"
    );
    await driver.executeScript("return window.history.back()");
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/"
    );
    assert(
      (await driver
        .findElement(By.css('[data-test-id="content"]'))
        .getText()) == "Home"
    );
    await driver.executeScript("return window.history.forward()");
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/about/"
    );
    assert(
      (await driver
        .findElement(By.css('[data-test-id="content"]'))
        .getText()) == "About"
    );
  });
});
