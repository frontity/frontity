const { By } = require("selenium-webdriver");
const assert = require("assert");

describe("tiny-router", function () {
  this.timeout(600000);
  beforeEach(async function () {
    await driver.get(baseUrl + "/?frontity_name=tiny-router");
  });

  it("should show render contents in home", async function () {
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/"
    );
  });

  it("should switch route when using set", async function () {
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/"
    );
    await driver
      .findElement(By.css('[data-button-id="switch-to-about"]'))
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
  });

  it("should switch route when using set with `push`", async function () {
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/"
    );
    await driver
      .findElement(By.css('[data-button-id="switch-using-push"]'))
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
  });

  it("should switch route when using set with `replace`", async function () {
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/"
    );
    await driver
      .findElement(By.css('[data-button-id="switch-using-replace"]'))
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
  });

  it("should replace history entry when using set with `replace`", async function () {
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/"
    );
    assert(
      (await driver
        .findElement(By.css('[data-test-id="content"]'))
        .getText()) == "Home"
    );
    await driver
      .findElement(By.css('[data-button-id="switch-using-push"]'))
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
    await driver
      .findElement(By.css('[data-button-id="switch-to-privacy-using-replace"]'))
      .click();
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/privacy/"
    );
    assert(
      (await driver
        .findElement(By.css('[data-test-id="content"]'))
        .getText()) == "Privacy"
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
  });

  it("should recover state when moving back and forward in history", async function () {
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/"
    );
    await driver
      .findElement(By.css('button[data-button-id="switch-using-state"]'))
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
    assert(
      (await driver
        .findElement(By.css('[data-test-id="has-state"]'))
        .getText()) == "Router has state!"
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
    assert(
      (await driver
        .findElement(By.css('[data-test-id="has-state"]'))
        .getText()) == "Router has state!"
    );
  });

  it("should work if link doesn't have a trailing forward slash", async function () {
    assert.equal(
      await driver.executeScript("return window.location.pathname"),
      "/"
    );
    await driver
      .findElement(
        By.css('button[data-button-id="switch-to-about-no-trailing"]')
      )
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
  });
});
