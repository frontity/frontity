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
  specs: ["./selenium/tests/specs/module/*.spec.js"],
  exclude: [],
  maxInstances: 1,
  commonCapabilities: {
    "browserstack.local": true,
    "browserstack.use_w3c": true,
    "bstack:options": {
      buildName: "Module-tests",
      debug: true,
    },
  },
  capabilities: [
    //Safari - Bigger than 10.1
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Safari",
      browser_version: "13.1",
    },
    {
      os: "OS X",
      os_version: "Sierra",
      browserName: "Safari",
      browser_version: "10.1",
    },
    //Chrome - Bigger than 61
    {
      device: "Google Pixel 4",
      os_version: "11.0",
      real_mobile: true,
      browserName: "Android",
    },
    {
      os: "Windows",
      os_version: "10",
      browserName: "Chrome",
      browser_version: "latest-beta",
    },
    {
      os: "Windows",
      os_version: "7",
      browserName: "Chrome",
      browser_version: "61.0",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Chrome",
      browser_version: "latest-beta",
    },
    {
      os: "OS X",
      os_version: "Mavericks",
      browserName: "Chrome",
      browser_version: "61.0",
    },
    //Firefox - Bigger than 60
    {
      os: "Windows",
      os_version: "10",
      browserName: "Firefox",
      browser_version: "latest-beta",
    },
    {
      os: "Windows",
      os_version: "7",
      browserName: "Firefox",
      browser_version: "60.0",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Firefox",
      browser_version: "latest-beta",
    },
    {
      os: "OS X",
      os_version: "Mavericks",
      browserName: "Firefox",
      browser_version: "60.0",
    },
    //Edge - Bigger than 16
    {
      os: "Windows",
      os_version: "10",
      browserName: "Edge",
      browser_version: "latest-beta",
    },
    {
      os: "Windows",
      os_version: "10",
      browserName: "Edge",
      browser_version: "16.0",
    },
    {
      os: "OS X",
      os_version: "Catalina",
      browserName: "Edge",
      browser_version: "latest-beta",
    },
    {
      os: "OS X",
      os_version: "Sierra",
      browserName: "Edge",
      browser_version: "80.0",
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
