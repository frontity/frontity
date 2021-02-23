const assert = require("assert");

describe("html2react", function () {
  this.timeout(600000);
  beforeEach(async function () {
    await driver.get("http://localhost:3000?frontity_name=html2react");
  });

  it("should pass state to processors", async function () {
    assert.equal(
      await driver.executeScript(
        'return window.getComputedStyle(document.querySelector("p"))["color"]'
      ),
      "rgb(0, 0, 255)"
    );
  });

  it("should work with old processors", async function () {
    assert.equal(
      await driver.executeScript(
        'return document.querySelector("span#old-processors").textContent'
      ),
      "Yes"
    );
  });
});
