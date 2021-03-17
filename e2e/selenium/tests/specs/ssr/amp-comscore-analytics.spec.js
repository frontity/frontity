const assert = require("assert");

describe("amp", function () {
  beforeEach(async function () {
    await driver.get(baseUrl + "/?frontity_name=amp-comscore-analytics");
  });

  it("should render the tags for the tracking IDs", async function () {
    assert(
      await driver.executeScript(
        "return document.querySelector('script[src=\"https://cdn.ampproject.org/v0/amp-analytics-0.1.js\"]')"
      )
    );
    assert.equal(
      await driver.executeScript(
        "return document.querySelectorAll('amp-analytics[type=\"comscore\"] > script').length"
      ),
      2
    );
    assert.equal(
      await driver.executeScript(
        "return document.querySelectorAll('amp-analytics[type=\"comscore\"] > script')[0].text"
      ),
      '{"vars":{"c2":"111111"}}'
    );
    assert.equal(
      await driver.executeScript(
        "return document.querySelectorAll('amp-analytics[type=\"comscore\"] > script')[1].text"
      ),
      '{"vars":{"c2":"222222"}}'
    );
  });
});
