const { By } = require("selenium-webdriver");
const assert = require("assert");

describe("use-in-view", function () {
  this.timeout(600000);
  let vars;
  beforeEach(function () {
    vars = {
      url: baseUrl + "/?frontity_name=use-in-view",
    };
  });

  it("useInView should return supported true", async function () {
    await driver.get(vars["url"]);
    assert.equal(
      await driver.executeScript("return window.location.href"),
      vars["url"]
    );
    assert.equal(
      await driver.findElement(By.id("supported")).getText(),
      "supported: true"
    );
  });

  it("useInView should return supported false", async function () {
    await driver.get(vars["url"] + "&removeIO");
    assert.equal(
      await driver.executeScript("return window.location.href"),
      vars["url"] + "&removeIO"
    );
    assert(!(await driver.executeScript("return window.IntersectionObserver")));
    assert.equal(
      await driver.findElement(By.id("supported")).getText(),
      "supported: false"
    );
  });
});
