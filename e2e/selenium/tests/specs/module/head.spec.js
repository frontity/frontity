const assert = require("assert");

describe("head", function () {
  beforeEach(async function () {
    await driver.get(baseUrl + "/?site=head");
  });

  it("should have a title", async function () {
    assert.equal(await driver.getTitle(), "The Title");
  });

  it("should have a meta for description", async function () {
    assert.equal(
      await driver.executeScript(
        'return document.querySelector("meta[name=\'description\']").getAttribute("content")'
      ),
      "The Description"
    );
  });

  it("should have html attributes", async function () {
    assert.equal(
      await driver.executeScript(
        "return document.querySelector('html').getAttribute(\"lang\")"
      ),
      "en"
    );
  });

  it("should be able to execute javascript in a script tag", async function () {
    assert.equal(
      await driver.executeScript("return window.scriptTest"),
      "pass"
    );
  });

  it("should have links", async function () {
    assert.equal(
      await driver.executeScript(
        'return document.querySelector(\'link[rel="canonical"]\').getAttribute("href")'
      ),
      "http://mysite.com/example"
    );
  });

  it("should be able to change body attributes", async function () {
    assert.equal(
      await driver.executeScript(
        'return document.querySelector("body").getAttribute("class")'
      ),
      "new-class"
    );
  });

  it("should be able to have nonscripts", async function () {
    assert(
      (
        await driver.executeScript(
          'return document.querySelector("noscript").textContent'
        )
      ).includes("foo.css")
    );
  });

  it("should be able to add inline CSS", async function () {
    assert(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("body"))["backgroundColor"]'
      )
    );
  });
});
