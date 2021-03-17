const { By } = require("selenium-webdriver");
const assert = require("assert");

describe("slot-and-fill", function () {
  beforeEach(async function () {
    await driver.get(baseUrl + "/?frontity_name=slot-and-fill");
  });

  it("should show empty slots", async function () {
    assert.equal(
      await driver.findElement(By.id("useFills-slot1-empty")).getText(),
      "useFills slot 1 empty"
    );
    assert.equal(
      await driver.findElement(By.id("useFills-slot2-empty")).getText(),
      "useFills slot 2 empty"
    );
    assert.equal(
      await driver.findElement(By.id("SSRFill")).getText(),
      "I am SSRFill"
    );
  });

  it("should show first Fill", async function () {
    await driver.findElement(By.id("addFill1")).click();
    assert.equal(
      await driver.findElement(By.id("Fill1")).getText(),
      "I am Fill1"
    );
    assert(!(await driver.findElements(By.id("useFills-slot1-empty"))).length);
    assert((await driver.findElements(By.id("useFills-slot2-empty"))).length);
  });

  it("should show second Fill", async function () {
    await driver.findElement(By.id("addFill2")).click();
    assert.equal(
      await driver.findElement(By.id("Fill2")).getText(),
      "I am Fill2"
    );
    assert(!(await driver.findElements(By.id("useFills-slot1-empty"))).length);
    assert((await driver.findElements(By.id("useFills-slot2-empty"))).length);
  });

  it("should show both Fills in priority order", async function () {
    await driver.findElement(By.id("addFill1")).click();
    await driver.findElement(By.id("addFill2")).click();
    assert.equal(
      (await driver.findElement(By.id("useFills-slot1")).getText()).replace(
        "\n",
        ""
      ),
      "I am Fill2I am Fill1"
    );
  });

  it("should show the debug fills when `state.frontity.debug` is true", async function () {
    await driver.findElement(By.id("toggleDebug")).click();
    assert(!(await driver.findElements(By.id("useFills-slot1-empty"))).length);
    assert(!(await driver.findElements(By.id("useFills-slot2-empty"))).length);
    assert(
      (await driver.findElements(By.css("[data-slot-name='slot 1']"))).length
    );
    assert(
      (await driver.findElements(By.css("[data-slot-name='slot 2']"))).length
    );
  });
});
