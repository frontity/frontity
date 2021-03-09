const { By } = require("selenium-webdriver");
const assert = require("assert");

describe("switch", function () {
  this.timeout(600000);
  beforeEach(async function () {
    await driver.get(baseUrl + "/?frontity_name=switch");
  });

  it("should render last component when no matching component is found", async function () {
    assert.equal(
      await driver.findElement(By.id("default")).getText(),
      "Default"
    );
    assert(!(await driver.findElements(By.id("one"))).length);
    assert(!(await driver.findElements(By.id("two"))).length);
  });
});
