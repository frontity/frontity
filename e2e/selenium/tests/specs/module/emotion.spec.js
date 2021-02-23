const { By } = require("selenium-webdriver");
const assert = require("assert");

describe("Global", function () {
  this.timeout(600000);
  it("should have a blue background, but not a red color", async function () {
    await driver.get("http://localhost:3000/color-red?frontity_name=emotion");
    await driver.get(
      "http://localhost:3000/background-blue?frontity_name=emotion"
    );
    assert.equal(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("body"))["background-color"]'
      ),
      "rgb(0, 0, 255)"
    );
    assert.notEqual(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("body"))["color"]'
      ),
      "rgb(255, 0, 0)"
    );
    await driver.findElement(By.css('[data-test-id="toggle-button"]')).click();
    assert.notEqual(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("body"))["background-color"]'
      ),
      "rgb(0, 0, 255)"
    );
    await driver.findElement(By.css('[data-test-id="toggle-button"]')).click();
    assert.equal(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("body"))["background-color"]'
      ),
      "rgb(0, 0, 255)"
    );
  });

  it("should have a red color, but not a blue background", async function () {
    await driver.get(
      "http://localhost:3000/background-blue?frontity_name=emotion"
    );
    await driver.get("http://localhost:3000/color-red?frontity_name=emotion");
    assert.notEqual(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("body"))["background-color"]'
      ),
      "rgb(0, 0, 255)"
    );
    assert.equal(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("body"))["color"]'
      ),
      "rgb(255, 0, 0)"
    );
    await driver.findElement(By.css('[data-test-id="toggle-button"]')).click();
    assert.notEqual(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("body"))["color"]'
      ),
      "rgb(255, 0, 0)"
    );
    await driver.findElement(By.css('[data-test-id="toggle-button"]')).click();
    assert.equal(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("body"))["color"]'
      ),
      "rgb(255, 0, 0)"
    );
  });
});

describe("styled", function () {
  this.timeout(600000);
  it("should have a red color", async function () {
    await driver.get("http://localhost:3000/styled-css?frontity_name=emotion");
    assert.equal(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("[data-test-id=\'styled-div\']"))["color"]'
      ),
      "rgb(255, 0, 0)"
    );
  });

  it("should toggle the color", async function () {
    await driver.get("http://localhost:3000/styled-css?frontity_name=emotion");
    await driver.findElement(By.css('[data-test-id="toggle-button"]')).click();
    assert.equal(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("[data-test-id=\'styled-div\']"))["color"]'
      ),
      "rgb(0, 0, 255)"
    );
    await driver.findElement(By.css('[data-test-id="toggle-button"]')).click();
    assert.equal(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("[data-test-id=\'styled-div\']"))["color"]'
      ),
      "rgb(255, 0, 0)"
    );
  });

  it("should have a Styled class name (autoLabel)", async function () {
    await driver.get("http://localhost:3000/styled-css?frontity_name=emotion");
    assert(
      await driver.executeScript(
        'return document.querySelector("[data-test-id=\'styled-div\']").className.includes("Styled")'
      )
    );
  });
});

describe("css", function () {
  this.timeout(600000);
  it("should have a red color", async function () {
    await driver.get("http://localhost:3000/styled-css?frontity_name=emotion");
    assert.equal(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("[data-test-id=\'css-div\']"))["color"]'
      ),
      "rgb(255, 0, 0)"
    );
  });

  it("should toggle the color", async function () {
    await driver.get("http://localhost:3000/styled-css?frontity_name=emotion");
    await driver.findElement(By.css('[data-test-id="toggle-button"]')).click();
    assert.equal(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("[data-test-id=\'css-div\']"))["color"]'
      ),
      "rgb(0, 0, 255)"
    );
    await driver.findElement(By.css('[data-test-id="toggle-button"]')).click();
    assert.equal(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("[data-test-id=\'css-div\']"))["color"]'
      ),
      "rgb(255, 0, 0)"
    );
  });

  it("should have a Styled class name (autoLabel)", async function () {
    await driver.get("http://localhost:3000/styled-css?frontity_name=emotion");
    assert(
      await driver.executeScript(
        'return document.querySelector("[data-test-id=\'css-div\']").className.includes("CSS")'
      )
    );
  });
});
