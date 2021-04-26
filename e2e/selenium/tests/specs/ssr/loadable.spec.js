const { By } = require("selenium-webdriver");
const assert = require("assert");

describe("loadable", function () {
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
});
