const assert = require("assert");

describe("amp", function () {
  beforeEach(async function () {
    await driver.get(baseUrl + "/?frontity_name=amp");
  });

  it("should render the template from the server", async function () {
    assert(
      await driver.executeScript("return document.querySelector('html[amp]')")
    );
    assert(
      await driver.executeScript(
        "return document.querySelector('style[amp-boilerplate]')"
      )
    );
    assert(
      await driver.executeScript(
        "return document.querySelector('style[amp-custom]')"
      )
    );
    assert(
      !(await driver.executeScript(
        "return document.querySelector('body script')"
      ))
    );
  });
});
