const { By } = require("selenium-webdriver");
const assert = require("assert");

describe("loadable", function () {
  this.timeout(600000);
  beforeEach(async function () {
    await driver.get(baseUrl + "/?frontity_name=loadable");
  });
  it("should be able to render elements from dynamic components", async function () {
    assert(
      (await driver
        .findElement(By.css("[data-test-id='dynamic-div']"))
        .getText()) == "I am the Dynamic1 component"
    );
    assert(
      (await driver
        .findElement(By.css("[data-test-id='dynamic2-div']"))
        .getText()) == "I am the Dynamic2 component"
    );
  });

  it("should be able to use javascript from dynamic components", async function () {
    assert(
      (await driver
        .findElement(By.css("[data-test-id='toggle-div']"))
        .getText()) == "OFF"
    );
    await driver.findElement(By.css("[data-test-id='toggle-button']")).click();
    assert(
      (await driver
        .findElement(By.css("[data-test-id='toggle-div']"))
        .getText()) == "ON"
    );
  });
});
