require("dotenv").config();
const { Builder } = require("selenium-webdriver");

var userName = process.env.BROWSERSTACK_USERNAME;
var accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
var browserstackURL =
  "https://" +
  userName +
  ":" +
  accessKey +
  "@hub-cloud.browserstack.com/wd/hub";
exports.config = {
  user: userName,
  key: accessKey,
  updateJob: false,
  specs: ["./selenium/tests/specs/ssr/*.spec.js"],
  exclude: [],
  maxInstances: 1,
  commonCapabilities: {
    "browserstack.local": true,
    "browserstack.use_w3c": true,
    "bstack:options": {
      buildName: "SSR-tests",
      debug: true,
    },
  },
  capabilities: [
    //Safari - Smaller than 9.1
    {
      os: "OS X",
      os_version: "El Capitan",
      browserName: "Safari",
      browser_version: "9.1",
    },
    {
      os: "OS X",
      os_version: "Snow Leopard",
      browserName: "Safari",
      browser_version: "5.1",
    },
    //Chrome - Smaller than 48
    {
      os: "Windows",
      os_version: "10",
      browserName: "Chrome",
      browser_version: "48.0",
    },
    {
      os: "Windows",
      os_version: "XP",
      browserName: "Chrome",
      browser_version: "14.0",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Chrome",
      browser_version: "48.0",
    },
    {
      os: "OS X",
      os_version: "Snow Leopard",
      browserName: "Chrome",
      browser_version: "14.0",
    },
    //Firefox - Smaller than 17
    {
      os: "Windows",
      os_version: "8.1",
      browserName: "Firefox",
      browser_version: "17.0",
    },
    {
      os: "Windows",
      os_version: "XP",
      browserName: "Firefox",
      browser_version: "4.0",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Firefox",
      browser_version: "17.0",
    },
    {
      os: "OS X",
      os_version: "Snow Leopard",
      browserName: "Firefox",
      browser_version: "4.0",
    },
    //Internet Explorer - IE9 - IE11
    {
      os: "Windows",
      os_version: "10",
      browserName: "IE",
      browser_version: "11.0",
    },
    {
      os: "Windows",
      os_version: "7",
      browserName: "IE",
      browser_version: "9.0",
    },
  ],
  logLevel: "warn",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: "hub.browserstack.com",
  before: (capabilities) => {
    driver = new Builder()
      .usingServer(browserstackURL)
      .withCapabilities(capabilities)
      .build();
    global.expect = driver;
  },
  afterTest: async (test, context, result) => {
    let { passed, error } = result;
    !passed &&
      (await driver.executeScript(
        `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${
          error.name + ": " + error.message.replace(/\n/g, "")
        }"}}`
      ));
  },
  after: () => {
    driver.quit();
  },
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  Object.assign(caps, exports.config.commonCapabilities);
});
